/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

export const usePostDataWithParams = <TData>(endpoint: string) => {
  const apiClient = new APIClient<TData>(endpoint);
  return useMutation<
    FetchResponse<TData>,
    Error,
    { body?: unknown; queryParams?: Record<string, any> }
  >({
    mutationFn: ({ body, queryParams } = {}) =>
      apiClient.postWithParams(body, queryParams),
  });
};

export default usePostDataWithParams;

/*   
  USAGE EXAMPLE:
  later
*/