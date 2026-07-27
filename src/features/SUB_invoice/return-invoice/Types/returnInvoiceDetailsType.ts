export interface ReturnInvoiceDetails {
  returnInvoiceId: number;
  pharmacyInvoiceId: number;
  referenceSaleInvoiceId: number;
  subtotalRefund: number;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: PharmacyInvoice;
  referenceSaleInvoice: ReferenceSaleInvoice;
  items: ReturnInvoiceItem[];
}

export interface PharmacyInvoice {
  pharmacyInvoiceId: number;
  pharmacyId?: number;
  patientId?: number | null;
  invoiceType: string;
  invoiceDate: string;
  status: string;
  notes: string | null;
  idempotencyKey?: string | null;
  patient?: Patient | null;
}

export interface Patient {
  patientId: number;
  fullName: string;
  phone: string;
  nationalId: string;
}

export interface ReferenceSaleInvoice {
  saleInvoiceId: number;
  pharmacyInvoiceId: number;
  paymentStatus: string;
  saleType: string;
  subtotal: number;
  discount: number;
  totalAmount: number;
  pharmacyInvoice: PharmacyInvoice;
}

export interface ReturnInvoiceItem {
  returnInvoiceItemId: number;
  returnInvoiceId: number;
  pharmacyDrugId: number;
  drug: Drug;
  saleInvoiceItemBatchId: number;
  batch: Batch;
  unitType: string;
  displayQuantity: number;
  baseQuantity: number;
  unitFactorToBase: number;
  unitPrice: number;
  totalPrice: number;
  returnReason: string;
  restockToInventory: boolean;
  originalSaleSnapshot: OriginalSaleSnapshot;
  returnSummaryForThisAllocation: ReturnSummaryForThisAllocation;
}

export interface Drug {
  pharmacyDrugId: number;
  drugId: number;
  source: string;
  sellPart: boolean;
  consumerPrice: number;
  isActive: boolean;
  tradeName: string;
  barcode: string;
  dosageFormId: number;
  unitsPerBox: number;
}

export interface Batch {
  batchId: number;
  pharmacyDrugId: number;
  expiryDate: string;
  receivedDate: string;
  initialQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  status: string;
}

export interface OriginalSaleSnapshot {
  saleInvoiceItemId: number;
  saleUnitType: string;
  soldFromThisBatchBaseQuantity: number;
  soldFromThisBatchDisplayQuantity: number;
  saleItemBaseQuantity: number;
  saleItemUnitFactorToBase: number;
  saleBaseUnitPrice: number;
  saleFinalUnitPrice: number;
  saleTotalPrice: number;
  saleDiscountAmount: number;
  saleNetTotalPrice: number;
}

export interface ReturnSummaryForThisAllocation {
  originalSoldBaseQuantity: number;
  returnedInThisInvoiceBaseQuantity: number;
  totalReturnedBaseQuantity: number;
  remainingReturnableBaseQuantity: number;
}
