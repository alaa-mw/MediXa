import useGetData from "../../../shared/hooks/useGetData";
import type { SaleInvoiceResponse } from "../Types/saleInvoiceDetailsTypes";

const useSaleInvoice = (id?: string) => {
  return useGetData<SaleInvoiceResponse>(`/sale-invoice/${id}`);
};

export default useSaleInvoice;
