// ==========================================
// 1. GET /api/customer-request (قائمة الطلبات)
// ==========================================

import type { CustomerRequestStatus, PaymentStatus } from "./enums";

export interface CustomerRequestItem {
  customerRequestId: number;
  pharmacyId: number;
  customerName: string;
  customerPhone: string;
  notes: string | null;
  status: CustomerRequestStatus;
  requestedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  itemsCount: number;
}

export interface CustomerRequestsList {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: CustomerRequestItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// ==========================================
// 2. GET /api/customer-request/:id/checkout-preview (معاينة طلب زبون)
// ==========================================

export interface CheckoutPreviewItem {
  customerRequestItemId: number;
  pharmacyDrugId: number;
  tradeName: string;
  unitType: "BOX" | "STRIP";
  unitLabel: string;
  unitFactorToBase: number;
  requestedQuantity: number;
  fulfilledQuantity: number;
  remainingQuantity: number;
  availableBaseQuantity: number;
  availableQuantity: number;
  suggestedSaleQuantity: number;
  suggestedUnitPrice: number;
  canFulfillCompletely: boolean;
  hasAvailableStock: boolean;
  status: string;
  notes: string | null;
}

export interface CheckoutPreviewData {
  customerRequestId: number;
  customerName: string;
  customerPhone: string;
  notes: string | null;
  status: string;
  requestedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  canFulfillCompletely: boolean;
  canCreateSaleInvoice: boolean;
  items: CheckoutPreviewItem[];
}

export interface CheckoutPreviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: CheckoutPreviewData;
}

// ==========================================
// 3. POST /api/customer-request/:id/checkout (إرسال الفاتورة)
// ==========================================

export interface CheckoutItemPayload {
  customerRequestItemId: number;
  saleQuantity: number;
}

export interface CustomerRequestCheckoutPayload {
  idempotencyKey: string;
  paymentStatus: PaymentStatus;
      paidAmount?: number;

  discount: number;
  notes?: string;
  items: CheckoutItemPayload[];
}

export interface CheckoutResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}