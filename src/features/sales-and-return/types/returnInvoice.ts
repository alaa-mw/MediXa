import type { InvoiceStatus, InvoiceType } from "./enums";

export interface Patient {
  patientId: number;
  pharmacyId: number;
  fullName: string;
  nationalId: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PharmacyInvoice {
  pharmacyInvoiceId: number;
  pharmacyId: number;
  patientId: number | null;
  invoiceType: InvoiceType;
  invoiceDate: string;
  status: InvoiceStatus;
  notes: string | null;
  idempotencyKey: string | null;
  createdAt: string;
  updatedAt: string;
  patient: Patient | null;
}

export interface GeneralDrug {
  generalDrugId: number;
  drugId: number;
  dosageFormId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  netPrice: string;
  consumerPrice: string;
  isRx: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DrugInfo {
  drugId: number;
  source: string;
  createdAt: string;
  updatedAt: string;
  generalDrug: GeneralDrug | null;
  privateDrug: any | null;
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
  createdAt: string;
  updatedAt: string;
  drug?: DrugInfo;
}

export interface BatchDetails {
  batchId: number;
  pharmacyDrugId: number;
  supplierInvoiceItemId: number | null;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleInvoiceItemSnapshot {
  saleInvoiceItemId: number;
  saleInvoiceId: number;
  pharmacyDrugId: number;
  unitType: string;
  baseQuantity: number;
  unitFactorToBase: number;
  baseUnitPrice: string;
  extraPercentage: string;
  finalUnitPrice: string;
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleInvoiceItemBatchSnapshot {
  saleInvoiceItemBatchId: number;
  saleInvoiceItemId: number;
  batchId: number;
  baseQuantity: number;
  unitCostAtSale: string | null;
  createdAt: string;
  batch: BatchDetails;
  saleInvoiceItem: SaleInvoiceItemSnapshot;
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
  createdAt: string;
  pharmacyDrug: PharmacyDrug;
  saleInvoiceItemBatch: SaleInvoiceItemBatchSnapshot;
  displayQuantity: number;
  originalSoldDisplayQuantity: number;
}

export interface ReferenceSaleInvoice {
  saleInvoiceId: number;
  pharmacyInvoiceId: number;
  paymentStatus: string;
  saleType: string;
  subtotal: string;
  discount: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: {
    pharmacyInvoiceId: number;
    pharmacyId: number;
    patientId: number | null;
    invoiceType: string;
    invoiceDate: string;
    status: InvoiceStatus;
    notes: string | null;
    idempotencyKey: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ReturnInvoiceData {
  returnInvoiceId: number;
  pharmacyInvoiceId: number;
  referenceSaleInvoiceId: number;
  subtotalRefund: string;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: PharmacyInvoice;
  referenceSaleInvoice: ReferenceSaleInvoice;
  items: ReturnInvoiceItem[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ReturnInvoiceApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: ReturnInvoiceData[];
  meta: PaginationMeta;
}

export interface ReturnInvoiceFilters {
  page: string;
  limit: string;
  invoiceStatus: InvoiceStatus | "ALL";
  search: string;
  // الـ IDs تُدار في الـ URL ولكن لن تظهر في الـ dropdowns بناءً على طلبك 💡
  saleInvoiceId: string;
  pharmacyInvoiceId: string;
  pharmacyDrugId: string;
  batchId: string;
  saleInvoiceItemBatchId: string;
  unitType: string;
  returnReason: string;
  restockToInventory: string; // "true" | "false" | ""
  fromDate: string;
  toDate: string;
  minRefund: string;
  maxRefund: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}