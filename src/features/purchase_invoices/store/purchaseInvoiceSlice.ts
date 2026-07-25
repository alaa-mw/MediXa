import {
  createSlice,
  current,
  type Draft,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  SliceState,
  PurchaseInvoiceRequest,
  PurchaseInvoiceItemRequest,
} from "../types/purchaseInvoiceStore";
import type { PurchaseInvoiceDetails } from "../types/purchaseInvoice";
import type { PaymentStatus, SupplierInvoiceStatus } from "../types/enums";

const initialState: SliceState = {
  // Request fields (go to API)
  status: "PENDING",
  supplierId: -1,
  invoiceNumber: "INV-",
  invoiceDate: "2026-01-01",
  discount: 0,
  notes: "",
  items: [
    // {
    //   pharmacyDrugId: "3",
    //   drugName: "دواء تجريبي 1",
    //   quantity: 20,
    //   netUnitPrice: 15000,
    //   batches: [
    //     { initialQuantity: 10, expiryDate: "2026-01-01" },
    //     { initialQuantity: 10, expiryDate: "2026-01-01" },
    //   ],
    // },
  ],

  // UI only fields
  supplier: {
    supplierId: -1,
    pharmacyId: -1,
    supplierName: "",
  },
  paymentStatus: "PENDING",

  // Async state
  loading: false,
  error: null,
};

const purchaseInvoiceSlice = createSlice({
  name: "purchaseInvoice",
  initialState,
  reducers: {
    // ============ REQUEST FIELD REDUCERS ===========
    updateField: <K extends keyof SliceState>(
      state: Draft<SliceState>,
      action: PayloadAction<{ field: K; value: SliceState[K] }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setStatus: (state, action: PayloadAction<SupplierInvoiceStatus>) => {
      state.status = action.payload;
    },

    // ============ ITEMS MANAGEMENT ============
    addItem: (state, action: PayloadAction<PurchaseInvoiceItemRequest>) => {
      state.items.push(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{
        index: number;
        updatedItem: PurchaseInvoiceItemRequest;
      }>,
    ) => {
      const { index, updatedItem } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index] = updatedItem;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearItems: (state) => {
      state.items = [];
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>,
    ) => {
      const { index, quantity } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index].quantity = quantity;
      }
      // ensureItemQuantityAtLeastBatches(state, index);
    },
    updateItemNetUnitPrice: (
      state,
      action: PayloadAction<{ index: number; netUnitPrice: number }>,
    ) => {
      const { index, netUnitPrice } = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items[index].netUnitPrice = netUnitPrice;
      }
    },

    // ============ BATCH MANAGEMENT ============
    addBatch: (
      state,
      action: PayloadAction<{
        itemIndex: number;
        batch: PurchaseInvoiceItemRequest["batches"][0];
      }>,
    ) => {
      const { itemIndex, batch } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        state.items[itemIndex].batches.push(batch);
      }
      ensureItemQuantityAtLeastBatches(state, itemIndex);
    },
    updateBatch: (
      state,
      action: PayloadAction<{
        itemIndex: number;
        batchIndex: number;
        updatedBatch: PurchaseInvoiceItemRequest["batches"][0];
      }>,
    ) => {
      const { itemIndex, batchIndex, updatedBatch } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        const item = state.items[itemIndex];
        if (batchIndex >= 0 && batchIndex < item.batches.length) {
          item.batches[batchIndex] = updatedBatch;
        }
      }
      ensureItemQuantityAtLeastBatches(state, itemIndex);
    },
    removeBatch: (
      state,
      action: PayloadAction<{ itemIndex: number; batchIndex: number }>,
    ) => {
      const { itemIndex, batchIndex } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        state.items[itemIndex].batches.splice(batchIndex, 1);
      }
      ensureItemQuantityAtLeastBatches(state, itemIndex);
    },

    // ============ UI ONLY FIELDS ============
    setSupplier: (state, action: PayloadAction<SliceState["supplier"]>) => {
      state.supplier = action.payload;
    },
    setPaymentStatus: (state, action: PayloadAction<PaymentStatus>) => {
      state.paymentStatus = action.payload;
    },

    // ============ ASYNC STATE ============
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // ============ BULK OPERATIONS ============
    // Update multiple request fields at once
    updateInvoiceRequest: (
      state,
      action: PayloadAction<Partial<PurchaseInvoiceRequest>>,
    ) => {
      Object.assign(state, action.payload);
    },

    // Full reset
    resetForm: () => initialState,
    printState: (state) => {
      console.log("Current Purchase Invoice State:", current(state));
    },
    // ============ LOAD FROM SERVER RESPONSE ============
    loadFromDetails: (state, action: PayloadAction<PurchaseInvoiceDetails>) => {
      const details = action.payload;

      // Map top-level request fields
      state.status = (details.status as SliceState["status"]) || state.status;
      state.supplierId = details.supplierId;
      state.invoiceNumber = details.invoiceNumber || state.invoiceNumber;
      state.invoiceDate = details.invoiceDate || state.invoiceDate;
      state.discount = Number(details.discount) || 0;
      state.notes = details.notes || "";

      // Items mapping: adapt server shape to request shape
      state.items = (details.items || []).map((it) => {
        return {
          pharmacyDrugId: String(it.pharmacyDrugId),
          drugName: it.tradeName,
          quantity: it.quantity,
          netUnitPrice: Number(it.netUnitPrice),
          batches: (it.batches || []).map((b) => ({
            initialQuantity: b.initialQuantity,
            expiryDate: b.expiryDate,
          })),
        } as PurchaseInvoiceItemRequest;
      });

      // UI-only fields
      state.supplier = {
        supplierId: Number(details.supplier?.supplierId ?? -1),
        pharmacyId: Number(details.supplier?.pharmacyId ?? -1),
        supplierName: details.supplier?.supplierName ?? "",
      };

      state.paymentStatus =
        (details.paymentStatus as SliceState["paymentStatus"]) ||
        state.paymentStatus;
    },
  },
});

// Helper selectors
export const selectRequestPayload = (state: {
  purchaseInvoice: SliceState;
}) => {
  // 1. استخراج البيانات من الـ State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { supplier, status, paymentStatus, loading, error, ...request } =
    state.purchaseInvoice;

  // Remove `drugName` from each item before sending request
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = (request.items || []).map(({ drugName, ...rest }) => rest);

  return {
    ...request,
    items,
  } as PurchaseInvoiceRequest;
};

export const getTotalItemsPrice = (state: { purchaseInvoice: SliceState }) => {
  return state.purchaseInvoice.items.reduce((total, item) => {
    // دالة reduce تستخدم لتحويل المصفوفة إلى قيمة واحدة.
    return total + item.quantity * item.netUnitPrice; // later
  }, 0);
};

// Helper: ensure an item's quantity is at least the sum of its batches
function ensureItemQuantityAtLeastBatches(
  state: SliceState,
  itemIndex: number,
) {
  const item = state.items[itemIndex];
  if (!item) return;
  const total = (item.batches || []).reduce(
    (s, b) => s + (b?.initialQuantity ?? 0),
    0,
  );
  if (item.quantity < total) item.quantity = total;
}

// Export actions
export const {
  updateField,
  addItem,
  updateItem,
  removeItem,
  clearItems,
  updateItemQuantity,
  updateItemNetUnitPrice,
  addBatch,
  updateBatch,
  removeBatch,
  setSupplier,
  setPaymentStatus,
  setLoading,
  setError,
  updateInvoiceRequest,
  resetForm,
  printState,
  loadFromDetails,
} = purchaseInvoiceSlice.actions;

export default purchaseInvoiceSlice.reducer;

