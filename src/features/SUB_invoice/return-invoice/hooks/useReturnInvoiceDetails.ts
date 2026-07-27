import useGetData from "../../../../shared/hooks/useGetData";
import type { ReturnInvoiceDetails } from "../Types/returnInvoiceDetailsType";

export const useReturnInvoiceDetails = (returnInvoiceId: number) => {
  const endpoint = `/return-invoice/${returnInvoiceId}`;

  return useGetData<ReturnInvoiceDetails>(endpoint);
};

export default useReturnInvoiceDetails;
