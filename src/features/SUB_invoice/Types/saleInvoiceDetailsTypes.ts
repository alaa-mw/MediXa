// export interface SaleInvoiceDetails {
//   saleInvoiceId: number;
//   pharmacyInvoiceId: number;
//   paymentStatus: string;
//   saleType: string;
//   subtotal: string;
//   discount: string;
//   totalAmount: string;
//   createdAt: string;
//   updatedAt: string;

//   pharmacyInvoice: PharmacyInvoice;

//   items: SaleInvoiceItem[];

//   returns: ReturnInvoice[];
// }

// export interface PharmacyInvoice {
//   pharmacyInvoiceId: number;
//   pharmacyId: number;
//   patientId: number | null;
//   invoiceType: string;
//   invoiceDate: string;
//   status: string;
//   notes: string | null;

//   patient?: Patient;
// }

// export interface Patient {
//   patientId: number;
//   fullName: string;
//   nationalId: string;
//   phone: string;
// }

// export interface SaleInvoiceItem {
//   saleInvoiceItemId: number;
//   pharmacyDrugId: number;

//   unitType: string;
//   baseQuantity: number;
//   unitFactorToBase: number;

//   finalUnitPrice: string;
//   totalPrice: string;
//   extraPercentage: string;
//   displayQuantity: number;

//   discountAmount: string;
//   netTotalPrice: string;
//   pharmacyDrug?: PharmacyDrug;

//   batchAllocations?: BatchAllocation[];
// }

// export interface PharmacyDrug {
//   pharmacyDrugId: number;

//   drug: Drug;
// }

// export interface Drug {
//   drugId: number;
//   source: string;
//   generalDrug?: GeneralDrug;
//   //privateDrug?: PrivateDrug;
// }

// export interface GeneralDrug {
//   generalDrugId: number;

//   tradeName: string;

//   barcode: string;

//   unitsPerBox: number;

//   isRx: boolean;
// }

// export interface BatchAllocation {
//   saleInvoiceItemBatchId: number;

//   displayQuantityFromThisBatch: number;

//   batch: Batch;
//   saleInvoiceItem?: SaleInvoiceItem;
// }
// export interface SaleInvoiceItemBatch {
//   saleInvoiceItemBatchId: number;
//   saleInvoiceItemId: number;
//   batch: Batch;
//   saleInvoiceItem: SaleInvoiceItem;
// }

// export interface Batch {
//   batchId: number;

//   expiryDate: string;

//   receivedDate?: string;
//   initialQuantity: number;

//   soldQuantity: number;

//   status: string;
// }

// export interface ReturnInvoice {
//   returnInvoiceId: number;

//   subtotalRefund: string;

//   createdAt: string;
//   //PHARAMCY INVOICE غير مستخدم هنا
//   pharmacyInvoice: PharmacyInvoice;

//   items: ReturnInvoiceItem[];
// }

// export interface ReturnInvoiceItem {
//   returnInvoiceItemId: number;

//   unitFactorToBase: number;

//   baseQuantity: number;

//   unitType: string;

//   unitPrice: string;

//   totalPrice: string;

//   returnReason: string;

//   restockToInventory: boolean;

//   pharmacyDrug: PharmacyDrug;
//   saleInvoiceItemBatch: SaleInvoiceItemBatch;
// }

export interface SaleInvoiceDetails {
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
  idempotencyKey?: string | null;
  createdAt?: string;
  updatedAt?: string;
  patient?: Patient | null;
}

export interface Patient {
  patientId: number;
  fullName: string;
  nationalId: string;
  phone: string;
}

export interface SaleInvoiceItem {
  saleInvoiceItemId: number;
  saleInvoiceId: number;
  pharmacyDrugId: number;
  unitType: string;
  baseQuantity: number;
  unitFactorToBase: number;
  baseUnitPrice?: string;
  extraPercentage: string;
  finalUnitPrice: string;
  totalPrice: string;
  discountAmount: string;
  netTotalPrice: string;
  createdAt?: string;
  updatedAt?: string;
  pharmacyDrug?: PharmacyDrug;
  displayQuantity: number;
}

export interface PharmacyDrug {
  pharmacyDrugId: number;
  pharmacyId: number;
  drugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: string;
  consumerPrice: string;
  expiryDateAlarm: number;
  isActive: boolean;
  notes: string | null;
  createdAt?: string;
  updatedAt?: string;
  drug: Drug;
}

export interface Drug {
  drugId: number;
  source: string;
  createdAt?: string;
  updatedAt?: string;
  generalDrug?: GeneralDrug;
  privateDrug?: any | null;
}

export interface GeneralDrug {
  generalDrugId: number;
  drugId: number;
  dosageFormId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  netPrice?: string;
  consumerPrice?: string;
  isRx: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BatchAllocation {
  saleInvoiceItemBatchId: number;
  saleInvoiceItemId: number;
  batchId: number;
  baseQuantity: number;
  unitCostAtSale: number | null;
  createdAt?: string;
  batch: Batch;
  displayQuantityFromThisBatch: number;
}

export interface SaleInvoiceItemBatch {
  saleInvoiceItemBatchId: number;
  saleInvoiceItemId: number;
  batchId: number;
  baseQuantity: number;
  unitCostAtSale: number | null;
  createdAt?: string;
  updatedAt?: string;
  batch: Batch;
  saleInvoiceItem?: SaleInvoiceItem;
}

export interface Batch {
  batchId: number;
  pharmacyDrugId: number;
  supplierInvoiceItemId: number | null;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReturnInvoice {
  returnInvoiceId: number;
  pharmacyInvoiceId: number;
  referenceSaleInvoiceId: number;
  subtotalRefund: string;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: PharmacyInvoice;
  items: ReturnInvoiceItem[];
}

export interface ReturnInvoiceItem {
  returnInvoiceItemId: number;
  returnInvoiceId: number;
  pharmacyDrugId: number;
  saleInvoiceItemBatchId: number;
  unitType: string;
  baseQuantity: number;
  unitFactorToBase: number;
  unitPrice: string;
  totalPrice: string;
  returnReason: string;
  restockToInventory: boolean;
  createdAt?: string;
  pharmacyDrug: PharmacyDrug;
  saleInvoiceItemBatch: SaleInvoiceItemBatch;
}
