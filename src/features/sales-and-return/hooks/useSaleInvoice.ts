
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import { useCreateSaleInvoice } from "./useSaleInvoiceApi";
import { useIdempotency } from "../../../shared/hooks/useIdempotency";
import type { 
  BatchAllocation, 
  PatientInfo, 
 
} from "../types/saleInvoiceCreate";

// Selectors


// Actions & Thunks
import { 
  changePricingMode, 
  changeQuantity, 
  changeUnit, 
  clearInvoice, 
  decreaseQuantity, 
  increaseQuantity, 
  removeDrug, 
  setBatchAllocations, 
  setDiscount, 
  setNotes, 
  setPaidAmount, 
  setPaymentStatus, 
  setSaleType, 
  updatePatientInfo 
} from "../store/createSaleInvoiceSlice";
import { fetchAndAddDrug } from "../store/createSaleInvoiceThunks";
import { mapSaleInvoiceStateToRequest } from "../utils/saleInvoiceMapper";
import { selectItemsWithSubtotal, selectNetTotal, selectRequiresPrescriptionAny, selectSaleInvoiceState, selectShouldShowPatientCard, selectSubTotal } from "../store/aleInvoiceSelectors";
import type { PaymentStatus, PricingMode, SaleType } from "../types/enums";

// Mapper

export const useSaleInvoice = () => {
  const dispatch = useAppDispatch();
  const { getKey } = useIdempotency();
  const createInvoiceMutation = useCreateSaleInvoice();

  // State
  const rawState = useAppSelector(selectSaleInvoiceState);

  // Selectors for UI
  const items = useAppSelector(selectItemsWithSubtotal);
  const subTotal = useAppSelector(selectSubTotal);
  const netTotal = useAppSelector(selectNetTotal);
  const requiresPrescriptionAny = useAppSelector(selectRequiresPrescriptionAny);
  const shouldShowPatientCard = useAppSelector(selectShouldShowPatientCard);

  // Submit Process
  const submitInvoice = (options?: {
    onSuccess?: (data: any) => void;
    onError?: (err: any) => void;
  }) => {
    const requestPayload = mapSaleInvoiceStateToRequest(
      rawState,
      getKey(),
      shouldShowPatientCard
    );

    createInvoiceMutation.mutate(requestPayload, {
      onSuccess: (data) => {
        dispatch(clearInvoice());
        if (options?.onSuccess) options.onSuccess(data);
      },
      onError: (err) => {
        if (options?.onError) options.onError(err);
      },
    });
  };

  // Grouped Actions
  const actions = {
    addDrug: (pharmacyDrugId: number, drugInfo?: any) =>
      dispatch(fetchAndAddDrug({ pharmacyDrugId, drugInfo })),
    removeDrug: (pharmacyDrugId: number) => dispatch(removeDrug(pharmacyDrugId)),
    changeQuantity: (pharmacyDrugId: number, newQty: number) =>
      dispatch(changeQuantity({ pharmacyDrugId, newQty })),
    increaseQuantity: (pharmacyDrugId: number) => dispatch(increaseQuantity(pharmacyDrugId)),
    decreaseQuantity: (pharmacyDrugId: number) => dispatch(decreaseQuantity(pharmacyDrugId)),
    changeUnit: (pharmacyDrugId: number, newUnitType: string) =>
      dispatch(changeUnit({ pharmacyDrugId, newUnitType })),
    changePricingMode: (pharmacyDrugId: number, mode: PricingMode, value?: number) =>
      dispatch(changePricingMode({ pharmacyDrugId, mode, value })),
    setBatchAllocations: (pharmacyDrugId: number, allocations?: BatchAllocation[]) =>
      dispatch(setBatchAllocations({ pharmacyDrugId, allocations })),
    changeDiscount: (val: number) => dispatch(setDiscount(val)),
    changePaymentStatus: (status: PaymentStatus) => dispatch(setPaymentStatus(status)),
    changeSaleType: (type: SaleType) => dispatch(setSaleType(type)),
    changePaidAmount: (amount: number) => dispatch(setPaidAmount(amount)),
    changeNotes: (notes: string) => dispatch(setNotes(notes)),
    updatePatientInfo: (info: Partial<PatientInfo>) => dispatch(updatePatientInfo(info)),
    clearInvoice: () => dispatch(clearInvoice()),
    submitInvoice,
  };

  return {
    state: rawState,
    selectors: {
      items,
      subTotal,
      netTotal,
      requiresPrescriptionAny,
      shouldShowPatientCard,
      isSubmitting: createInvoiceMutation.isPending,
    },
    actions,
  };
};