import { useQuery } from "@tanstack/react-query";
import type { SubscriptionStatusData } from "../types/pharmaSub";
import APIClient from "../../../shared/api/api-client";

export const useSubscriptionStatus = (paymentId: string | number) => {
  const apiClient = new APIClient<SubscriptionStatusData>(
    `/subscription-payments/${paymentId}/status`,
  );

  return useQuery({
    queryKey: ["subscriptionStatus", paymentId],
    queryFn: () => apiClient.get(),
    enabled: !!paymentId,
    retry: 2,
  });
};
