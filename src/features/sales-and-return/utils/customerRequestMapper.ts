import type { CheckoutPreviewData } from "../types/customerRequest";
import type { InvoiceItem, PatientInfo, SaleUnit } from "../types/saleInvoiceCreate";


export const mapCheckoutPreviewToSlice = (
  previewData: CheckoutPreviewData
): {
  customerRequestId: number;
  patientInfo: PatientInfo;
  notes?: string | null;
  items: InvoiceItem[];
} => {
  const items: InvoiceItem[] = previewData.items.map((item) => {
    const selectedUnit: SaleUnit = {
      unitType: item.unitType,
      label: item.unitLabel,
      unitFactorToBase: item.unitFactorToBase,
      suggestedUnitPrice: item.suggestedUnitPrice,
      availableDisplayQuantity: item.availableQuantity,
    };

    const displayQuantity = item.suggestedSaleQuantity || item.requestedQuantity;
    const effectiveUnitPrice = item.suggestedUnitPrice; 

    return {
      pharmacyDrugId: item.pharmacyDrugId,
      tradeName: item.tradeName,
      drugName: item.tradeName,
      customerRequestItemId: item.customerRequestItemId,
      displayQuantity,
      selectedUnit,
      availableSaleUnits: [selectedUnit], 
      pricingMode: "SUGGESTED",
      effectiveUnitPrice,
      subtotal: effectiveUnitPrice * displayQuantity,
    };
  });

  return {
    customerRequestId: previewData.customerRequestId,
    patientInfo: {
      fullName: previewData.customerName || "",
      phone: previewData.customerPhone || "",
      nationalId: "",
    },
    // notes: previewData.notes,
    items,
  };
};

//==================================================================================

import type { SaleInvoiceSliceState } from "../store/createSaleInvoiceSlice";
import type { CustomerRequestCheckoutPayload } from "../types/customerRequest";

export const mapCustomerRequestStateToCheckoutPayload= (
  state: SaleInvoiceSliceState,
  idempotencyKey: string
): CustomerRequestCheckoutPayload => {
  return {
    idempotencyKey,
        paidAmount: state.paymentStatus === "PARTIAL" ? Number(state.paidAmount) || 0 : undefined,
    paymentStatus: state.paymentStatus,
    discount: state.discount,
    notes: state.notes || undefined,
    items: state.items.map((item) => ({
      customerRequestItemId: item.customerRequestItemId || item.pharmacyDrugId,
      saleQuantity: item.displayQuantity,
    })),
  };
};