// src/types/batch.ts

export interface PharmacyDrug {
  pharmacyDrugId: number;
  pharmacyId: number;
  drugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: string;
  consumerPrice: string;
  expiryDateAlarm: null | string;
  isActive: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierInvoice {
  supplierInvoiceId: number;
  supplierId: number;
  invoiceNumber: string;
  invoiceDate: string;
  paymentStatus: string;
  subtotal: string;
  discount: string;
  totalPrice: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierInvoiceItem {
  supplierInvoiceItemId: number;
  supplierInvoiceId: number;
  pharmacyDrugId: number;
  quantity: number;
  netUnitPrice: string;
  totalPrice: string;
  notes: null | string;
  createdAt: string;
  updatedAt: string;
  supplierInvoice: SupplierInvoice;
}

export interface RawBatchData {
  batchId: number;
  pharmacyDrugId: number;
  supplierInvoiceItemId: null | number;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pharmacyDrug: PharmacyDrug;
  supplierInvoiceItem: null | SupplierInvoiceItem;
}

export type FilterStatus = "ALL" | "VALID" | "OUT_OF_STOCK" | "EXPIRED";