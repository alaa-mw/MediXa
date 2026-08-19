
import usePostData from "../../../shared/hooks/usePostData";
import type { CheckoutPreviewData, CheckoutResponse, CustomerRequestItem } from "../types/customerRequest";



// export const useGetCustomerRequests = (
//   initialParams: {
//     page?: number;
//     limit?: number;
//     status?: string;
//     [key: string]: any;
//   } = { page: 1, limit: 10, status: "PENDING" }
// ) => {
//   return useGetWithParams<CustomerRequestItem[]>(
//     "/customer-request",
//     initialParams
//   );
// };


// export const useGetCheckoutPreview = (customerRequestId: number | null) => {
//   const endpoint = customerRequestId
//     ? `/customer-request/${customerRequestId}/checkout-preview`
//     : "";

//   return useGetData<CheckoutPreviewData>(endpoint);
// };


export const useCheckoutCustomerRequest = (customerRequestId: number | null) => {
  const endpoint = customerRequestId
    ? `/customer-request/${customerRequestId}/checkout`
    : "";

  return usePostData<CheckoutResponse>(endpoint);
};