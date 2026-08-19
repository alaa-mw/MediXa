export type DiscountType = "" | "PERCENTAGE" | "FIXED_AMOUNT";

export type OfferScope = "PRIVATE" | "PUBLIC";

export interface OfferFormModel {
  code: string;
  title: string;
  description: string;
  scope: OfferScope;
  discountType: DiscountType;
  discountValue: number;
  startsAt: string;
  endsAt: string;
}

export interface PharmacyAssignmentModel {
  pharmacyIds: number[];

  grantReason: string;

  note: string;
}

// export interface CreatePrivateOfferRequest {
//   offer: OfferFormModel;

//   assignments: PharmacyAssignmentModel[];
// }
