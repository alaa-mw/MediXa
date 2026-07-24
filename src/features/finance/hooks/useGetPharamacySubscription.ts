import { useGetWithParamsWithoutState } from "../../../shared/hooks/useGetWithParamsWithoutState";
import type { QueryParams } from "../../../shared/api/api-types";
import type { PharmacySubscriptionsResponse } from "../types/subscriptionDetailes";

export const useGetPharmacySubscriptions = (
  pharmacyId: number,
  params: QueryParams,
) => {
  return useGetWithParamsWithoutState<PharmacySubscriptionsResponse>(
    `/subscriptions/admin/pharmacies/${pharmacyId}/subscriptions`,
    params,
  );
};
