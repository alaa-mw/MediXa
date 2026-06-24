// features/inventory/components/FoundMedicineDialog.tsx
import React from "react";
import { Dialog, DialogContent, Box, Typography, Button, Stack } from "@mui/material";
import { CloseButton } from "../CloseButton";
import { MedicineStockForm } from "./MedicineStockForm";
import type { BatchRow } from "./BatchTable";

interface FoundMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  alertLimit: number;
  setAlertLimit: (val: number) => void;
  expiryAlertMonths: number;
  setExpiryAlertMonths: (val: number) => void;
  allowRetail: boolean;
  setAllowRetail: (val: boolean) => void;
  batches: BatchRow[];
  onAddNewBatch: () => void;
  onDeleteBatch: (id: string) => void;
  onUpdateBatchField: (
    id: string,
    field: keyof BatchRow,
    value: string | number
  ) => void;
  totalQuantity: number;
}

export const FoundMedicineDialog: React.FC<FoundMedicineDialogProps> = (props) => {
  const { open, onClose, totalQuantity } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            p: 1,
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            position: "relative",
          },
        },
      }}
    >
      <CloseButton onClick={onClose} />

      <DialogContent sx={{ p: 3, pt: 4 }}>
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}
          >
            Panadol Advance
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#94a3b8", fontWeight: 500 }}
          >
            Paracetamol 500mg
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "#64748b", fontWeight: 500, mb: 4, textAlign: "right" }}
        >
          يرجى ملء الحقول المطلوبة لإدارة مخزونك بدقة.
        </Typography>

        {/* استدعاء المكون المستخرج بنجاح */}
        <MedicineStockForm {...props} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            pt: 2,
          }}
        >
          <Typography
            sx={{ fontWeight: 700, color: "#64748b", fontSize: "15px" }}
          >
            إجمالي الكمية المدخلة:{" "}
            <span
              style={{
                color: "tertiary.dark",
                fontSize: "24px",
                fontWeight: "800",
                marginRight: "6px",
              }}
            >
              {totalQuantity}
            </span>{" "}
            علبة
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              onClick={onClose}
              sx={{
                color: "#64748b",
                fontWeight: "bold",
                px: 3,
                borderRadius: "12px",
              }}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                backgroundColor: "secondary.dark",
                "&:hover": { backgroundColor: "#1e293b" },
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                fontWeight: "bold",
                boxShadow: "none",
              }}
            >
              تأكيد حفظ الدواء
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};