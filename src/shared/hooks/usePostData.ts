import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePostData = <TData> ( endpoint: string , data?: unknown ) => {
    const apiClient = new APIClient<TData>(endpoint); 
    return useMutation<FetchResponse<TData>, Error, typeof data>({
      mutationFn: (bodyData? ) => {
        console.log("mutate",bodyData);
        return  apiClient.post(
          bodyData
        );
      },
     });
  };    

export default usePostData;

// FetchResponse<TData> = Success response type

// Error = Error type

// typeof data = The type of the mutation input (inferred from the data parameter)