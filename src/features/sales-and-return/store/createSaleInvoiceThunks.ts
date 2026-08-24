import { createAsyncThunk } from "@reduxjs/toolkit";
import APIClient from "../../../shared/api/api-client";
import type {
  InvoiceItem,
  SaleUnit,
  SaleUnitsApiResponse,
} from "../types/saleInvoiceCreate";
import { changeQuantity, type SaleInvoiceSliceState } from "./createSaleInvoiceSlice";

export const fetchAndAddDrug = createAsyncThunk(
  "saleInvoice/fetchAndAddDrug",
  async (
    payload: {
      pharmacyDrugId: number;
      drugInfo?: {
        tradeName?: string;
        dosageFormName?: string;
        requiresPrescription?: boolean;
      };
    },
    { getState, dispatch }
  ) => {
    const state = (getState() as { saleInvoice: SaleInvoiceSliceState }).saleInvoice;
    const existing = state.items.find(
      (i) => i.pharmacyDrugId === payload.pharmacyDrugId
    );

    if (existing) {
      const maxAvailable = existing.selectedUnit.availableDisplayQuantity;
      if (existing.displayQuantity < maxAvailable) {
        dispatch(
          changeQuantity({
            pharmacyDrugId: payload.pharmacyDrugId,
            newQty: existing.displayQuantity + 1,
          })
        );
      }
      return null;
    }

    const client = new APIClient<SaleUnitsApiResponse>(
      `/pharmacy-drugs/${payload.pharmacyDrugId}/sale-units`
    );
    const response = await client.get();
    const responseData = (response as any).data || response;
    const saleUnits: SaleUnit[] = responseData.saleUnits || [];

    if (!saleUnits.length) return null;

    const defaultUnit =
      saleUnits.find((u) => u.availableDisplayQuantity > 0) || saleUnits[0];
    const effectivePrice = defaultUnit.suggestedUnitPrice;

    const newItem: InvoiceItem = {
        pharmacyDrugId: payload.pharmacyDrugId,
        tradeName: payload.drugInfo?.tradeName ||
            responseData.drugName ||
            `صنف #${payload.pharmacyDrugId}`,
        dosageFormName: payload.drugInfo?.dosageFormName,
        // requiresPrescription: payload.drugInfo?.requiresPrescription || false,
        requiresPrescription:
  responseData.isRx ?? payload.drugInfo?.requiresPrescription ?? false,
        availableSaleUnits: saleUnits,
        selectedUnit: defaultUnit,
        displayQuantity: defaultUnit.availableDisplayQuantity > 0 ? 1 : 0,
        pricingMode: "SUGGESTED",
        effectiveUnitPrice: effectivePrice,
        subtotal: 0
    };

    return newItem;
  }
);