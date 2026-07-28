// export interface PrivateOfferItem {
//   offerId: number;
//   code: string;
//   title: string;
//   description: string;
//   discountType: string;
//   discountValue: number;
//   finalPrice: number;
//   startsAt: string;
//   endsAt: string;
//   grant?: {
//     pharmacyOfferGrantId: number;
//     grantReason: string;
//     validFrom: string;
//     validUntil: string;
//     note: string;
//   };
// }

// export interface PrivateOffersResponse {
//   planId: number;
//   code: string;
//   name: string;
//   description: string;
//   durationMonths: number;
//   type: string;
//   currency: string;
//   basePrice: number;
//   currentPrice: number;
//   hasActiveOffer: boolean;
//   bestOfferId: number;
//   privateOffers: PrivateOfferItem[];
// }

export interface PrivateOfferItem {
  offerId: number;
  code: string;
  title: string;
  description: string;
  discountType: string;
  discountValue: number;
  finalPrice: number;
  startsAt: string;
  endsAt: string;
  grant?: {
    pharmacyOfferGrantId: number;
    grantReason: string;
    validFrom: string;
    validUntil: string;
    note: string;
  };
}

export interface PrivateOffersResponse {
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
  privateOffers: PrivateOfferItem[];
}