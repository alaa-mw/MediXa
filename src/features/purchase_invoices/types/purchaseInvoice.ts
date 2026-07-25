import type { BatchStatus, PaymentStatus, SupplierInvoiceStatus } from "./enums";

export interface PurchaseInvoice{
  supplierInvoiceId: number;
  supplierId: number;
  invoiceNumber: string;
  invoiceDate: string;
  paymentStatus: PaymentStatus;
  subtotal: string;
  discount: string;
  totalPrice: string;
  notes: string | null;
  status?: SupplierInvoiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseInvoiceDetails extends PurchaseInvoice {
  supplier: Supplier;
  items?: SupplierInvoiceItem[];
}

export interface Supplier {
  supplierId: string;
  pharmacyId: string;
  supplierName: string;
  phone: string;
  address: string;
  notes: string | null;
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
  notes: string | null;
  createdAt: string;
  updatedAt: string;

  pharmacyDrug: PharmacyDrug;
  batches?: Batch[];
  tradeName: string;
}

export interface PharmacyDrug {
  pharmacyDrugId: number;
  pharmacyId: number;
  drugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: string;
  consumerPrice: string;
  expiryDateAlarm: string | null;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  batchId: number;
  pharmacyDrugId: number;
  supplierInvoiceItemId: number;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate: string;
  status: BatchStatus;
  createdAt: string;
  updatedAt: string;
}