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

/*
  USAGE EXAMPLE:

   const { mutate: deleteEmployee } = useDeleteData(
    `/government/${fetchId}/users`
  );

  const handleDeleteEmployee = (empId: number) => {
    setDeletingId(empId);
    deleteEmployee(
      { userIds: [empId] },
      {
        onSuccess: () => {
          showSnackbar("تم حذف الموظف من الجهة", "success");
          refetch();
        },
        onError: () => {
          showSnackbar("حدث خطأ أثناء الحذف", "error");
        },
        onSettled: () => setDeletingId(null),
      }
    );
  };

*/
