import type { PurchaseOrderStatus } from "../types/purchaseOrder";

const purchaseOrderStatusLabels: Record<PurchaseOrderStatus, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  PARTIALLY_RECEIVED: "مستلم جزئيا",
  RECEIVED: "مستلم",
  CANCELLED: "ملغي",
};

export default function getPurchaseOrderStatusLabel(status: string): string {
  return purchaseOrderStatusLabels[status as PurchaseOrderStatus] ?? status;
}
