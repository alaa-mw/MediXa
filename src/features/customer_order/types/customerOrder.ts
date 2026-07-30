export interface CustomerOrder {
  customerRequestId: string;
  pharmacyId: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  status: CustomerRequestStatus;
  requestedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  itemsCount: number;
}

export type CustomerRequestStatus =
  | "PENDING"
  | "PARTIALLY_FULFILLED"
  | "READY_FOR_PICKUP"
  | "COMPLETED"
  | "CANCELLED";

export interface CustomerOrderDet extends CustomerOrder {
  items: CustomerOrderItem[];
}

export interface CustomerOrderItem {
  customerRequestItemId: string;
  customerRequestId: string;
  pharmacyDrugId: string;
  requestedQuantity: number;
  fulfilledQuantity: number;
  status: CustomerRequestItemStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  tradeName: string;
}

export type CustomerRequestItemStatus =
  | "PENDING"
  | "ORDERED"
  | "RESERVED"
  | "FULFILLED"
  | "CANCELLED";