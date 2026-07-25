import useGetItem from "../../../shared/hooks/useGetItem";
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";
import usePostData from "../../../shared/hooks/usePostData";
import type { AvailableBatchesApiResponse, CreateSaleInvoiceResponse, SaleUnitsApiResponse } from "../types/saleInvoiceCreate";


export const useGetSaleUnits = (pharmacyDrugId: number | null) => {
  const endpoint = pharmacyDrugId ? `/pharmacy-drugs/${pharmacyDrugId}/sale-units` : "";
  
  return useGetItem<SaleUnitsApiResponse>(
    endpoint,
    pharmacyDrugId ? String(pharmacyDrugId) : undefined
  );
};


export const useGetAvailableBatches = (
  pharmacyDrugId: number | null, 
  unitType: string | null
) => {
  const endpoint = pharmacyDrugId ? `/pharmacy-drugs/${pharmacyDrugId}/available-batches` : "";
  const queryParams = unitType ? { unitType } : {};

  return useGetWithParamsWithoutState<AvailableBatchesApiResponse>(
    endpoint,
    queryParams,
    {
      enabled: Boolean(pharmacyDrugId && unitType),
    }
  );
};


export const useCreateSaleInvoice = () => {
  return usePostData<CreateSaleInvoiceResponse>("/sale-invoice/create");
};