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

/*
  is specified just for blob data, it uses the postBolob method in the APIClient 
  which is specifically designed to handle file uploads.
  The usage is similar to usePostData, 
  but you would pass a FormData object containing the file(s) you want to upload as the bodyData parameter when calling the mutate function.
*/
