import React from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import type { InvoiceItem } from "../../types/saleInvoiceCreate";

const smallInputSx = {
  borderRadius: 1.5,
  fontSize: 13,
  height: 32,
  bgcolor: "white",
};

interface PricingEditorProps {
  item: InvoiceItem;
  changePricingMode: (id: number, mode: any, value?: number) => void;
}

export const PricingEditor: React.FC<PricingEditorProps> = ({
  item,
  changePricingMode,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Select
        size="small"
        value={item.pricingMode}
        onChange={(e) => changePricingMode(item.pharmacyDrugId, e.target.value)}
        sx={smallInputSx}
      >
        <MenuItem value="SUGGESTED" sx={{ fontSize: 13 }}>
          سعر مقترح
        </MenuItem>
        <MenuItem value="EXTRA_PERCENTAGE" sx={{ fontSize: 13 }}>
          زيادة %
        </MenuItem>
        <MenuItem value="MANUAL" sx={{ fontSize: 13 }}>
          سعر يدوي
        </MenuItem>
      </Select>

      {item.pricingMode === "EXTRA_PERCENTAGE" && (
        <TextField
          size="small"
          type="number"
          placeholder="نسبة الزيادة"
          value={item.extraPercentage || ""}
          onChange={(e) =>
            changePricingMode(
              item.pharmacyDrugId,
              "EXTRA_PERCENTAGE",
              Number(e.target.value),
            )
          }
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              style: smallInputSx,
            },
          }}
          sx={{ width: "100%" }}
        />
      )}

      {item.pricingMode === "MANUAL" && (
        <TextField
          size="small"
          type="number"
          placeholder="أدخل السعر"
          value={item.manualUnitPrice || ""}
          onChange={(e) =>
            changePricingMode(
              item.pharmacyDrugId,
              "MANUAL",
              Number(e.target.value),
            )
          }
          slotProps={{
            input: { style: smallInputSx },
          }}
          sx={{ width: "100%" }}
        />
      )}

      {item.pricingMode !== "MANUAL" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            mt: 0.5,
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>
            السعر:
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
            {item.effectiveUnitPrice.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
