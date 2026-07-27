import { useQuery } from "@tanstack/react-query";
import type { FetchResponse } from "../api/api-types";
import APIClient from "../api/api-client";

export const useGetItem = <TData>(endpoint: string, id?: string, retryOption?: { retries: number }) => {
  const apiClient = new APIClient<TData>(endpoint);
  // console.log("fetchId",id)
  return useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint, id],
    queryFn: () => apiClient.get(),
    enabled: !!id, // Only enable the query if id is truthy
    retry: retryOption?.retries ?? 3, // Retry the query up to 3 times on failure
  });
};

export default useGetItem;

/*   
  USAGE EXAMPLE:
  later
*/