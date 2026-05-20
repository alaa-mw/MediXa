import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePostFile = <TData>(endpoint: string, data?: unknown) => {
  const apiClient = new APIClient<TData>(endpoint);
  return useMutation<FetchResponse<TData>, Error, typeof data>({
    mutationFn: (bodyData?) => {
      console.log("mutate", bodyData);
      return apiClient.postBolob(bodyData);
    },
  });
};

export default usePostFile;
