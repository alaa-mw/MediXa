
// features/saleInvoice/context/SaleInvoiceContext.tsx

import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useCreateSaleInvoice } from "../hooks/useSaleInvoiceApi";
import type {
  BatchAllocation,
  InvoiceItem,
  PatientInfo,
  PaymentStatus,
  PricingMode,
  SaleType,
  SaleUnit,
  SaleUnitsApiResponse,
} from "../types/saleInvoiceCreate";
import { mapInvoiceToRequest } from "../helper/invoiceMapper";
import APIClient from "../../../shared/api/api-client";

interface SaleInvoiceContextType {
  items: InvoiceItem[];
  discount: number;
  paymentStatus: PaymentStatus;
  paidAmount: number;
  notes: string;
  patient: PatientInfo;
  isAddingDrug: boolean;
  isSubmitting: boolean;

  subTotal: number;
  netTotal: number;
  requiresPrescriptionAny: boolean;
  shouldShowPatientCard: boolean;

  increaseQuantity: (pharmacyDrugId: number) => void;
  decreaseQuantity: (pharmacyDrugId: number) => void;
  addDrug: (
    pharmacyDrugId: number,
    drugInfo?: {
      tradeName?: string;
      dosageFormName?: string;
      requiresPrescription?: boolean;
    },
  ) => Promise<void>;
  removeDrug: (pharmacyDrugId: number) => void;
  changeQuantity: (pharmacyDrugId: number, newQty: number) => void;
  changeUnit: (pharmacyDrugId: number, newUnitType: string) => void;
  changePricingMode: (
    pharmacyDrugId: number,
    mode: PricingMode,
    value?: number,
  ) => void;
  setBatchAllocations: (
    pharmacyDrugId: number,
    allocations?: BatchAllocation[],
  ) => void;

  changeDiscount: (val: number) => void;
  changePaymentStatus: (status: PaymentStatus) => void;
  changeSaleType: (type: SaleType) => void;
  changePaidAmount: (amount: number) => void;
  changeNotes: (notes: string) => void;
  updatePatientInfo: (info: Partial<PatientInfo>) => void;

  clearInvoice: () => void;
  submitInvoice: (options?: {
    onSuccess?: (data: any) => void;
    onError?: (err: any) => void;
  }) => void;
}

export const SaleInvoiceContext = createContext<
  SaleInvoiceContextType | undefined
>(undefined);

