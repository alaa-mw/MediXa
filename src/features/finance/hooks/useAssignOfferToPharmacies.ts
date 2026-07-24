import usePostDataWithParams from "../../../shared/hooks/usePostDataWithParams";
import type { PharmacyAssignmentModel } from "../types/offerTypes";

export const useAssignOfferToPharmacies = (offerId: number) => {
  return usePostDataWithParams<PharmacyAssignmentModel>(
    `/subscriptions/admin/private-offers/${offerId}/grants`,
  );
};
