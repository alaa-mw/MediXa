import usePostDataWithParams from "../../../shared/hooks/usePostDataWithParams";
import type { OfferFormModel } from "../types/offerTypes";

export const useMakeOffer = (planId: number) => {
  return usePostDataWithParams<OfferFormModel>(
    `/subscriptions/admin/plans/${planId}/offers`,
  );
};

export default useMakeOffer;
