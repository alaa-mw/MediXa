import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePostDataNoToken = <TData> ( endpoint: string , data?: unknown ) => {
    const apiClient = new APIClient<TData>(endpoint); 
    return useMutation<FetchResponse<TData>, Error, typeof data>({
      mutationFn: (bodyData? ) => {
        console.log("mutate",bodyData);
        return  apiClient.postNoToken(
          bodyData
        );
      },
     });
  };    

export default usePostDataNoToken;

/*
  same usage as usePostData but without token in the request header. This is useful for endpoints that do not require authentication, such as login or registration endpoints.
*/