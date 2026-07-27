// export interface BatchAllocation {
//   saleInvoiceItemBatchId: number;
//   batchId: number;
//   soldBaseQuantity: number;
//   soldDisplayQuantity: number;
//   returnedBaseQuantity: number;
//   remainingReturnableBaseQuantity: number;
//   remainingReturnableDisplayQuantity: number;
//   batch: {
//     batchId: number;
//     expiryDate: string;
//     receivedDate: string;
//     status: string;
//   };
//   allocationCreatedAt: string;
// }

// export interface SaleInvoiceBatchItemResponse {
//   saleInvoiceItemId: number;
//   pharmacyDrugId: number;
//   drugId: number;
//   tradeName: string;
//   source: string;
//   unitType: string;
//   unitFactorToBase: number;
//   soldBaseQuantity: number;
//   soldDisplayQuantity: number;
//   totalPrice: number;
//   discountAmount: number;
//   netTotalPrice: number;
//   batches: BatchAllocation[];
// }

// export interface SaleInvoiceBatchesResponse {
//   saleInvoiceId: number;
//   pharmacyInvoiceId: number;
//   invoiceDate: string;
//   invoiceStatus: string;
//   itemsCount: number;
//   totalBatchAllocations: number;
//   items: SaleInvoiceBatchItemResponse[];
// }

export interface BatchAllocation {
  saleInvoiceItemBatchId: number;
  batchId: number;
  soldBaseQuantity: number;
  soldDisplayQuantity: number;
  returnedBaseQuantity: number;
  remainingReturnableBaseQuantity: number;
  remainingReturnableDisplayQuantity: number;
  batch: {
    batchId: number;
    expiryDate: string;
    receivedDate: string;
    status: string;
  };
  allocationCreatedAt: string;
}

export interface SaleInvoiceBatchItemResponse {
  saleInvoiceItemId: number;
  pharmacyDrugId: number;
  drugId: number;
  tradeName: string;
  source: string;
  unitType: string;
  unitFactorToBase: number;
  soldBaseQuantity: number;
  soldDisplayQuantity: number;
  totalPrice: number;
  discountAmount: number;
  netTotalPrice: number;
  returnedBaseQuantity: number;
  remainingReturnableBaseQuantity: number;
  remainingReturnableDisplayQuantity: number;
  batches: BatchAllocation[];

  // حقول اختيارية تتحكم بها الواجهة الأمامية للاختيار
  checked?: boolean;
  selectedBatchId?: number;
  selectedQuantity?: number;
  displayQuantity?: number;
}

export interface SaleInvoiceBatchesResponse {
  saleInvoiceId: number;
  pharmacyInvoiceId: number;
  invoiceDate: string;
  invoiceStatus: string;
  itemsCount: number;
  totalBatchAllocations: number;
  items: SaleInvoiceBatchItemResponse[];
}
