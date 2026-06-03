import { useQuery } from "@tanstack/react-query";
import type { FetchResponse } from "../api/api-types";
import APIClient from "../api/api-client";

export const useGetItem = <TData>(endpoint: string, id?: string) => {
  const apiClient = new APIClient<TData>(endpoint);
  // console.log("fetchId",id)
  return useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint, id],
    queryFn: () => apiClient.get(),
    enabled: !!id, // Only enable the query if id is truthy
  });
};

export default useGetItem;

/*   
  USAGE EXAMPLE:
  later
*/