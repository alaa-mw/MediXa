/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FetchResponse } from "../api/api-types";
import APIClient from "../api/api-client";

export const useGetWithParams = <TData>(
  endpoint: string,
  initialQueryParams: Record<string, any> = {},
) => {
  const [queryParams, setQueryParams] =
    useState<Record<string, any>>(initialQueryParams);
  const apiClient = new APIClient<TData>(endpoint);

  const query = useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint, queryParams],
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
    queryParams,
    setQueryParams,
  };
};

export default useGetWithParams;
