export interface SaleInvoiceResponse {
  saleInvoiceId: number;
  pharmacyInvoiceId: number;
  paymentStatus: string;
  saleType: string;
  subtotal: string;
  discount: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;

  pharmacyInvoice: PharmacyInvoice;

  items: SaleInvoiceItem[];

  returns: ReturnInvoice[];
}

export interface PharmacyInvoice {
  pharmacyInvoiceId: number;
  pharmacyId: number;
  patientId: number | null;
  invoiceType: string;
  invoiceDate: string;
  status: string;
  notes: string | null;

  patient?: Patient;
}

export interface Patient {
  patientId: number;
  fullName: string;
  nationalId: string;
  phone: string;
}

export interface SaleInvoiceItem {
  saleInvoiceItemId: number;
  pharmacyDrugId: number;

  unitType: string;
  baseQuantity: number;

  finalUnitPrice: string;
  totalPrice: string;
  extraPercentage: string;
  displayQuantity?: number;

  pharmacyDrug?: PharmacyDrug;

  batchAllocations?: BatchAllocation[];
}

export interface PharmacyDrug {
  pharmacyDrugId: number;

  drug: Drug;
}

export interface Drug {
  drugId: number;

  generalDrug?: GeneralDrug;
}

export interface GeneralDrug {
  generalDrugId: number;

  tradeName: string;

  barcode: string;

  unitsPerBox: number;

  isRx: boolean;
}

export interface BatchAllocation {
  saleInvoiceItemBatchId: number;

  displayQuantityFromThisBatch: number;

  batch: Batch;
  saleInvoiceItem?: SaleInvoiceItem;
}
export interface SaleInvoiceItemBatch {
  saleInvoiceItemBatchId: number;
  saleInvoiceItemId: number;
  batch: Batch;
  saleInvoiceItem: SaleInvoiceItem;
}

export interface Batch {
  batchId: number;

  expiryDate: string;

  receivedDate?: string;
  initialQuantity: number;

  soldQuantity: number;

  status: string;
}

export interface ReturnInvoice {
  returnInvoiceId: number;

  subtotalRefund: string;

  createdAt: string;
  //PHARAMCY INVOICE غير مستخدم هنا
  pharmacyInvoice: PharmacyInvoice;

  items: ReturnInvoiceItem[];
}

export interface ReturnInvoiceItem {
  returnInvoiceItemId: number;

  unitFactorToBase: number;

  baseQuantity: number;

  unitType: string;

  unitPrice: string;

  totalPrice: string;

  returnReason: string;

  restockToInventory: boolean;

  //  pharmacyDrug : PharmacyDrug; بدي DRUG
  saleInvoiceItemBatch: SaleInvoiceItemBatch;
}
