// hooks/usePatchData.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import type { FetchResponse } from "../api/api-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePatchData = <TData,>(endpoint: string, data?: unknown) => {
  const apiClient = new APIClient<TData>(endpoint);
  return useMutation<FetchResponse<TData>, Error, typeof data>({
    mutationFn: (bodyData?) => {
      console.log("mutate", bodyData);
      return apiClient.patch(bodyData);
    },
  });
};

export default usePatchData;

/*
  USAGE EXAMPLE:  

    const { mutate: changeStatus } = usePatchData(
    `/complaints/change-status/${complaintId}`
  );

  const exec = (statusValue: string) => {
    changeStatus(
      { status: statusValue },
      {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
          closeMenu();
        },
        onError: (error) => {
          console.error("change status error", error);
          showSnackbar(error.message, "error");
        },
      }
    );
  };
  
*/
