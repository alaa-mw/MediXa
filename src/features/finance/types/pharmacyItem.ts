export interface Plan {
  planId: number;
  code: string;
  name: string;
}

export interface NextSubscription {
  pharmacySubscriptionId: number;
  status: string;
  startsAt: string;
  endsAt: string;
  plan: Plan;
}

export interface PharmacyItemData {
  pharmacyId: number;
  pharmacyName: string;
  email: string;
  status: string;
  activeSubscription: any | null;
  nextSubscription: NextSubscription | null;
  hasAvailablePrivateOffers: boolean;
  availablePrivateOffers: any[];
}

/**
 * لاحظ هنا
 * عبارة عن Array فقط
 */
export type PharmacyResponse = PharmacyItemData[];
