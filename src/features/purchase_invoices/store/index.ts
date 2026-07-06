// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import purchaseInvoiceReducer from './purchaseInvoiceSlice';

export const store = configureStore({
  reducer: {
    purchaseInvoice: purchaseInvoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;