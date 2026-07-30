import type { PricingMode } from "../types/enums";
import type { SaleUnit } from "../types/saleInvoiceCreate";

export function calculateEffectivePrice(
  unit: SaleUnit,
  mode: PricingMode,
  extraPct?: number,
  manualPrice?: number
): number {
  if (mode === "MANUAL" && manualPrice && manualPrice > 0) return manualPrice;
  if (mode === "EXTRA_PERCENTAGE" && extraPct && extraPct > 0) {
    return unit.suggestedUnitPrice + unit.suggestedUnitPrice * (extraPct / 100);
  }
  return unit.suggestedUnitPrice;
}