export interface Supplier {
  supplierId: number;
  pharmacyId: number;
  supplierName: string;
  phone: string;
  address: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}


export type PurchaseOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RECEIVED"
  | "CANCELLED";

export type PurchaseOrderItemStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RECEIVED"
  | "CANCELLED";

export interface PurchaseOrder {
  purchaseOrderId: number;
  pharmacyId: number;
  supplierId: number;
  orderDate: string;
  orderStatus: PurchaseOrderStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  supplier: Supplier;
  itemsCount: number;
}

export interface PurchaseOrderItem {
  purchaseOrderItemId: number;
  purchaseOrderId: number;
  pharmacyDrugId: number;
  orderedQuantityBoxes: number;
  status: PurchaseOrderItemStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  tradeName: string;
}

export interface PurchaseOrderDetails extends Omit<
  PurchaseOrder,
  "itemsCount"
> {
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderCreateItem {
  pharmacyDrugId: number;
  orderedQuantityBoxes: number;
  notes?: string;
}

export interface PurchaseOrderCreatePayload {
  idempotencyKey:string;
  supplierId: number;
  notes?: string;
  items: PurchaseOrderCreateItem[];
}

export interface PharmacyDrugSearch {
  pharmacyDrugId: number | string;
  tradeName: string;
}
