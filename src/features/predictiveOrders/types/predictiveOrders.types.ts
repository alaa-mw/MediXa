export interface PredictiveOrderItem {
  pharmacyDrugId: number;
  drugName: string;
  unitsPerBox: number;
  currentStock: number;
  currentFullBoxes: number;
  currentLooseUnits: number;
  incomingQuantity: number;
  pendingCustomerDemand: number;

  projectedStock: number;
  projectedFullBoxes: number;
  projectedLooseUnits: number; // وحدات من علب مسحوب منها

  safetyStock: number;
  safetyStockBoxes: number;

  recommendedQuantity: number;
  recommendedBoxes: number;
  recommendedPurchaseQuantity: number; //  عدد الوحدات التي ستدخل فعلياً عند طلب العلب المقترحة
}

export interface IncomingOrderItem {
  purchaseOrderId: number;
  purchaseOrderItemId: number;
  pharmacyDrugId: number;
  drugName: string;
  supplierId: number;
  supplierName: string;
  orderedQuantityBoxes: number;
  orderDate: string;
  expectedReceiptDate: string;
  deliveryStatus: string;
  daysUntilReceipt: number;
}
