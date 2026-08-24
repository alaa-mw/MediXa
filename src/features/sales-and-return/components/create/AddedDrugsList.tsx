
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  Button,
  Grid,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeleteOutlined } from "@mui/icons-material";

import { BatchSelectionModal } from "./BatchSelectionModal";
import { useSaleInvoice } from "../../hooks/useSaleInvoice";
import type { InvoiceItem } from "../../types/saleInvoiceCreate";
import { EmptyInvoiceState } from "./EmptyInvoiceState";
import { PricingEditor } from "./PricingEditor";

// الثوابت التي لا تتغير
const TABLE_COLUMNS = "2.2fr 1fr 1.6fr 1.4fr 1.3fr 1.2fr 0.5fr";

export const AddedDrugsList: React.FC = () => {
  const {
    selectors: { items, isCustomerRequest }, 
    actions: {
      increaseQuantity,
      decreaseQuantity,
      changeUnit,
      changePricingMode,
      removeDrug,
      setBatchAllocations,
    },
  } = useSaleInvoice();

  const [selectedItemForBatch, setSelectedItemForBatch] =
    useState<InvoiceItem | null>(null);

  if (items.length === 0) {
    return <EmptyInvoiceState />;
  }

  // اسم الدواء والمتاح منه
  const renderDrugInfo = (item: InvoiceItem) => (
    <Box sx={{ minWidth: 0 }}>
  <Typography noWrap sx={{ fontWeight: 700, fontSize: 15 }}>
    {item.tradeName}
  </Typography>

  {item.requiresPrescription && (
    <Chip
      label="RX • وصفة طبية"
      size="small"
      sx={{
        mt: 0.5,
        height: 22,
        borderRadius: 1.5,
        fontSize: 11,
        fontWeight: 700,
        bgcolor: "#FFF7ED",
        color: "#C2410C",
        border: "1px solid #FED7AA",
        "& .MuiChip-label": {
          px: 1,
        },
      }}
    />
  )}

  <Typography
    variant="caption"
    sx={{
      color: "#64748B",
      fontSize: 13,
      display: "block",
      mt: 0.3,
    }}
  >
    المتاح: {item.selectedUnit.availableDisplayQuantity}
  </Typography>
</Box>
  );

  const renderUnitSelector = (item: InvoiceItem) => {
    if (isCustomerRequest) {
      return (
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#334155" }}>
            {item.selectedUnit.label }
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ textAlign: "center" }}>
        <FormControl size="small" fullWidth>
          <Select
            value={item.selectedUnit.unitType}
            onChange={(e) => changeUnit(item.pharmacyDrugId, e.target.value)}
            sx={{ borderRadius: 2, fontSize: 14, height: 38, bgcolor: "white" }}
          >
            {item.availableSaleUnits.map((unit) => {
              const isOutOfStock = unit.availableDisplayQuantity === 0;
              return (
                <MenuItem
                  key={unit.unitType}
                  value={unit.unitType}
                  disabled={isOutOfStock}
                  sx={{
                    fontSize: 14,
                    opacity: isOutOfStock ? 0.5 : 1,
                  }}
                >
                  {unit.label} {isOutOfStock && "(غير متاح)"}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderQuantityControl = (item: InvoiceItem) => {
    const hasBatches = Boolean(
      item.batchAllocations && item.batchAllocations.length > 0
    );

    if (hasBatches) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            {item.displayQuantity}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#64748B", fontSize: 11 }}
          >
            من دفعات محددة
          </Typography>
        </Box>
      );
    }

    const maxAvailable = item.selectedUnit.availableDisplayQuantity;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <IconButton
          size="small"
          onClick={() => decreaseQuantity(item.pharmacyDrugId)}
          disabled={item.displayQuantity <= 1}
          sx={{ bgcolor: "#EBF5F8", borderRadius: 1.5 }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontWeight: 700,
            minWidth: 28,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          {item.displayQuantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => increaseQuantity(item.pharmacyDrugId)}
          disabled={item.displayQuantity >= maxAvailable}
          sx={{ bgcolor: "#EBF5F8", borderRadius: 1.5 }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  // تحديد السعر (عرض نص فقط في طلب الزبون بدلاً من PricingEditor)
  const renderPricingEditor = (item: InvoiceItem) => {
    if (isCustomerRequest) {
      return (
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#1E293B",
          }}
        >
          {item.effectiveUnitPrice.toLocaleString()}
        </Typography>
      );
    }

    return <PricingEditor item={item} changePricingMode={changePricingMode} />;
  };

  // الإجمالي للدواء الواحد
  const renderSubtotal = (item: InvoiceItem) => (
    <Typography
      sx={{
        textAlign: "center",
        fontWeight: 800,
        color: "#316A75",
        fontSize: 15,
      }}
    >
      {item.subtotal.toLocaleString()}
    </Typography>
  );

  // زر تحديد الدفعات (معطل في طلب الزبون)
const renderBatchButton = (item: InvoiceItem) => {
  const hasBatches = Boolean(item.batchAllocations?.length);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Button
        size="small"
        disabled={isCustomerRequest}
        variant={hasBatches ? "contained" : "outlined"}
        color="secondary"
        onClick={() => setSelectedItemForBatch(item)}
        sx={{
          fontSize: 12,
          py: 0.5,
          px: 1.5,
          borderRadius: 1.5,
          fontWeight: 600,
          bgcolor: hasBatches ? "secondary.light" : undefined,
          "&:hover": {
            bgcolor: hasBatches ? "secondary.main" : undefined,
          },
        }}
      >
        {item.batchAllocations?.length
          ? `محدد (${item.batchAllocations.length})`
          : "تخصيص"}
      </Button>
    </Box>
  );
};

  // زر الإزالة (معطل في طلب الزبون)
  const renderDeleteButton = (item: InvoiceItem) => (
    <Box sx={{ textAlign: "center" }}>
      <Tooltip title={ "إزالة من الفاتورة"}>
        <span>
          <IconButton
            size="small"
            color="error"
            // disabled={isCustomerRequest}
            onClick={() => removeDrug(item.pharmacyDrugId)}
            sx={{ bgcolor: "#FEF2F2" }}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );

  // --- Main Render ---

  return (
    <Grid size={{ xs: 12, lg: 8 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #EAF2F6",
          bgcolor: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Inventory2OutlinedIcon sx={{ color: "#316A75", fontSize: 24 }} />
            <Typography
              sx={{ fontWeight: 800, fontSize: 18, color: "#1E293B" }}
            >
              الأدوية المضافة
            </Typography>
          </Box>
          <Chip
            label={`${items.length} أصناف`}
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
            }}
          />
        </Box>

        {/* Table Header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: TABLE_COLUMNS,
            gap: 2,
            bgcolor: "#EBF5F8",
            p: 1.5,
            borderRadius: 2,
            mb: 2,
            fontWeight: 700,
            fontSize: 14,
            color: "#2D3A4D",
            alignItems: "center",
          }}
        >
          <Box>الصنف</Box>
          <Box sx={{ textAlign: "center" }}>الوحدة</Box>
          <Box sx={{ textAlign: "center" }}>الكمية</Box>
          <Box sx={{ textAlign: "center" }}>سعر الوحدة</Box>
          <Box sx={{ textAlign: "center" }}>الإجمالي</Box>
          <Box sx={{ textAlign: "center" }}>الدفعات</Box>
          <Box></Box>
        </Box>

        {/* Table Rows */}
        {items.map((item) => (
          <Box
            key={item.pharmacyDrugId}
            sx={{
              display: "grid",
              gridTemplateColumns: TABLE_COLUMNS,
              gap: 2,
              alignItems: "center",
              bgcolor: "#FAFCFD",
              p: 1.5,
              borderRadius: 2,
              mb: 1.5,
              border: "1px solid #F1F5F9",
            }}
          >
            {renderDrugInfo(item)}
            {renderUnitSelector(item)}
            {renderQuantityControl(item)}
            {renderPricingEditor(item)}
            {renderSubtotal(item)}
            {renderBatchButton(item)}
            {renderDeleteButton(item)}
          </Box>
        ))}

        {/* Modals */}
        {selectedItemForBatch && !isCustomerRequest && (
          <BatchSelectionModal
            open={Boolean(selectedItemForBatch)}
            item={selectedItemForBatch}
            onClose={() => setSelectedItemForBatch(null)}
            onSaveAllocations={(allocations) => {
              setBatchAllocations(
                selectedItemForBatch.pharmacyDrugId,
                allocations
              );
            }}
          />
        )}
      </Paper>
    </Grid>
  );
};