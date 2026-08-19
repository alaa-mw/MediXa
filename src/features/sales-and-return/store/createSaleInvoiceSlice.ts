


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  BatchAllocation,
  InvoiceItem,
  PatientInfo,
} from "../types/saleInvoiceCreate";
import { calculateEffectivePrice } from "../utils/pricingHelper";
import { fetchAndAddDrug } from "./createSaleInvoiceThunks";
import type { PaymentStatus, PricingMode, SaleType } from "../types/enums";

export type CheckoutMode = "NORMAL" | "CUSTOMER_REQUEST";

export type SaleInvoiceSliceState = {
  checkoutMode: CheckoutMode;
  customerRequestId: number | null;
  items: InvoiceItem[];
  discount: number;
  paymentStatus: PaymentStatus;
  saleType: SaleType;
  paidAmount: number;
  notes: string;
  patient: PatientInfo;
  isAddingDrug: boolean;
  error: string | null;
};

const initialState: SaleInvoiceSliceState = {
  checkoutMode: "NORMAL",
  customerRequestId: null,
  items: [],
  discount: 0,
  paymentStatus: "PAID",
  saleType: "NORMAL",
  paidAmount: 0,
  notes: "",
  patient: { fullName: "", phone: "", nationalId: "" },
  isAddingDrug: false,
  error: null,
};

const findItem = (state: SaleInvoiceSliceState, pharmacyDrugId: number) =>
  state.items.find((i) => i.pharmacyDrugId === pharmacyDrugId);

