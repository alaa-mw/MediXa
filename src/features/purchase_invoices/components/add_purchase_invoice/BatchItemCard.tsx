import React from "react";
import { DeleteOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import {
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";
import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
import theme from "../../../../shared/styles/mainTheme";
import type { PurchaseInvoiceItemRequest } from "../../types/purchaseInvoiceStore";

type Props = {
  item: PurchaseInvoiceItemRequest;
  index: number;
  onQuantityChange: (itemIndex: number, value: number) => void;
  onNetUnitPriceChange: (itemIndex: number, value: number) => void;
  onRemoveItem: (itemIndex: number) => void;
  onAddBatch: (itemIndex: number) => void;
  onBatchNumberChange: (
    itemIndex: number,
    batchIndex: number,
    value: string,
  ) => void;
  onBatchQuantityChange: (
    itemIndex: number,
    batchIndex: number,
    value: number,
  ) => void;
  onBatchExpiryChange: (
    itemIndex: number,
    batchIndex: number,
    date: string,
  ) => void;
  onRemoveBatch: (itemIndex: number, batchIndex: number) => void;
};

export default function BatchItemCard({
  item,
  index,
  onQuantityChange,
  onNetUnitPriceChange,
  onRemoveItem,
  onAddBatch,
  onBatchNumberChange,
  onBatchQuantityChange,
  onBatchExpiryChange,
  onRemoveBatch,
}: Props) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        my: 1,
        borderRight: `6px solid ${theme.palette.primary.main}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ bgcolor: "#F0F4F8", p: 1, borderRadius: 2 }}>
            <LocalPharmacyIcon sx={{ color: "#316A75" }} />
          </Box>
          <Typography sx={{ fontWeight: 700, color: "#2D3A4D", fontSize: 16 }}>
            {`${item.drugName}`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", width: "50%", gap: 1 }}>
          <CustomTextField
            type="number"
            label="اجمالي الكمية"
            value={item.quantity}
            onChange={(value) => {
              onQuantityChange(index, parseFloat(value));
            }}
            minNum={0}
            padding="8px"
          />
          <CustomTextField
            type="number"
            label="سعر الوحدة"
            value={item.netUnitPrice || 0}
            onChange={(value) => onNetUnitPriceChange(index, parseFloat(value))}
            minNum={0}
            padding="8px"
          />

          <IconButton color="error" onClick={() => onRemoveItem(index)}>
            <DeleteOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "0.7fr 1.5fr 2.5fr 2.5fr  1fr",
          bgcolor: alpha(theme.palette.primary.main, 0.2),
          p: 1.5,
          borderRadius: 2,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 13,
          mb: 1,
        }}
      >
        <Box></Box>
        <Box>رقم التشغيلة</Box>
        <Box>الكمية (علبة)</Box>
        <Box>تاريخ الانتهاء</Box>
        <Box>
          <Tooltip title="إضافة دفعة" arrow>
            <IconButton
              color="primary"
              onClick={() => onAddBatch(index)}
              aria-label="إضافة دفعة"
              sx={{
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 1),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.6),
                },
              }}
            >
              <AddIcon sx={{ fontSize: 20, color:"white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {item.batches.map((row, idx) => (
        <Box
          key={idx}
          sx={{
            display: "grid",
            gridTemplateColumns: "0.7fr 1.5fr 2.5fr 2.5fr  1fr",
            alignItems: "center",
            mb: 1,
            textAlign: "center",
          }}
        >
          <Box sx={{ px: 1 }}>
            <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
              <Typography sx={{ fontWeight: 700, color: "#2D3A4D" }}>
                # {idx + 1}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ px: 1 }}>
            <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
              <CustomTextField
                type="text"
                label=""
                value={row.batchNumber || ""}
                onChange={(value) => onBatchNumberChange(index, idx, value)}
                padding="0px"
              />
            </Box>
          </Box>
          <Box sx={{ px: 1 }}>
            <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
              <CustomCounterField
                value={row.initialQuantity}
                onChange={(value) => onBatchQuantityChange(index, idx, value)}
                height="24px"
                min={1}
              />
            </Box>
          </Box>
          <Box sx={{ px: 1 }}>
            <Box
              sx={{
                bgcolor: "#F1F5F9",
                py: 1,
                borderRadius: 2,
                fontWeight: 700,
                padding: "4px",
              }}
            >
              <RTLDatePicker
                value={row.expiryDate}
                onChange={(date) => onBatchExpiryChange(index, idx, date)}
                padding="0px 12px"
              />
            </Box>
          </Box>
          <IconButton color="error" onClick={() => onRemoveBatch(index, idx)}>
            <DeleteOutlined />
          </IconButton>
        </Box>
      ))}
    </Paper>
  );
}
