// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import purchaseInvoiceReducer from '../../features/purchase_invoices/store/purchaseInvoiceSlice';
import completeBatchItemReducer from '../../features/purchase_invoices/store/completeBatchItemSlice';
import createSaleInvoiceReducer from '../../features/sales-and-return/store/createSaleInvoiceSlice';
import generalDrugReducer from '../../features/inventory/store/generalDrugSlice';
import privateDrugReducer from '../../features/inventory/store/privateDrugSlice'; 
export const store = configureStore({
  reducer: {
    purchaseInvoice: purchaseInvoiceReducer,
    completeBatchItem: completeBatchItemReducer, 
    saleInvoice: createSaleInvoiceReducer,  
    generalDrug: generalDrugReducer, 
    privateDrug: privateDrugReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;