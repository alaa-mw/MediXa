import type { PaymentStatus, SupplierInvoiceStatus } from "./enums";

// 1. REQUEST BODY - What gets sent to the API
export interface PurchaseInvoiceRequest {
  status: SupplierInvoiceStatus;
  supplierId: number;
  invoiceNumber: string;
  invoiceDate: string;
  discount: number;
  notes: string;
  items: PurchaseInvoiceItemRequest[];
}

export interface PurchaseInvoiceItemRequest {
  pharmacyDrugId: string;
  drugName: string;
  quantity: number;
  netUnitPrice: number;
  batches: PurchaseInvoiceBatchRequest[];
}

export interface PurchaseInvoiceBatchRequest {
  initialQuantity: number;
  expiryDate: string;
}

// 2. VIEW STATE - Extra info for UI display
export interface SupplierInfo {
  supplierId: number;
  pharmacyId: number;
  supplierName: string;
}

// 3. COMPLETE SLICE STATE - Combines both
export interface SliceState extends PurchaseInvoiceRequest {

  supplier: SupplierInfo;
  paymentStatus: PaymentStatus;
  
  // Async states
  loading: boolean;
  error: string | null;
  
  // Optional: track if form has been modified
  isDirty?: boolean;
  // Optional: validation errors
  validationErrors?: Record<string, string>;
}