const saleInvoiceSlice = createSlice({
  name: "saleInvoice",
  initialState,
  reducers: {
    populateFromCheckoutPreview: (
      state,
      action: PayloadAction<{
        customerRequestId: number;
        patientInfo: PatientInfo;
        notes?: string | null;
        items: InvoiceItem[];
      }>
    ) => {
      state.checkoutMode = "CUSTOMER_REQUEST";
      state.customerRequestId = action.payload.customerRequestId;
      state.patient = action.payload.patientInfo;
      state.notes = action.payload.notes || "";
      state.items = action.payload.items;
      state.error = null;
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ pharmacyDrugId: number; newQty: number }>
    ) => {
      const item = findItem(state, action.payload.pharmacyDrugId);
      if (item) {
        const maxQty = item.selectedUnit.availableDisplayQuantity;
        item.displayQuantity = Math.max(1, Math.min(action.payload.newQty, maxQty));
        item.subtotal = item.effectiveUnitPrice * item.displayQuantity;
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = findItem(state, action.payload);
      if (item) {
        const maxQty = item.selectedUnit.availableDisplayQuantity;
        item.displayQuantity = Math.min(item.displayQuantity + 1, maxQty);
        item.subtotal = item.effectiveUnitPrice * item.displayQuantity;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = findItem(state, action.payload);
      if (item) {
        item.displayQuantity = Math.max(1, item.displayQuantity - 1);
        item.subtotal = item.effectiveUnitPrice * item.displayQuantity;
      }
    },

    removeDrug: (state, action: PayloadAction<number>) => {
      // if (state.checkoutMode === "CUSTOMER_REQUEST") return;
      state.items = state.items.filter((i) => i.pharmacyDrugId !== action.payload);
    },

    changeUnit: (
      state,
      action: PayloadAction<{ pharmacyDrugId: number; newUnitType: string }>
    ) => {
      if (state.checkoutMode === "CUSTOMER_REQUEST") return;

      const { pharmacyDrugId, newUnitType } = action.payload;
      const item = findItem(state, pharmacyDrugId);
      if (item) {
        const newUnit =
          item.availableSaleUnits.find((u) => u.unitType === newUnitType) ||
          item.selectedUnit;
        item.selectedUnit = newUnit;

        if (newUnit.unitType !== "STRIP" && item.pricingMode === "EXTRA_PERCENTAGE") {
          item.pricingMode = "SUGGESTED";
          item.extraPercentage = undefined;
        }

        item.displayQuantity =
          Math.min(item.displayQuantity, newUnit.availableDisplayQuantity) || 1;

        item.effectiveUnitPrice = calculateEffectivePrice(
          newUnit,
          item.pricingMode,
          item.extraPercentage,
          item.manualUnitPrice
        );
        item.subtotal = item.effectiveUnitPrice * item.displayQuantity;
        item.batchAllocations = undefined;
      }
    },

    changePricingMode: (
      state,
      action: PayloadAction<{
        pharmacyDrugId: number;
        mode: PricingMode;
        value?: number;
      }>
    ) => {
      if (state.checkoutMode === "CUSTOMER_REQUEST") return;

      const { pharmacyDrugId, mode, value } = action.payload;
      const item = findItem(state, pharmacyDrugId);
      if (item) {
        const isStrip = item.selectedUnit.unitType === "STRIP";
        if (mode === "EXTRA_PERCENTAGE" && !isStrip) return;

        item.pricingMode = mode;
        if (mode === "SUGGESTED") {
          item.extraPercentage = undefined;
          item.manualUnitPrice = undefined;
        } else if (mode === "EXTRA_PERCENTAGE") {
          const rawPercentage = value !== undefined ? value : item.extraPercentage || 0;
          item.extraPercentage = Math.min(20, Math.max(0, rawPercentage));
          item.manualUnitPrice = undefined;
        } else if (mode === "MANUAL") {
          item.manualUnitPrice =
            value !== undefined
              ? value
              : item.manualUnitPrice || item.selectedUnit.suggestedUnitPrice;
          item.extraPercentage = undefined;
        }

        item.effectiveUnitPrice = calculateEffectivePrice(
          item.selectedUnit,
          mode,
          item.extraPercentage,
          item.manualUnitPrice
        );
        item.subtotal = item.effectiveUnitPrice * item.displayQuantity;
      }
    },

    setBatchAllocations: (
      state,
      action: PayloadAction<{
        pharmacyDrugId: number;
        allocations?: BatchAllocation[];
      }>
    ) => {
      if (state.checkoutMode === "CUSTOMER_REQUEST") return;

      const { pharmacyDrugId, allocations } = action.payload;
      const item = findItem(state, pharmacyDrugId);
      if (item) {
        if (!allocations || allocations.length === 0) {
          item.batchAllocations = undefined;
        } else {
          const totalAllocated = allocations.reduce(
            (sum, alloc) => sum + alloc.displayQuantity,
            0
          );
          item.batchAllocations = allocations;
          item.displayQuantity = totalAllocated;
          item.subtotal = item.effectiveUnitPrice * totalAllocated;
        }
      }
    },

    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<PaymentStatus>) => {
      state.paymentStatus = action.payload;
    },
    setSaleType: (state, action: PayloadAction<SaleType>) => {
      state.saleType = action.payload;
    },
    setPaidAmount: (state, action: PayloadAction<number>) => {
      state.paidAmount = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    updatePatientInfo: (state, action: PayloadAction<Partial<PatientInfo>>) => {
      state.patient = { ...state.patient, ...action.payload };
    },
    clearInvoice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndAddDrug.pending, (state) => {
        state.isAddingDrug = true;
        state.error = null;
      })
      .addCase(fetchAndAddDrug.fulfilled, (state, action) => {
        state.isAddingDrug = false;
        if (action.payload && state.checkoutMode !== "CUSTOMER_REQUEST") {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchAndAddDrug.rejected, (state, action) => {
        state.isAddingDrug = false;
        state.error = action.error.message || "فشل جلب وحدات البيع للصنف";
      });
  },
});

export const {
  changeQuantity,
  increaseQuantity,
  decreaseQuantity,
  removeDrug,
  changeUnit,
  changePricingMode,
  setBatchAllocations,
  setDiscount,
  setPaymentStatus,
  setSaleType,
  setPaidAmount,
  setNotes,
  updatePatientInfo,
  clearInvoice,
  populateFromCheckoutPreview,
} = saleInvoiceSlice.actions;

export default saleInvoiceSlice.reducer;