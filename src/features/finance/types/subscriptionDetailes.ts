export interface PharmacyInfo {
  pharmacyId: number;
  pharmacyName: string;
  pharmacyCode: string;
}

export interface SubscriptionPlan {
  planId: number;
  code: string;
  name: string;
  type: string;
  durationMonths: number;
}

export interface AppliedOffer {
  appliedOfferId: number;
  offerId: number;
  code: string;
  title: string;
  scope: string;
  discountType: string;
  discountValue: number;
}

export interface PharmacySubscription {
  pharmacySubscriptionId: number;
  status: "ACTIVE" | "SCHEDULED" | "EXPIRED";

  startsAt: string;
  endsAt: string;

  plan: SubscriptionPlan;

  basePrice: number;
  finalPrice: number;

  currency: string;

  appliedOffer: AppliedOffer | null;

  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PharmacySubscriptionsResponse {
  pharmacy: PharmacyInfo;

  currentSubscription: PharmacySubscription | null;

  subscriptions: PharmacySubscription[];

  pagination: Pagination;
}
