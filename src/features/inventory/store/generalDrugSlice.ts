import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";

export interface BatchItem {
  initialQuantity: number;
  expiryDate: string;
  receivedDate: string;
}

export interface GeneralDrugState {
  activeStep: number;
  generalDrugId: number | null;
  generalDrugName: string;
  
  // Step 1
  netPrice: number;
  consumerPrice: number;
  sellPart: boolean;
  minStockAlert: number;
  expiryDateAlarm: number;
  storageLocation: string;
  notes: string;

  // Step 2
  batches: BatchItem[];
}

const todayStr = new Date().toISOString().split("T")[0];

const initialState: GeneralDrugState = {
  activeStep: 0,
  generalDrugId: null,
  generalDrugName: "",
  netPrice: 0,
  consumerPrice: 0,
  sellPart: true,
  minStockAlert: 10,
  expiryDateAlarm: 30,
  storageLocation: "",
  notes: "",
  batches: [
    {
      initialQuantity: 1,
      expiryDate: todayStr,
      receivedDate: todayStr,
    },
  ],
};

export const generalDrugSlice = createSlice({
  name: "generalDrug",
  initialState,
  reducers: {
    setGeneralDrugInfo: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      state.generalDrugId = action.payload.id;
      state.generalDrugName = action.payload.name;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof GeneralDrugState; value: any }>
    ) => {
      (state as any)[action.payload.field] = action.payload.value;
    },
    addBatch: (state) => {
      state.batches.push({
        initialQuantity: 1,
        expiryDate: todayStr,
        receivedDate: todayStr,
      });
    },
    removeBatch: (state, action: PayloadAction<number>) => {
      if (state.batches.length > 1) {
        state.batches.splice(action.payload, 1);
      }
    },
    updateBatch: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof BatchItem;
        value: any;
      }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.batches[index]) {
(state.batches[index] as any)[field] = value;      }
    },
    resetForm: () => initialState,
  },
});

export const {
  setGeneralDrugInfo,
  setActiveStep,
  updateFormField,
  addBatch,
  removeBatch,
  updateBatch,
  resetForm,
} = generalDrugSlice.actions;

// Selectors



// Selectors
// 1. تحديد النوع مباشرة لحل مشكلة Circular Dependency
export const selectGeneralDrugState = (state: { generalDrug: GeneralDrugState }) => 
  state.generalDrug;

export const selectTotalQuantity = (state: { generalDrug: GeneralDrugState }) =>
  state.generalDrug.batches.reduce(
    (sum, b) => sum + (Number(b.initialQuantity) || 0),
    0
  );

export const selectGeneralDrugPayload = (state: { generalDrug: GeneralDrugState }) => ({
  generalDrugId: state.generalDrug.generalDrugId,
  netPrice: Number(state.generalDrug.netPrice),
  consumerPrice: Number(state.generalDrug.consumerPrice),
  sellPart: state.generalDrug.sellPart,
  minStockAlert: Number(state.generalDrug.minStockAlert),
  expiryDateAlarm: Number(state.generalDrug.expiryDateAlarm),
  storageLocation: state.generalDrug.storageLocation,
  notes: state.generalDrug.notes,
  batches: state.generalDrug.batches.map((b) => ({
    ...b,
    initialQuantity: Number(b.initialQuantity),
  })),
});

export default generalDrugSlice.reducer;