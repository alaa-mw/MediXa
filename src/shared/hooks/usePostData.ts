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

/*
  USAGE EXAMPLE:

    const {
    mutate: addEmployee,
    isPending,
    isError,
    error,
    isSuccess,
  } = usePostData<EmployeeResponse>("/authentication/employees");


   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitting employee data:", formData);
      addEmployee(formData, {
        onSuccess: (response) => {
          console.log("Employee added successfully:", response);
          handleReset();
        },
        onError: (error) => {
          console.error("Failed to add employee:", error);
        },
      });
    }
  };

  const [formData, setFormData] = useState<EmployeeFormData>({
    full_name: "",
    email: "",
    phone_number: "",
    governmentId: '',
  });

*/