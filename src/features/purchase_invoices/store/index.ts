// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import purchaseInvoiceReducer from './purchaseInvoiceSlice';
import completeBatchItemReducer from './completeBatchItemSlice';

export const store = configureStore({
  reducer: {
    purchaseInvoice: purchaseInvoiceReducer,
    completeBatchItem: completeBatchItemReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;