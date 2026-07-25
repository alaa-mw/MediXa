export type ReturnInvoiceResponse = {
  idempotencyKey: string;
  referenceSaleInvoiceId: number;
  invoiceDate: string;
  notes: string;
  items: ReturnInvoiceResponseItem[];
};

export type ReturnInvoiceResponseItem = {
  saleInvoiceItemBatchId: number;
  unitType: string;
  displayQuantity: number;
  returnReason: string;
  restockToInventory: boolean;
};
