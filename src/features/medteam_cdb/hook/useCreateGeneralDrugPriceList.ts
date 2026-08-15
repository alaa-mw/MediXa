import usePostData from "../../../shared/hooks/usePostData";

export type GeneralDrugPriceListItem = {
  generalDrugId: number;
  netPrice?: number;
  consumerPrice?: number;
};

export type GeneralDrugPriceListPayload = {
  items: GeneralDrugPriceListItem[];
};

const useCreateGeneralDrugPriceList = () => {
  const mutation = usePostData<GeneralDrugPriceListPayload>(
    "/general-drug-price-lists",
  );

  const submitPriceList = (
    payload: GeneralDrugPriceListPayload,
    options?: Parameters<typeof mutation.mutate>[1],
  ) => {
    mutation.mutate(payload, options);
  };

  return {
    ...mutation,
    submitPriceList,
  };
};

export default useCreateGeneralDrugPriceList;
