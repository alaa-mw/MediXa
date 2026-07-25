export interface SubscriptionOffer {
  offerId: number;
  code: string;
  title: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  finalPrice: number;
  startsAt: string;
  endsAt: string;
}

export interface SubscriptionPlan {
  planId: number;
  code: string;
  name: string;
  description: string;
  durationMonths: number;
  type: string;
  currency: string;
  basePrice: number;
  currentPrice: number;
  hasActiveOffer: boolean;
  bestOfferId: number | null;
  publicOffers: SubscriptionOffer[];
}
