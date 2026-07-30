import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import type {
  BatchAllocation,
  InvoiceItem,
} from "../../types/saleInvoiceCreate";
import { useGetAvailableBatches } from "../../hooks/useSaleInvoiceApi";

interface Props {
  open: boolean;
  onClose: () => void;
  item: InvoiceItem;
  onSaveAllocations: (allocations: BatchAllocation[]) => void;
}

const BATCH_TABLE_COLUMNS = "0.6fr 1.8fr 1.2fr 1.4fr";

export const BatchSelectionModal: React.FC<Props> = ({
  open,
  onClose,
  item,
  onSaveAllocations,
}) => {
  const [allocations, setAllocations] = useState<{ [batchId: number]: number }>(
    {},
  );

  const { data: batchesData, isLoading } = useGetAvailableBatches(
    open ? item.pharmacyDrugId : null,
    open ? item.selectedUnit.unitType : null,
  );

  const batches =
    (batchesData as any)?.data?.batches || (batchesData as any)?.batches || [];

  useEffect(() => {
    if (open && item.batchAllocations?.length) {
      const initialMap: { [batchId: number]: number } = {};
      item.batchAllocations.forEach((b) => {
        initialMap[b.batchId] = b.displayQuantity;
      });
      setAllocations(initialMap);
    } else {
      setAllocations({});
    }
  }, [open, item]);

  const handleQuantityChange = (
    batchId: number,
    qty: number,
    maxAvailable: number,
  ) => {
    const validQty = Math.max(0, Math.min(qty, maxAvailable));
    setAllocations((prev) => ({
      ...prev,
      [batchId]: validQty,
    }));
  };

  const handleSave = () => {
    const result: BatchAllocation[] = Object.entries(allocations)
      .filter(([_, qty]) => qty > 0)
      .map(([batchId, qty]) => ({
        batchId: Number(batchId),
        displayQuantity: qty,
      }));

    onSaveAllocations(result);
    onClose();
  };

  const totalAllocated = Object.values(allocations).reduce(
    (a, b) => a + (b || 0),
    0,
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              p: 1,
              bgcolor: "#EBF5F8",
              borderRadius: 2.5,
              border: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LayersOutlinedIcon sx={{ color: "#316A75", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: 17, color: "#1E293B" }}
            >
              تحديد دفعات الصنف
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontSize: 13, mt: 0.2 }}
            >
              {item.tradeName}{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#316A75",
                  fontSize: 12,
                  bgcolor: "#EBF5F8",
                  px: 1,
                  py: 0.2,
                  borderRadius: 1,
                }}
              >
                ({item.selectedUnit.label})
              </Typography>
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#94A3B8",
            bgcolor: "#F8FAFC",
            "&:hover": { bgcolor: "#F1F5F9" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, pt: 0 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={36} sx={{ color: "#316A75" }} />
          </Box>
        ) : batches.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "#FEF2F2",
              borderRadius: 3,
              border: "1px solid #FEE2E2",
              my: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <InfoOutlinedIcon sx={{ color: "#EF4444", fontSize: 28 }} />
            <Typography
              sx={{ color: "#991B1B", fontWeight: 600, fontSize: 14 }}
            >
              لا توجد دفعات متاحة لهذه الوحدة حالياً.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: BATCH_TABLE_COLUMNS,
                gap: 1.5,
                bgcolor: "#EBF5F8",
                p: 1.5,
                borderRadius: 2.5,
                mb: 1.5,
                fontWeight: 700,
                fontSize: 13,
                color: "#2D3A4D",
                alignItems: "center",
              }}
            >
              <Box sx={{ textAlign: "center" }}>#</Box>
              <Box>تاريخ الانتهاء</Box>
              <Box sx={{ textAlign: "center" }}>المتاح</Box>
              <Box sx={{ textAlign: "center" }}>الكمية المسحوبة</Box>
            </Box>

            {/* Table Rows */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {batches.map((b: any) => (
                <Box
                  key={b.batchId}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: BATCH_TABLE_COLUMNS,
                    gap: 1.5,
                    alignItems: "center",
                    bgcolor: "#FAFCFD",
                    p: 1.25,
                    borderRadius: 2,
                    border: "1px solid #F1F5F9",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: "#CBD5E1",
                      bgcolor: "#FFFFFF",
                    },
                  }}
                >
                  {/* Batch Order Badge */}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        bgcolor: "#EBF5F8",
                        color: "#316A75",
                        fontWeight: 700,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {b.order}
                    </Box>
                  </Box>

                  {/* Expiry Date */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayOutlinedIcon
                      sx={{ fontSize: 16, color: "#64748B" }}
                    />
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, color: "#334155" }}
                    >
                      {new Date(b.expiryDate).toLocaleDateString("ar-EG")}
                    </Typography>
                  </Box>

                  {/* Available Badge */}
                  <Box sx={{ textAlign: "center" }}>
                    <Chip
                      label={b.availableDisplayQuantity}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: 12,
                        bgcolor:
                          b.availableDisplayQuantity > 0
                            ? "#ECFDF5"
                            : "#F3F4F6",
                        color:
                          b.availableDisplayQuantity > 0
                            ? "#059669"
                            : "#9CA3AF",
                        border: `1px solid ${
                          b.availableDisplayQuantity > 0 ? "#A7F3D0" : "#E5E7EB"
                        }`,
                        height: 24,
                      }}
                    />
                  </Box>

                  {/* Quantity Input */}
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      size="small"
                      type="number"
                      disabled={b.availableDisplayQuantity === 0}
                      value={allocations[b.batchId] || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          b.batchId,
                          Number(e.target.value),
                          b.availableDisplayQuantity,
                        )
                      }
                      slotProps={{
                        input: {
                          style: {
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            padding: "4px 8px",
                          },
                        },
                      }}
                      sx={{
                        width: 90,
                        "& .MuiOutlinedInput-root": {
                          height: 36,
                          borderRadius: 2,
                          bgcolor: "white",
                          "& fieldset": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#CBD5E1",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#316A75",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Total Allocated Summary Card */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2.5,
                p: 2,
                borderRadius: 3,
                bgcolor: totalAllocated > 0 ? "#F0FDF4" : "#F8FAFC",
                border: "1px solid",
                borderColor: totalAllocated > 0 ? "#DCFCE7" : "#E2E8F0",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 14, color: "#1E293B" }}
              >
                إجمالي الكمية المحددة من الدفعات:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 16,
                    color: totalAllocated > 0 ? "#15803D" : "#D97706",
                  }}
                >
                  {totalAllocated}
                </Typography>
                <Chip
                  label={totalAllocated > 0 ? "مخصصة" : "غير مخصصة"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    height: 22,
                    bgcolor: totalAllocated > 0 ? "#DCFCE7" : "#FEF3C7",
                    color: totalAllocated > 0 ? "#166534" : "#92400E",
                  }}
                />
              </Box>
            </Box>
          </>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          p: 2.5,
          pt: 1.5,
          borderTop: "1px solid #F1F5F9",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 2.5,
            py: 0.8,
            color: "#64748B",
            borderColor: "#CBD5E1",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              borderColor: "#94A3B8",
              bgcolor: "#F8FAFC",
            },
          }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            bgcolor: "#316A75",
            borderRadius: 2,
            px: 3,
            py: 0.8,
            fontWeight: 700,
            boxShadow: "none",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#25535C",
              boxShadow: "none",
            },
          }}
        >
          حفظ التعيين
        </Button>
      </DialogActions>
    </Dialog>
  );
};
