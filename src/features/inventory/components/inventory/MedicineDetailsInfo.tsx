
import React from "react";
import { Box, Typography } from "@mui/material";

interface MedicineDetailsInfoProps {
  type: string;
  quantityText: string;
  isLowStock: boolean;
  location: string;
}

export const MedicineDetailsInfo: React.FC<MedicineDetailsInfoProps> = ({
  type,
  quantityText,
  isLowStock,
  location,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px dashed #e2e8f0", pb: 2 }}>
      {/* النوع */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ color: "#7a868f", fontSize: "0.825rem" }}>النوع:</Typography>
        <Typography variant="body2" sx={{ fontWeight: "600", color: "#334155" }}>{type}</Typography>
      </Box>

      {/* الكمية المتاحة */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ color: "#7a868f", fontSize: "0.825rem" }}>الكمية المتاحة:</Typography>
        <Typography variant="body2" sx={{ fontWeight: "700", color: isLowStock ? "#ef4444" : "#16a34a" }}>
          {quantityText}
        </Typography>
      </Box>

      {/* الموقع بديل حد التنبيه */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ color: "#7a868f", fontSize: "0.825rem" }}>الموقع المخصص:</Typography>
        <Typography variant="body2" sx={{ fontWeight: "600", color: "#334155" }}>{location}</Typography>
      </Box>
    </Box>
  );
};