export const SaleInvoiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PAID");
  const [saleType, setSaleType] = useState<SaleType>("NORMAL");
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [patient, setPatient] = useState<PatientInfo>({
    fullName: "",
    phone: "",
    nationalId: "",
  });
  const [isAddingDrug, setIsAddingDrug] = useState(false);

  const createInvoiceMutation = useCreateSaleInvoice();

  const calculateEffectivePrice = (
    unit: SaleUnit,
    mode: PricingMode,
    extraPct?: number,
    manualPrice?: number,
  ): number => {
    if (mode === "MANUAL" && manualPrice && manualPrice > 0) return manualPrice;
    if (mode === "EXTRA_PERCENTAGE" && extraPct && extraPct > 0) {
      return (
        unit.suggestedUnitPrice + unit.suggestedUnitPrice * (extraPct / 100)
      );
    }
    return unit.suggestedUnitPrice;
  };

  const changeQuantity = useCallback(
    (pharmacyDrugId: number, newQty: number) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.pharmacyDrugId !== pharmacyDrugId) return item;
          const maxQty = item.selectedUnit.availableDisplayQuantity;
          const validQty = Math.max(1, Math.min(newQty, maxQty));
          return {
            ...item,
            displayQuantity: validQty,
            subtotal: item.effectiveUnitPrice * validQty,
          };
        }),
      );
    },
    [],
  );

  const increaseQuantity = useCallback((pharmacyDrugId: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.pharmacyDrugId !== pharmacyDrugId) return item;
        const maxQty = item.selectedUnit.availableDisplayQuantity;
        const validQty = Math.min(item.displayQuantity + 1, maxQty);
        return {
          ...item,
          displayQuantity: validQty,
          subtotal: item.effectiveUnitPrice * validQty,
        };
      }),
    );
  }, []);

  const decreaseQuantity = useCallback((pharmacyDrugId: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.pharmacyDrugId !== pharmacyDrugId) return item;
        const validQty = Math.max(1, item.displayQuantity - 1);
        return {
          ...item,
          displayQuantity: validQty,
          subtotal: item.effectiveUnitPrice * validQty,
        };
      }),
    );
  }, []);
  

  const addDrug = useCallback(
    async (
      pharmacyDrugId: number,
      drugInfo?: {
        tradeName?: string;
        dosageFormName?: string;
        requiresPrescription?: boolean;
      },
    ) => {
      const existingIndex = items.findIndex(
        (i) => i.pharmacyDrugId === pharmacyDrugId,
      );
      if (existingIndex > -1) {
        const existing = items[existingIndex];
        const maxAvailable = existing.selectedUnit.availableDisplayQuantity;
        if (existing.displayQuantity < maxAvailable) {
          changeQuantity(pharmacyDrugId, existing.displayQuantity + 1);
        }
        return;
      }

      try {
        setIsAddingDrug(true);
        const client = new APIClient<SaleUnitsApiResponse>(
          `/pharmacy-drugs/${pharmacyDrugId}/sale-units`,
        );
        const response = await client.get();
        const responseData = (response as any).data || response;

        const saleUnits: SaleUnit[] = responseData.saleUnits || [];
        if (!saleUnits.length) return;

        const defaultUnit =
          saleUnits.find((u) => u.availableDisplayQuantity > 0) || saleUnits[0];
        const effectivePrice = defaultUnit.suggestedUnitPrice;

        const newItem: InvoiceItem = {
          pharmacyDrugId,
          tradeName:
            drugInfo?.tradeName ||
            responseData.drugName ||
            `صنف #${pharmacyDrugId}`,
          dosageFormName: drugInfo?.dosageFormName,
          requiresPrescription: drugInfo?.requiresPrescription || false,
          availableSaleUnits: saleUnits,
          selectedUnit: defaultUnit,
          displayQuantity: defaultUnit.availableDisplayQuantity > 0 ? 1 : 0,
          pricingMode: "SUGGESTED",
          effectiveUnitPrice: effectivePrice,
          subtotal: effectivePrice * 1,
        };

        setItems((prev) => [...prev, newItem]);
      } catch (error) {
        console.error("فشل جلب وحدات البيع للصنف:", error);
      } finally {
        setIsAddingDrug(false);
      }
    },
    [items, changeQuantity],
  );

  const removeDrug = useCallback((pharmacyDrugId: number) => {
    setItems((prev) => prev.filter((i) => i.pharmacyDrugId !== pharmacyDrugId));
  }, []);

  const changeUnit = useCallback(
    (pharmacyDrugId: number, newUnitType: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.pharmacyDrugId !== pharmacyDrugId) return item;
          const newUnit =
            item.availableSaleUnits.find((u) => u.unitType === newUnitType) ||
            item.selectedUnit;
          const newDisplayQty =
            Math.min(item.displayQuantity, newUnit.availableDisplayQuantity) ||
            1;
          const newEffectivePrice = calculateEffectivePrice(
            newUnit,
            item.pricingMode,
            item.extraPercentage,
            item.manualUnitPrice,
          );

          return {
            ...item,
            selectedUnit: newUnit,
            displayQuantity: newDisplayQty,
            effectiveUnitPrice: newEffectivePrice,
            subtotal: newEffectivePrice * newDisplayQty,
            batchAllocations: undefined,
          };
        }),
      );
    },
    [],
  );

  const changePricingMode = useCallback(
    (pharmacyDrugId: number, mode: PricingMode, value?: number) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.pharmacyDrugId !== pharmacyDrugId) return item;

          let extraPct = item.extraPercentage;
          let manualPrice = item.manualUnitPrice;

          if (mode === "SUGGESTED") {
            extraPct = undefined;
            manualPrice = undefined;
          } else if (mode === "EXTRA_PERCENTAGE") {
            extraPct = value !== undefined ? value : item.extraPercentage || 0;
            manualPrice = undefined;
          } else if (mode === "MANUAL") {
            manualPrice =
              value !== undefined
                ? value
                : item.manualUnitPrice || item.selectedUnit.suggestedUnitPrice;
            extraPct = undefined;
          }

          const effectivePrice = calculateEffectivePrice(
            item.selectedUnit,
            mode,
            extraPct,
            manualPrice,
          );

          return {
            ...item,
            pricingMode: mode,
            extraPercentage: extraPct,
            manualUnitPrice: manualPrice,
            effectiveUnitPrice: effectivePrice,
            subtotal: effectivePrice * item.displayQuantity,
          };
        }),
      );
    },
    [],
  );

  const setBatchAllocations = useCallback(
    (pharmacyDrugId: number, allocations?: BatchAllocation[]) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.pharmacyDrugId !== pharmacyDrugId) return item;
          
          if (!allocations || allocations.length === 0) {
            return { ...item, batchAllocations: undefined };
          }

          const totalAllocated = allocations.reduce(
            (sum, alloc) => sum + alloc.displayQuantity,
            0,
          );

          return {
            ...item,
            batchAllocations: allocations,
            displayQuantity: totalAllocated,
            subtotal: item.effectiveUnitPrice * totalAllocated,
          };
        }),
      );
    },
    [],
  );

  const subTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.subtotal, 0),
    [items],
  );
  const netTotal = useMemo(
    () => Math.max(0, subTotal - (Number(discount) || 0)),
    [subTotal, discount],
  );
  const requiresPrescriptionAny = useMemo(
    () => items.some((i) => i.requiresPrescription),
    [items],
  );

  const shouldShowPatientCard = useMemo(() => {
    return (
      requiresPrescriptionAny ||
      paymentStatus === "PENDING" ||
      paymentStatus === "PARTIAL"
    );
  }, [requiresPrescriptionAny, paymentStatus]);

  const clearInvoice = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setPaymentStatus("PAID");
    setSaleType("NORMAL");
    setPaidAmount(0);
    setNotes("");
    setPatient({ fullName: "", phone: "", nationalId: "" });
  }, []);

  const submitInvoice = useCallback(
    (options?: {
      onSuccess?: (data: any) => void;
      onError?: (err: any) => void;
    }) => {
      const payload = mapInvoiceToRequest({
        items,
        discount,
        paymentStatus,
        saleType,
        notes,
        patient,
        shouldIncludePatient: shouldShowPatientCard,
      });

      createInvoiceMutation.mutate(payload, {
        onSuccess: (data) => {
          clearInvoice();
          if (options?.onSuccess) options.onSuccess(data);
        },
        onError: (err) => {
          if (options?.onError) options.onError(err);
        },
      });
    },
    [
      items,
      discount,
      paymentStatus,
      saleType,
      notes,
      patient,
      shouldShowPatientCard,
      createInvoiceMutation,
      clearInvoice,
    ],
  );

  return (
    <SaleInvoiceContext.Provider
      value={{
        items,
        discount,
        paymentStatus,
        paidAmount,
        notes,
        patient,
        isAddingDrug,
        isSubmitting: createInvoiceMutation.isPending,
        subTotal,
        netTotal,
        requiresPrescriptionAny,
        shouldShowPatientCard,
        addDrug,
        removeDrug,
        changeQuantity,
        increaseQuantity,
        decreaseQuantity,
        changeUnit,
        changePricingMode,
        setBatchAllocations,
        changeDiscount: setDiscount,
        changePaymentStatus: setPaymentStatus,
        changeSaleType: setSaleType,
        changePaidAmount: setPaidAmount,
        changeNotes: setNotes,
        updatePatientInfo: (info) => setPatient((p) => ({ ...p, ...info })),
        clearInvoice,
        submitInvoice,
      }}
    >
      {children}
    </SaleInvoiceContext.Provider>
  );
};
