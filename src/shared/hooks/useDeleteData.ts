import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

export const useDeleteData = <TData, TVariables = unknown>(
  endpoint: string,
): UseMutationResult<FetchResponse<TData>, Error, TVariables> => {

  const apiClient = new APIClient<TData>(endpoint);
  return useMutation<FetchResponse<TData>, Error, TVariables>({
    mutationFn: (body?: TVariables) => {
      return apiClient.deleteWithBody(body);
    },
  });
};

export default useDeleteData;
