import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { format } from "date-fns";
import type { CustomerOrder } from "../types/customerOrder";
import getOrderStatusLabel from "../utils/getOrderStatusLabel";

const OrderStatusProgress = ({
  data,
  onConfirm,
}: {
  data: CustomerOrder;
  onConfirm?: () => void;
}) => {
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
        sx={{ flexDirection: "row", alignItems: "center", gap: 2, px: 0.5 }}
      >
        {/* Left circle (PENDING/requested) */}
        <Box sx={{ textAlign: "center", width: 120 }}>
          <Typography
            variant="caption"
            sx={{ display: "block", fontWeight: 700, mt: 0.5 }}
          >
            {getOrderStatusLabel("PENDING")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(requestedAt)}
          </Typography>
        </Box>

        {/* Right circle (CONFIRMED/COMPLETED or CANCELLED) */}
        <Box sx={{ textAlign: "center", width: 120 }}>
          {completedAt || cancelledAt ? (
            <>
              <Typography
                variant="caption"
                sx={{ display: "block", fontWeight: 700, mt: 0.5 }}
              >
                {completedAt
                  ? getOrderStatusLabel("COMPLETED")
                  : getOrderStatusLabel("CANCELLED")}
              </Typography>
              <Typography variant="caption" color="text.secondary">
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
                sx={{ fontWeight: 700, textTransform: "none" }}
                onClick={() => onConfirm?.()}
              >
                انهاء الطلب
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default OrderStatusProgress;
