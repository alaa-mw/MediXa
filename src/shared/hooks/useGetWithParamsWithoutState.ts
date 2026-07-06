import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FetchResponse } from "../api/api-types";
import APIClient from "../api/api-client";

export const useGetWithParamsWithoutState = <TData>(
  endpoint: string,
  queryParams: Record<string, any> = {}, // حذفنا كلمة initial
) => {
  const apiClient = new APIClient<TData>(endpoint);

  const query = useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint, queryParams], // React Query سيراقب هذا الكائن مباشرة
    queryFn: () => apiClient.get(queryParams),
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data as FetchResponse<TData> | undefined,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    // لم نعد بحاجة لإرجاع setQueryParams أو queryParams لأن الأب هو من يتحكم بها
  };
};

export default useGetWithParamsWithoutState;