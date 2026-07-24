import { useParams } from "react-router-dom";
import type { PurchaseInvoiceDetails } from "../../types/purchaseInvoice";
import useGetItem from "../../../../shared/hooks/useGetItem";
import { Grid, Typography, Box, Chip, Button, Stack } from "@mui/material";
import PurchaseInvoiceInfo from "./PurchaseInvoiceInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBatch,
  updateBatch,
  removeBatch,
  printState,
  loadFromDetails,
  selectBatchesRequest,
  resetForm,
} from "../../store/completeBatchItemSlice";
import type { RootState } from "../../store";
import CompleteBatchItemCard from "./CompleteBatchItemCard";
import usePostData from "../../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";

const CompleteBatches = () => {
  const { showSnackbar } = useSnackbar();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { data } = useGetItem<PurchaseInvoiceDetails>(
    `/supplier-invoice/${invoiceId}`,
    invoiceId,
  );
  const { mutate: submitBatch } = usePostData(
    `/supplier-invoice/${invoiceId}/batches`,
  );

  const items = useSelector(
    (state: RootState) => state.completeBatchItem.items,
  );
  const batchesPayload = useSelector(selectBatchesRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) dispatch(loadFromDetails(data?.data));
    dispatch(printState());
  }, [data, dispatch]);

  const handleAddBatch = (itemIndex: number) => {
    const batch = { initialQuantity: 0, expiryDate: "", editable: true };
    dispatch(addBatch({ itemIndex, batch }));
  };

  const handleBatchQuantityChange = (
    itemIndex: number,
    batchIndex: number,
    value: number,
  ) => {
    const item = items[itemIndex];
    if (!item) return;
    const existing = item.batches[batchIndex];
    if (!existing) return;
    const updatedBatch = { ...existing, initialQuantity: value };
    dispatch(updateBatch({ itemIndex, batchIndex, updatedBatch }));
  };

  const handleBatchExpiryChange = (
    itemIndex: number,
    batchIndex: number,
    date: string,
  ) => {
    const item = items[itemIndex];
    if (!item) return;
    const existing = item.batches[batchIndex];
    if (!existing) return;
    const updatedBatch = { ...existing, expiryDate: date };
    dispatch(updateBatch({ itemIndex, batchIndex, updatedBatch }));
  };
  const handleRemoveBatch = (itemIndex: number, batchIndex: number) => {
    dispatch(removeBatch({ itemIndex, batchIndex }));
  };

  const handleSubmit = () => {
    dispatch(printState());
    console.log("Submitting batches:", batchesPayload);
    submitBatch(batchesPayload, {
        onSuccess: (response) => {
          console.log(response);
          showSnackbar("تم ارسال الدفعات بنجاح", "success");
          dispatch(resetForm());
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
    });
  };
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        إكمال دفعات فاتورة الشراء
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {items.map((it, i) => (
                <Chip
                  key={i}
                  label={`${it.drugName}: ${it.quantity}`}
                  color="info"
                  // variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
          {items.map((item, index) => (
            <CompleteBatchItemCard
              key={index}
              item={item}
              index={index}
              onAddBatch={handleAddBatch}
              onBatchQuantityChange={handleBatchQuantityChange}
              onBatchExpiryChange={handleBatchExpiryChange}
              onRemoveBatch={handleRemoveBatch}
            />
          ))}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {data?.data && <PurchaseInvoiceInfo detailData={data.data} />}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            ارسال الدفعات
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CompleteBatches;
