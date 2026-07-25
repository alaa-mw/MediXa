// features/saleInvoice/types/invoice.ts

export type PaymentStatus = "PAID" | "PENDING" | "PARTIAL";
export type SaleType = "NORMAL" | "CUSTOMER_REQUEST";
export type PricingMode = "SUGGESTED" | "EXTRA_PERCENTAGE" | "MANUAL";

// GET /pharmacy-drugs/:id/sale-units
export interface SaleUnit {
  unitType: string;
  label: string;
  unitFactorToBase: number;
  suggestedUnitPrice: number;
  availableDisplayQuantity: number;
}

export interface SaleUnitsApiResponse {
  pharmacyDrugId: number;
  drugName: string;
  baseUnit: string;
  unitsPerBox: number;
  sellPart: boolean;
  availableBaseQuantity: number;
  saleUnits: SaleUnit[];
}

// GET /pharmacy-drugs/:id/available-batches?unitType=...
export interface BatchItem {
  order: number;
  batchId: number;
  expiryDate: string;
  receivedDate: string;
  initialQuantity: number;
  soldQuantity: number;
  availableBaseQuantity: number;
  availableDisplayQuantity: number;
  status: string;
}

export interface AvailableBatchesApiResponse {
  pharmacyDrugId: number;
  unitType: string;
  unitsPerBox: number;
  sellPart: boolean;
  batches: BatchItem[];
}

// تخصيص الدفعة في الواجهة والـ Payload
export interface BatchAllocation {
  batchId: number;
  displayQuantity: number;
}

// النموذج الداخلي للصنف في السلة (Rich UI Model)
export interface InvoiceItem {
  pharmacyDrugId: number;
  tradeName: string;
  dosageFormName?: string;
  requiresPrescription?: boolean;
  
  availableSaleUnits: SaleUnit[];
  selectedUnit: SaleUnit;
  displayQuantity: number;
  
  pricingMode: PricingMode;
  extraPercentage?: number;
  manualUnitPrice?: number;
  
  effectiveUnitPrice: number;
  subtotal: number;
  
  batchAllocations?: BatchAllocation[];
}

export interface PatientInfo {
  fullName: string;
  phone?: string;
  nationalId?: string;
}

// DTOs الإرسال للـ Backend (POST /sale-invoices)
export interface CreateSaleInvoiceItemDto {
  pharmacyDrugId: number;
  unitType: string;
  displayQuantity: number;
  extraPercentage?: number;
  manualUnitPrice?: number;
  batchAllocations?: BatchAllocation[];
}

export interface CreateSaleInvoiceDto {
  idempotencyKey: string;
  invoiceDate: string;
  paymentStatus: PaymentStatus;
  saleType: SaleType;
  discount: number;
  notes?: string;
  patient?: PatientInfo;
  items: CreateSaleInvoiceItemDto[];
}

export interface CreateSaleInvoiceResponse {
  id: number;
  invoiceNumber?: string;
  createdAt: string;
}