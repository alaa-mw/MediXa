import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
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
      <DialogTitle sx={{ fontWeight: 800 }}>
        تحديد الدفعات لصنف: {item.tradeName} ({item.selectedUnit.label})
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : batches.length === 0 ? (
          <Typography color="error" align="center" sx={{ py: 2 }}>
            لا توجد دفعات متاحة لهذه الوحدة حالياً.
          </Typography>
        ) : (
          <>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>تاريخ الانتهاء</TableCell>
                  <TableCell align="center">المتاح</TableCell>
                  <TableCell align="center" width="120">
                    الكمية المسحوبة
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batches.map((b: any) => (
                  <TableRow key={b.batchId}>
                    <TableCell>{b.order}</TableCell>
                    <TableCell>
                      {new Date(b.expiryDate).toLocaleDateString("ar-EG")}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={b.availableDisplayQuantity}
                        color={
                          b.availableDisplayQuantity > 0 ? "success" : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
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
                          input: { style: { textAlign: "center", height: 32 } },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                pt: 1,
                borderTop: "1px solid #eee",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                إجمالي الكمية المحددة من الدفعات:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 800,
                  color: totalAllocated > 0 ? "success.main" : "warning.main",
                }}
              >
                {totalAllocated}{" "}
                {totalAllocated > 0 ? "محسوبة تلقائياً" : "مطلوب"}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ bgcolor: "#316A75" }}
        >
          حفظ التعيين
        </Button>
      </DialogActions>
    </Dialog>
  );
};
