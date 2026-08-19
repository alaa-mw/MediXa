
import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { CustomerOrder } from "../types/customerOrder";
import { getAtLabel } from "../utils/getOrderStatusLabel";
import useGetData from "../../../shared/hooks/useGetData";
import type { CheckoutPreviewData } from "../../sales-and-return/types/customerRequest";
import { mapCheckoutPreviewToSlice } from "../../sales-and-return/utils/customerRequestMapper";
import { populateFromCheckoutPreview } from "../../sales-and-return/store/createSaleInvoiceSlice";



const OrderStatusProgress = ({ data }: { data: CustomerOrder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const endpoint = selectedRequestId
    ? `/customer-request/${selectedRequestId}/checkout-preview`
    : "";

  const { data: previewResponse, isLoading } = useGetData<CheckoutPreviewData>(endpoint);

  const handleConfirm = () => {
    setSelectedRequestId(data.customerRequestId);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawPreviewData = (previewResponse as any)?.data || previewResponse;

    if (rawPreviewData && selectedRequestId) {
      const mappedData = mapCheckoutPreviewToSlice(rawPreviewData);
      dispatch(populateFromCheckoutPreview(mappedData));
      setSelectedRequestId(null);
      navigate("/pharmacy/sales/sales/create");
    }
  }, [previewResponse, selectedRequestId, dispatch, navigate]);

  const requestedAt = data.requestedAt ? new Date(data.requestedAt) : null;
  const completedAt = data.completedAt ? new Date(data.completedAt) : null;
  const cancelledAt = data.cancelledAt ? new Date(data.cancelledAt) : null;

  const formatDate = (d: Date | null) => (d ? format(d, "PP") : "-");
  const secondInitial = !completedAt && !cancelledAt;

  return (
    <Box sx={{ width: "100%", px: 1 }}>
      <Box
        sx={(theme) => ({
          transform: "rotate(180deg)",
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: completedAt
            ? theme.palette.success.main
            : cancelledAt
            ? theme.palette.error.main
            : secondInitial
            ? `linear-gradient(90deg, ${theme.palette.warning.main} 50%, ${theme.palette.grey[300]} 50%)`
            : theme.palette.grey[300],
        })}
      />
      <Stack
        sx={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between", gap: 2, px: 0.5 }}
      >
        {/* Left circle (PENDING/requested) */}
        <Box sx={{ textAlign: "center", width: 120 }}>
          <Typography variant="caption" sx={{ display: "block", mt: 0.4 }}>
            {getAtLabel.requestedAt}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 700 }}
          >
            {formatDate(requestedAt)}
          </Typography>
        </Box>

        {/* Right circle (CONFIRMED/COMPLETED or CANCELLED) */}
        <Box sx={{ textAlign: "center", width: 120 }}>
          {completedAt || cancelledAt ? (
            <>
              <Typography variant="caption" sx={{ display: "block", mt: 0.4 }}>
                {completedAt ? getAtLabel.completedAt : getAtLabel.cancelledAt}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                {completedAt
                  ? formatDate(completedAt)
                  : formatDate(cancelledAt)}
              </Typography>
            </>
          ) : (
            <Box sx={{ mt: 0.5, display: "flex", justifyContent: "center" }}>
              <Button
                variant="text"
                size="small"
                color="primary"
                disabled={isLoading}
                sx={{ fontWeight: 700, textTransform: "none" }}
                onClick={handleConfirm}
              >
                {isLoading ? <CircularProgress size={16} /> : "تأكيد الطلب"}
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default OrderStatusProgress;