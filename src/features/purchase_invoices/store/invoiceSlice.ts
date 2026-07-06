// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import APIClient from '../../../shared/api/api-client';

// // Define an initial state
// const initialState = {
//   supplierId: 1, // Defaulting to the example value
//   invoiceNumber: "INV-2026-003", // Defaulting to the example value
//   invoiceDate: "2026-06-09", // Defaulting to the example value
//   discount: 0,
//   notes: "فاتورة بدون دفعات", // Defaulting to the example value
//   items: [
//     {
//       pharmacyDrugId: 3, // Defaulting to the example value
//       quantity: 20,
//       netUnitPrice: 15000,
//     }
//   ],
//   loading: false,
//   error: null,
// };

// // Create an async thunk for submitting the form data (optional)
// export const submitPurchaseInvoice = createAsyncThunk(
//   'purchaseInvoice/submitPurchaseInvoice',
//   async (formData, { rejectWithValue }) => {
//     try {
//         const apiClient = new APIClient<any>("/supplier-invoice/create");
//         const response = await apiClient.post(formData); // Replace with your actual API endpoint
//         return response.data; // Assuming your API returns the created invoice data
//     } catch (error) {
//         return rejectWithValue(error.response.data); // Or handle errors as needed
//     }
//   }
// );

// // Create the slice
// const purchaseInvoiceSlice = createSlice({
//   name: 'purchaseInvoice',
//   initialState,
//   reducers: {
//     // Reducers for updating individual form fields
//     setSupplierId: (state, action) => {
//       state.supplierId = action.payload;
//     },
//     setInvoiceNumber: (state, action) => {
//       state.invoiceNumber = action.payload;
//     },
//     setInvoiceDate: (state, action) => {
//       state.invoiceDate = action.payload;
//     },
//     setDiscount: (state, action) => {
//       state.discount = action.payload;
//     },
//     setNotes: (state, action) => {
//       state.notes = action.payload;
//     },
//     // Reducers for managing items
//     addItem: (state, action) => {
//       state.items.push(action.payload);
//     },
//     updateItem: (state, action) => {
//       const { index, updatedItem } = action.payload;
//       state.items[index] = updatedItem;
//     },
//     removeItem: (state, action) => {
//       state.items.splice(action.payload, 1); // action.payload is the index
//     },
//     // Reducer for resetting the form (e.g., after successful submission)
//     resetForm: () => initialState,
//   },
//   // Extra reducers to handle the async thunk (optional)
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitPurchaseInvoice.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(submitPurchaseInvoice.fulfilled, (state, action) => {
//         state.loading = false;
//         // Optionally update state with response data, redirect, etc.
//         console.log('Purchase invoice submitted successfully:', action.payload); 
//         // Reset the form if desired
//         // state = initialState; // This line won't work within a reducer as it reassigns the state variable, not the object's properties. Use the resetForm reducer instead.
//       })
//       .addCase(submitPurchaseInvoice.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Assuming action.payload contains error details
//         console.error('Error submitting purchase invoice:', action.payload);
//       });
//   },
// });

// // Export actions and the reducer
// export const {
//   setSupplierId,
//   setInvoiceNumber,
//   setInvoiceDate,
//   setDiscount,
//   setNotes,
//   addItem,
//   updateItem,
//   removeItem,
//   resetForm,
// } = purchaseInvoiceSlice.actions;

// export default purchaseInvoiceSlice.reducer;