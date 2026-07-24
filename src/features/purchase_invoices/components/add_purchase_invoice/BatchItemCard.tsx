import React, { useEffect, useState, useRef } from "react";
import { DeleteOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import {
  Box,
  Button,
  IconButton,
  Paper,
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
          <CustomCounterField
            // label="الكمية الاجمالية"
            value={item.quantity}
            onChange={(value) => {
              onQuantityChange(index, value);
            }}
            height="38px"
          />
          <CustomTextField
            label="سعر الوحدة"
            value={item.netUnitPrice}
            onChange={(value) => onNetUnitPriceChange(index, parseFloat(value))}
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
          gridTemplateColumns: "2.5fr 2.5fr  1fr ",
          bgcolor: alpha(theme.palette.primary.main, 0.2),
          p: 1.5,
          borderRadius: 2,
          textAlign: "center",
          fontWeight: 700,
          fontSize: 13,
          mb: 1,
        }}
      >
        <Box>الكمية (علبة)</Box>
        <Box>تاريخ الانتهاء</Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ ml: 1, mr: 0 }} />}
            onClick={() => onAddBatch(index)}
            sx={{
              borderRadius: 5,
              fontSize: "0.7rem",
            }}
          >
            إضافة دفعة
          </Button>
        </Box>
      </Box>

      {item.batches.map((row, idx) => (
        <Box
          key={idx}
          sx={{
            display: "grid",
            gridTemplateColumns: "2.5fr 2.5fr  1fr",
            alignItems: "center",
            mb: 1,
            textAlign: "center",
          }}
        >
          <Box sx={{ px: 1 }}>
            <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
              <CustomCounterField
                value={row.initialQuantity}
                onChange={(value) => onBatchQuantityChange(index, idx, value)}
                height="32px"
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
              }}
            >
              <RTLDatePicker
                value={row.expiryDate}
                onChange={(date) => onBatchExpiryChange(index, idx, date)}
                padding="0px 8px"
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
