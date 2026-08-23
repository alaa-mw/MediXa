import type { SaleInvoiceSliceState } from "../store/createSaleInvoiceSlice";
import type { CreateSaleInvoiceDto } from "../types/saleInvoiceCreate";

export const mapSaleInvoiceStateToRequest = (
  state: SaleInvoiceSliceState,
  idempotencyKey: string,
  shouldIncludePatient: boolean
): CreateSaleInvoiceDto => {
  return {
    idempotencyKey,
    invoiceDate: new Date().toISOString(),
    paymentStatus: state.paymentStatus,
    paidAmount: state.paymentStatus === "PARTIAL" ? Number(state.paidAmount) || 0 : undefined,
    saleType: state.saleType,
    discount: Number(state.discount) || 0,
    notes: state.notes?.trim() || undefined,
    patient: shouldIncludePatient
      ? {
          fullName: state.patient.fullName.trim(),
          phone: state.patient.phone?.trim() || undefined,
          nationalId: state.patient.nationalId?.trim() || undefined,
        }
      : undefined,
    items: state.items.map((item) => ({
      pharmacyDrugId: item.pharmacyDrugId,
      unitType: item.selectedUnit.unitType,
      displayQuantity: item.displayQuantity,
      extraPercentage: item.extraPercentage,
      manualUnitPrice: item.manualUnitPrice,
      batchAllocations: item.batchAllocations?.map((alloc) => ({
        batchId: alloc.batchId,
        displayQuantity: alloc.displayQuantity,
      })),
    })),
  };
};