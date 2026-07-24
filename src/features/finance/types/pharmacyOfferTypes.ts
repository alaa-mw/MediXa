export interface OfferDetails {
  offerId: number;
  code: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
}

export interface PlanDetails {
  planId: number;
  code: string;
  name: string;
  durationMonths: number;
}

export interface PricingDetails {
  basePrice: number;
  discountType: string;
  discountValue: number;
  finalPrice: number;
  currency: string;
}

export interface PrivateOffer {
  pharmacyOfferGrantId: number;
  grantReason: string;
  validFrom: string;
  validUntil: string;
  note: string;
  offer: OfferDetails;
  plan: PlanDetails;
  pricing: PricingDetails;
}
