import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { PrivateOffersResponse } from "../types/privateOfferPharmacy";

export const usePharmacyPrivateOffers = (
  pharmacyId: number | null,
  planId: number,
  isOpen: boolean,
) => {
  const endpoint = `/subscriptions/admin/pharmacies/${pharmacyId}/plans/${planId}/private-offers`;
  console.log("Fetching private offers from endpoint:", endpoint); // Debugging line to check the endpoint
  const { data, isLoading, isError } = useGetWithParams<PrivateOffersResponse>(
    endpoint,
    {},
    {
      shouldFetch: () => isOpen && pharmacyId !== null && planId !== null,
    },
  );
  console.log("Private Offers Data:", data?.data?.privateOffers); // Debugging line to check the fetched data
  return {
    privateOffers: data?.data?.privateOffers || [],
    isLoading,
    isError,
  };
};
