export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price);

export const getSavingAmount = (basePrice: number, currentPrice: number) =>
  basePrice - currentPrice;
