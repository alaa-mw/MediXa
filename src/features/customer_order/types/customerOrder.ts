export interface CustomerOrder {
  customerRequestId: string;
  pharmacyId: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  status: OrderStatus;
  requestedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  itemsCount: number;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "RECEIVED" | "CANCELLED";
