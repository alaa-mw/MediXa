import useGetData from "../../../shared/hooks/useGetData";
import type { SaleInvoiceDetails } from "../Types/saleInvoiceDetailsTypes";

export const useSaleInvoiceDetails = (invoiceId: number) => {
  const endpoint = `/sale-invoice/${invoiceId}`;

  return useGetData<SaleInvoiceDetails>(endpoint);
};

export default useSaleInvoiceDetails;
