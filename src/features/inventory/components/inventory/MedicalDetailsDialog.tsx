import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { PharmacyDrug } from "../../types/inventory";

interface MedicalDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  medicine: PharmacyDrug;
}

export const MedicalDetailsDialog: React.FC<MedicalDetailsDialogProps> = ({
  open,
  onClose,
  medicine,
}) => {
  // دالة مساعدة لعرض الأسطر داخل الـ Dialog بشكل منسق وفاتح
  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | null;
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 1.5,
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "#64748bd7", fontWeight: "500" }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "#1e293b", fontWeight: "600" }}>
        {value || "—"}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      scroll="paper"
      // 🟢 التحديث الجديد المتوافق مع TypeScript و MUI الحديثة بدلاً من PaperProps المباشرة
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            p: 1,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
          },
        },
      }}
    >
      {/* رأس النافذة */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          direction: "rtl",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "700", color: "#0f172a" }}>
            {medicine.tradeName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            المعلومات الفنية والطبية الكاملة
          </Typography>
        </Box>

        <IconButton onClick={onClose} size="small" sx={{ color: "#94a3b8" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3, my: 0.5 }} />

      {/* محتوى التفاصيل الفاخر وغير المعجوق بالألوان */}
      <DialogContent sx={{ pt: 1, direction: "rtl" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DetailRow
            label="الرمز الباركودي العالمي (Barcode)"
            value={medicine.barcode}
          />
          <DetailRow
            label="الشكل الصيدلاني الرئيسي"
            value={medicine.dosageForm.formCategory}
          />
          <DetailRow
            label="عدد الوحدات داخل العلبة الواحده"
            value={`${medicine.unitsPerBox} وحدات`}
          />
          <DetailRow
            label="حد التنبيه للمخزن المنخفض"
            value={`${medicine.pharmacyDrugDetails.minStockAlert} عبوة`}
          />
          <DetailRow
            label="أيام إنذار تاريخ الصلاحية"
            value={`${medicine.pharmacyDrugDetails.expiryDateAlarm} يوم`}
          />
          <DetailRow
            label="تاريخ تسجيل الدواء بالنظام"
            value={new Date(medicine.createdAt).toLocaleDateString("ar-EG")}
          />

          {/* الملاحظات إذا وجدت في الأسفل بشكل مريح */}
          {medicine.pharmacyDrugDetails.notes && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #d9e3f1",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  display: "block",
                  mb: 0.5,
                  fontWeight: "600",
                }}
              >
                ملاحظات الصيدلية:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#334155", lineHeight: 1.5 }}
              >
                {medicine.pharmacyDrugDetails.notes}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
