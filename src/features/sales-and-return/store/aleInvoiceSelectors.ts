import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../shared/store";

export const selectSaleInvoiceState = (state: RootState) => state.saleInvoice;

export const selectSaleInvoiceItems = (state: RootState) => state.saleInvoice.items;

export const selectSaleInvoiceDiscount = (state: RootState) => state.saleInvoice.discount;

export const selectSaleInvoicePaymentStatus = (state: RootState) => state.saleInvoice.paymentStatus;


export const selectItemsWithSubtotal = createSelector(
  [selectSaleInvoiceItems],
  (items) =>
    items.map((item) => ({
      ...item,
      subtotal: item.effectiveUnitPrice * item.displayQuantity,
    }))
);

export const selectSubTotal = createSelector(
  [selectSaleInvoiceItems],
  (items) =>
    items.reduce(
      (sum, item) => sum + item.effectiveUnitPrice * item.displayQuantity,
      0
    )
);

export const selectNetTotal = createSelector(
  [selectSubTotal, selectSaleInvoiceDiscount],
  (subTotal, discountValue) => {
    const discount = Number(discountValue) || 0;
    return Math.max(0, subTotal - discount);
  }
);

export const selectRequiresPrescriptionAny = createSelector(
  [selectSaleInvoiceItems],
  (items) => items.some((i) => i.requiresPrescription)
);

export const selectShouldShowPatientCard = createSelector(
  [selectRequiresPrescriptionAny, selectSaleInvoicePaymentStatus],
  (requiresPrescription, status) =>
    requiresPrescription || status === "PENDING" || status === "PARTIAL"
);