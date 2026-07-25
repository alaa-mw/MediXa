/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FetchResponse } from "../api/api-types";
import APIClient from "../api/api-client";

type UseGetWithParamsOptions = {
  shouldFetch?: (queryParams: Record<string, any>) => boolean;
};

export const useGetWithParams = <TData>(
  endpoint: string,
  initialQueryParams: Record<string, any> = {},
  options: UseGetWithParamsOptions = {},
) => {
  const [queryParams, setQueryParams] =
    useState<Record<string, any>>(initialQueryParams);
  const apiClient = new APIClient<TData>(endpoint);

  // حذف أي بارامتر قيمته ""
  const cleanedQueryParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(queryParams).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined,
        ),
      ),
    [queryParams],
  );

  const isEnabled = options.shouldFetch
    ? options.shouldFetch(cleanedQueryParams)
    : true;

  const query = useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint, cleanedQueryParams], // Include cleanedQueryParams in the query key to refetch when they change
    queryFn: () => apiClient.get(cleanedQueryParams),
    placeholderData: keepPreviousData, // Keep previous data while fetching new data
    enabled: isEnabled,
  });


  return {
    data: query.data as FetchResponse<TData> | undefined,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    queryParams,
    setQueryParams,
  };
};

export default useGetWithParams;

/*
  USAGE EXAMPLE:

   const {
    data: complaintsResponse,
    isLoading,
    queryParams,
    setQueryParams,
    refetch,
  } = useFetchDataWithParams<ComplaintsPaginationResponse>(
    "/complaints/all-complaints",
    { page: 1, limit: 10, status: "", governmentId: "" }
  );

  const handleGovernmentChange = (governmentId: string) => {
    // map special ids to empty string (no filter)
    const mappedId =
      governmentId === "all" || governmentId === "none" ? "" : governmentId;
    setQueryParams((prev) => ({
      ...prev,
      governmentId: mappedId,
      page: 1,
    }));
  };

*/
