// features/inventory/components/MedicineDetailsInfo.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface MedicineDetailsInfoProps {
  type: string;
  quantity: number;
  alertLimit: number;
  isLowStock: boolean;
}

export const MedicineDetailsInfo: React.FC<MedicineDetailsInfoProps> = ({
  type,
  quantity,
  alertLimit,
  isLowStock,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderBottom: "1px dashed #eef2f5",
        pb: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="#7a868f">
          النوع:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#1e2524" }}
        >
          {type}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="#7a868f">
          الكمية المتاحة:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: isLowStock ? "#d32f2f" : "#2e7d32" }}
        >
          {quantity} عبوة
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="#7a868f">
          حد التنبيه/صفر المادة:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EditIcon
            sx={{ fontSize: "14px", color: "#aeb6bb", cursor: "pointer" }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "#1e2524" }}
          >
            {alertLimit}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
