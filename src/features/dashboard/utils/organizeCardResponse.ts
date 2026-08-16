import type {
  DailyWindowCardsData,
  StatCardData,
} from "../types/dashboard.types";

const formatCount = (value: number): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const formatAmount = (value: number): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

export const organizeCardResponse = (
  cardResponse: DailyWindowCardsData,
): StatCardData[] => {
  const nearExpiryCount =
    cardResponse.cards.nearExpiry?.count ??
    cardResponse.cards.alerts?.count ??
    0;

  return [
    {
      title: "أصناف قاربت الانتهاء",
      value: formatCount(nearExpiryCount),
      note: "تبقى خلال 3 شهر",
      tone: "danger",
    },
    {
      title: "عدد الفواتير",
      value: formatCount(cardResponse.cards.invoices.totalCount),
      tone: "warning",
    },
    {
      title: "إجمالي المبيعات",
      value: formatAmount(cardResponse.cards.grossSales.amount),
      suffix: "SP",
      tone: "info",
    },
    {
      title: "صافي الأرباح",
      value: formatAmount(cardResponse.cards.grossProfit.grossProfitAmount),
      suffix: "SP",
      tone: "info",
    },
  ];
};
