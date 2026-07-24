import type { PharmacyDrug, PurchaseInvoice, SupplierInvoiceItem } from "../../purchase_invoices/types/purchaseInvoice";

export interface supplierInvoiceItem extends SupplierInvoiceItem {
 supplierInvoice: PurchaseInvoice;
}

export interface Batch {
  batchId: string;
  pharmacyDrugId: string;
  supplierInvoiceItemId: string;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate: string;
  status: "ACTIVE";
  pharmacyDrug: PharmacyDrug;
  supplierInvoiceItem: supplierInvoiceItem;
}
