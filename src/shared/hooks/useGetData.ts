import { useQuery } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

export const useGetData = <TData>(endpoint: string, enabled = true) => {
  const apiClient = new APIClient<TData>(endpoint);
  return useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.get(),
    // enabled,
    enabled: !!endpoint,
  });
};

export default useGetData;

/*
  USAGE EXAMPLE:

   const { data, isLoading, isError } = useGetData<ProfileData>(
    "/authentication/profile"
  );

*/
