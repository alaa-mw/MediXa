// features/saleInvoice/helpers/invoiceMapper.ts

import type { CreateSaleInvoiceDto, InvoiceItem, PatientInfo, PaymentStatus, SaleType } from "../types/saleInvoiceCreate";


interface MapInvoiceInput {
  items: InvoiceItem[];
  discount: number;
  paymentStatus: PaymentStatus;
  saleType: SaleType;
  notes?: string;
  patient?: PatientInfo | null;
  shouldIncludePatient: boolean;
}

export const mapInvoiceToRequest = (input: MapInvoiceInput): CreateSaleInvoiceDto => {
  const { items, discount, paymentStatus, saleType, notes, patient, shouldIncludePatient } = input;

  return {
    idempotencyKey: `sale-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    paymentStatus,
    saleType,
    discount: Number(discount) || 0,
    ...(notes?.trim() && { notes: notes.trim() }),

    // إدراج بيانات المريض شرطياً
    ...(shouldIncludePatient && patient?.fullName?.trim() && {
      patient: {
        fullName: patient.fullName.trim(),
        ...(patient.phone?.trim() && { phone: patient.phone.trim() }),
        ...(patient.nationalId?.trim() && { nationalId: patient.nationalId.trim() })
      }
    }),

    // تحويل عناصر الفاتورة والقواعد الخاصة بالتسعير والدفعات
    items: items.map((item) => {
      const itemDto: any = {
        pharmacyDrugId: item.pharmacyDrugId,
        unitType: item.selectedUnit.unitType,
        displayQuantity: item.displayQuantity,
      };

      if (item.pricingMode === "EXTRA_PERCENTAGE" && item.extraPercentage && item.extraPercentage > 0) {
        itemDto.extraPercentage = Number(item.extraPercentage);
      } else if (item.pricingMode === "MANUAL" && item.manualUnitPrice && item.manualUnitPrice > 0) {
        itemDto.manualUnitPrice = Number(item.manualUnitPrice);
      }

      if (item.batchAllocations && item.batchAllocations.length > 0) {
        itemDto.batchAllocations = item.batchAllocations;
      }

      return itemDto;
    })
  };
};