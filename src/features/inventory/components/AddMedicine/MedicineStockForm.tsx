// features/inventory/components/MedicineStockForm.tsx
import React from "react";
import { Box, Typography, Button, FormControlLabel, Checkbox, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NumberSpinner } from "./NumberSpinner";
import { BatchesTable, type BatchRow } from "./BatchTable";

interface MedicineStockFormProps {
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
}

export const MedicineStockForm: React.FC<MedicineStockFormProps> = ({
  alertLimit,
  setAlertLimit,
  expiryAlertMonths,
  setExpiryAlertMonths,
  allowRetail,
  setAllowRetail,
  batches,
  onAddNewBatch,
  onDeleteBatch,
  onUpdateBatchField,
}) => {
  return (
    <>
      {/* قسم العدادات وخيار البيع بالتجزئة */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          mb: 3,
          alignItems: { xs: "stretch", sm: "flex-end" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <NumberSpinner
            label="حد التنبيه (صفر المادة)"
            value={alertLimit}
            onChange={setAlertLimit}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <NumberSpinner
            label="تنبيه انتهاء الصلاحية قبل (بالأشهر)"
            value={expiryAlertMonths}
            onChange={setExpiryAlertMonths}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", pb: 0.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allowRetail}
                onChange={(e) => setAllowRetail(e.target.checked)}
                sx={{
                  color: "#cbd5e1",
                  "&.Mui-checked": { color: "#0f172a" },
                  "& .MuiSvgIcon-root": { borderRadius: 6 },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: 600, color: "#334155", fontSize: "14px" }}>
                هل يمكن البيع بالتجزئة؟
              </Typography>
            }
            sx={{ direction: "rtl", marginRight: 0 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderColor: "#f1f5f9" }} />

      {/* قسم جدول الدفعات */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b" }}>
          جدولة الدفعات الحالية
        </Typography>
        <Button
          variant="contained"
          onClick={onAddNewBatch}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "tertiary.dark",
            "&:hover": { backgroundColor: "#0d9488" },
            borderRadius: "12px",
            px: 2.5,
            py: 0.8,
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          إضافة دفعة
        </Button>
      </Box>

      <BatchesTable
        batches={batches}
        onUpdateField={onUpdateBatchField}
        onDeleteRow={onDeleteBatch}
      />
    </>
  );
};