import useGetData from "../../../shared/hooks/useGetData";
import usePostData from "../../../shared/hooks/usePostData";

export type GeneralDrugPriceListSummary = {
  generalDrugPriceListId: number;
  version: number;
  publishedAt: string;
};

export type GeneralDrugPriceListStatusData = {
  hasNewPriceList: boolean;
  latestPriceList: GeneralDrugPriceListSummary | null;
  lastAppliedPriceList: GeneralDrugPriceListSummary | null;
  affectedDrugsCount: number;
};

export type GeneralDrugPriceListChangeItem = {
  pharmacyDrugId: number;
  generalDrugId: number;
  tradeName: string;
  currentNetPrice: number;
  newNetPrice: number;
  currentConsumerPrice: number;
  newConsumerPrice: number;
  netPriceChanged: boolean;
  consumerPriceChanged: boolean;
};

export type GeneralDrugPriceListChangesData = {
  hasNewPriceList: boolean;
  latestPriceList: GeneralDrugPriceListSummary | null;
  lastAppliedPriceList: GeneralDrugPriceListSummary | null;
  affectedDrugsCount: number;
  items: GeneralDrugPriceListChangeItem[];
};

export const useGeneralDrugPriceListStatus = () =>
  useGetData<GeneralDrugPriceListStatusData>(
    "/general-drug-price-lists/status",
  );

export const useLatestPriceListChanges = (enabled: boolean) =>
  useGetData<GeneralDrugPriceListChangesData>(
    "/general-drug-price-lists/latest/changes",
    enabled,
  );

export const useApplyLatestPriceList = () =>
  usePostData<void>("/general-drug-price-lists/latest/apply");
