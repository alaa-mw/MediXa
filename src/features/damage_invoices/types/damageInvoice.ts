import type { PharmacyInvoiceStatus } from "./enums";

export interface DamageInvoice {
  damageInvoiceId: number;
  invoiceNumber: string;
  pharmacyInvoiceId: number;
  damageDate: string; 
  damageReason: string | null; 
  formattedTotalInvoicePrice: string;
  totalDamagedQuantity: number;
  itemsCount: number;
  status: PharmacyInvoiceStatus;
  notes: string | null;
  createdAt: string;
}

export interface DamageInvoiceDetails extends DamageInvoice {
  items: DamageItem[];
}

interface DamageItem {
  damageInvoiceItemId: number;
  batchId: number;
  quantityDamaged: number;
  formattedUnitConsumerPrice: string;
  totalLinePrice: number;
  formattedTotalLinePrice: string;
  notes: string | null;
  createdAt: string;
  drug: {
    pharmacyDrugId: number;
    sourceText: string;
    tradeName: string;
    barcode: string;
  };
  supplier: {
    supplierId: number;
    supplierName: string;
  };
}