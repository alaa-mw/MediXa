export interface ReturnInvoiceBySale {
  returnInvoiceId: number;
  pharmacyInvoiceId: number;
  referenceSaleInvoiceId: number;
  subtotalRefund: string;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: {
    pharmacyInvoiceId: number;
    pharmacyId: number;
    patientId: number | null;
    invoiceType: string;
    invoiceDate: string;
    status: string;
    notes: string | null;
    idempotencyKey: string | null;
    createdAt: string;
    updatedAt: string;
    patient: {
      patientId: number;
      pharmacyId: number;
      fullName: string;
      nationalId: string;
      phone: string;
      createdAt: string;
      updatedAt: string;
    } | null;
  };
  referenceSaleInvoice: {
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
      status: string;
      notes: string | null;
      idempotencyKey: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
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
  createdAt: string;
  pharmacyDrug: {
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
    drug: {
      drugId: number;
      source: string;
      createdAt: string;
      updatedAt: string;
      generalDrug: {
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
      } | null;
      privateDrug: any | null;
    };
  };
  saleInvoiceItemBatch: {
    saleInvoiceItemBatchId: number;
    saleInvoiceItemId: number;
    batchId: number;
    baseQuantity: number;
    unitCostAtSale: string | null;
    createdAt: string;
    batch: {
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
    };
    saleInvoiceItem: {
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
      discountAmount: string;
      netTotalPrice: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  displayQuantity: number;
  originalSoldDisplayQuantity: number;
}
