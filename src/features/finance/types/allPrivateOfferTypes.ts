export interface OfferPlan {
  planId: number;
  code: string;
  name: string;
  description: string;
  durationMonths: number;
  type: string;
}

export interface OfferPricing {
  basePrice: number;
  discountType: string;
  discountValue: number;
  finalPrice: number;
  currency: "USD";
}

export interface UnexpiredPrivateOffer {
  offerId: number;
  code: string;
  title: string;
  description: string;
  scope: string;
  status: string;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  plan: OfferPlan;
  pricing: OfferPricing;
  createdAt: string;
}
