export interface CreateCheckoutBody {
  planId: number;
  offerId: number;
  idempotencyKey: string;
}

export interface CheckoutResponseData {
  subscriptionPaymentId: number;
  status: string;
  amount: number;
  currency: "USD";
  checkoutUrl: string;
}
export interface SubscriptionStatusData {
  subscriptionPaymentId: number;
  status: "SUCCEEDED" | "PENDING" | "FAILED" | "PROCESSING" | "EXPIRED";
  amount: number;
  currency: "USD";
  paidAt: string;
  pharmacySubscriptionId: number;
  subscription: {
    pharmacySubscriptionId: number;
    status: string;
    startsAt: string;
    endsAt: string;
  };
}
