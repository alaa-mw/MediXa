import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { PurchaseInvoiceDetails } from "../types/purchaseInvoice";

type Batch = {
  initialQuantity: number;
  expiryDate: string;
  editable?: boolean;
};
export type Item = {
  pharmacyDrugId: string;
  supplierInvoiceItemId: string;
  drugName: string;
  quantity: number;
  netUnitPrice: number;
  batches: Batch[];
};

type SliceState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

const initialState: SliceState = {
  items: [
    // {
    //   pharmacyDrugId: "3",
    //   supplierInvoiceItemId:"0",
    //   drugName: "دواء تجريبي 1",
    //   quantity: 20,
    //   netUnitPrice: 15000,
    //   batches: [
    //     { initialQuantity: 10, expiryDate: "2026-01-01", editable:false },
    //     { initialQuantity: 10, expiryDate: "2026-01-01", editable:false  },
    //   ],
    // },
  ],

  // Async state
  loading: false,
  error: null,
};

const completeBatchItemSlice = createSlice({
  name: "completeBatchItem",
  initialState,
  reducers: {
    // ============ BATCH MANAGEMENT ============
    addBatch: (
      state,
      action: PayloadAction<{
        itemIndex: number;
        batch: Batch;
      }>,
    ) => {
      const { itemIndex, batch } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        state.items[itemIndex].batches.push(batch);
        // reuse helper
        ensureItemQuantityAtLeastBatches(state, itemIndex);
      }
    },
    updateBatch: (
      state,
      action: PayloadAction<{
        itemIndex: number;
        batchIndex: number;
        updatedBatch: Batch;
      }>,
    ) => {
      const { itemIndex, batchIndex, updatedBatch } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        const item = state.items[itemIndex];
        if (batchIndex >= 0 && batchIndex < item.batches.length) {
          item.batches[batchIndex] = updatedBatch;
          // reuse helper
          ensureItemQuantityAtLeastBatches(state, itemIndex);
        }
      }
    },
    removeBatch: (
      state,
      action: PayloadAction<{ itemIndex: number; batchIndex: number }>,
    ) => {
      const { itemIndex, batchIndex } = action.payload;
      if (itemIndex >= 0 && itemIndex < state.items.length) {
        state.items[itemIndex].batches.splice(batchIndex, 1);
        // reuse helper
        ensureItemQuantityAtLeastBatches(state, itemIndex);
      }
    },

    // ============ ASYNC STATE ============
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // ============ BULK OPERATIONS ============
    // Full reset
    resetForm: () => initialState,
    printState: (state) => {
      console.log("Current Purchase Invoice State:", current(state));
    },
    // ============ LOAD FROM SERVER RESPONSE ============
    loadFromDetails: (state, action: PayloadAction<PurchaseInvoiceDetails>) => {
      const details = action.payload;
      // Items mapping: adapt server shape to request shape
      state.items = (details.items || []).map((it) => {
        return {
          supplierInvoiceItemId: String(it.supplierInvoiceItemId),
          pharmacyDrugId: String(it.pharmacyDrugId),
          drugName: it.tradeName,
          quantity: it.quantity,
          netUnitPrice: Number(it.netUnitPrice),
          batches: (it.batches || []).map((b) => ({
            initialQuantity: b.initialQuantity,
            expiryDate: b.expiryDate,
            editable: false,
          })),
        };
      });
    },
  },
});

// Selector: collect only editable batches and return them in the required shape
// Accept either the slice state or the root state (which contains `completeBatchItem`).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectBatchesRequest = (state: any) => {
  const slice: SliceState | undefined =
    state?.completeBatchItem ?? state ?? undefined;
  const items = slice?.items ?? [];

  const batches = items.flatMap((item: Item) =>
    (item.batches ?? [])
      .filter((b) => b?.editable === true)
      .map((b) => ({
        supplierInvoiceItemId: Number(item.supplierInvoiceItemId),
        initialQuantity: b.initialQuantity,
        expiryDate: b.expiryDate,
      })),
  );

  return { batches };
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
  addBatch,
  updateBatch,
  removeBatch,
  setLoading,
  setError,
  resetForm,
  printState,
  loadFromDetails,
} = completeBatchItemSlice.actions;

export default completeBatchItemSlice.reducer;
