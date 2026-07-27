import React from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import type { CustomerOrder } from "../types/customerOrder";

const statusColor: Record<string, "default" | "warning" | "success" | "error"> =
  {
    PENDING: "warning",
    CONFIRMED: "success",
    RECEIVED: "success",
    CANCELLED: "error",
  };

const CustomerOrderCard = ({
  data,
  onView,
}: {
  data: CustomerOrder;
  onView?: (id: string) => void;
}) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800 }}>{data.customerName}</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            {data.customerPhone}
          </Typography>
        </Box>
        <Chip
          label={data.status}
          color={statusColor[data.status] ?? "default"}
          size="small"
        />
      </Box>

      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
        {data.notes}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          عناصر الادوية: {data.itemsCount}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onView?.(String(data.customerRequestId))}
          >
            عرض
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerOrderCard;