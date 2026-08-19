import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IngredientItem {
  ingredientId: number;
  ingredientName?: string;
  strengthValue: number;
  unit: string;
}

export interface BatchItem {
  initialQuantity: number;
  expiryDate: string;
  receivedDate: string;
}

export interface PrivateDrugState {
  activeStep: number;
  // Step 1: Basic Info
  tradeName: string;
  barcode: string;
  dosageFormId: number | null;
  unitsPerBox: number;
  isRx: boolean;
  categoryIds: number[];
  ingredients: IngredientItem[];

  // Step 2: Pricing & Storage
  netPrice: number;
  consumerPrice: number;
  sellPart: boolean;
  storageLocation: string;
  minStockAlert: number;
  expiryDateAlarm: number;
  notes: string;

  // Step 3: Batches
  batches: BatchItem[];
}

const initialBatch: BatchItem = {
  initialQuantity: 100,
  expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  receivedDate: new Date().toISOString().split("T")[0],
};

const initialState: PrivateDrugState = {
  activeStep: 0,
  tradeName: "",
  barcode: "",
  dosageFormId: null,
  unitsPerBox: 1,
  isRx: false,
  categoryIds: [],
  ingredients: [],

  netPrice: 0,
  consumerPrice: 0,
  sellPart: false,
  storageLocation: "",
  minStockAlert: 10,
  expiryDateAlarm: 60,
  notes: "",

  batches: [initialBatch],
};

export const privateDrugSlice = createSlice({
  name: "privateDrug",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    updatePrivateFormField: <K extends keyof PrivateDrugState>(
      state: PrivateDrugState,
      action: PayloadAction<{ field: K; value: PrivateDrugState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    // Ingredients Handlers
    addIngredient: (state, action: PayloadAction<IngredientItem>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    // Batches Handlers (تم تسميتها باسم Private لعدم التضارب)
    addPrivateBatch: (state) => {
      state.batches.push({
        initialQuantity: 10,
        expiryDate: new Date().toISOString().split("T")[0],
        receivedDate: new Date().toISOString().split("T")[0],
      });
    },
    removePrivateBatch: (state, action: PayloadAction<number>) => {
      if (state.batches.length > 1) {
        state.batches.splice(action.payload, 1);
      }
    },
    updatePrivateBatch: (
      state,
      action: PayloadAction<{ index: number; field: keyof BatchItem; value: any }>
    ) => {
      const { index, field, value } = action.payload;
      state.batches[index] = {
        ...state.batches[index],
        [field]: value,
      };
    },
    resetPrivateForm: () => initialState,
  },
});

export const {
  setActiveStep,
  updatePrivateFormField,
  addIngredient,
  removeIngredient,
  addPrivateBatch,
  removePrivateBatch,
  updatePrivateBatch,
  resetPrivateForm,
} = privateDrugSlice.actions;

// Selectors
export const selectPrivateDrugState = (state: { privateDrug: PrivateDrugState }) => 
  state.privateDrug;

export const selectPrivateTotalQuantity = (state: { privateDrug: PrivateDrugState }) =>
  state.privateDrug.batches.reduce(
    (total, batch) => total + (Number(batch.initialQuantity) || 0),
    0
  );

export const selectPrivateDrugPayload = (state: { privateDrug: PrivateDrugState }) => {
  const { activeStep, ingredients, ...rest } = state.privateDrug;
  return {
    ...rest,
    ingredients: ingredients.map((item: IngredientItem) => ({
      ingredientId: item.ingredientId,
      strengthValue: item.strengthValue,
      unit: item.unit,
    })),
  };
};

export default privateDrugSlice.reducer;