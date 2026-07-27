import useGetData from "../../../../shared/hooks/useGetData";
import type { SaleInvoiceBatchesResponse } from "../../Types/saleInvoiceItemBatches";

export const useSaleInvoiceBatches = (saleInvoiceId: number) => {
  return useGetData<SaleInvoiceBatchesResponse>(
    `/api/sale-invoice/${saleInvoiceId}/batches`,
  );
};
