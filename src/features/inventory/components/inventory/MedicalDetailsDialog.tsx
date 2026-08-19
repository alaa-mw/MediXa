
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Close as CloseIcon, InfoOutlined as InfoIcon } from "@mui/icons-material";
import type { PharmacyDrug } from "../../types/pharnacyDrug";

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
  const StatCard = ({ label, value }: { label: string; value: string | number | null }) => (
    <Box
      sx={{
        p: 1.75,
        backgroundColor: "#f8fafc",
        borderRadius: "10px",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500, fontSize: "0.75rem" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "#0f172a", fontWeight: 700 }}>
        {value || "—"}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 20px 40px rgba(0,0,0,0.12)",
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "#ffffff",
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          direction: "rtl",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
            {medicine.tradeName}
          </Typography>
          <Typography variant="caption" sx={{ color: "#cbd5e1", fontSize: "0.775rem" }}>
            التفاصيل الفنية والبيانات المسجلة بالنظام
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "#94a3b8", "&:hover": { color: "#fff" } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3, direction: "rtl", backgroundColor: "#ffffff" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label="الرمز الباركودي العالمي" value={medicine.barcode} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label="الشكل الصيدلاني" value={medicine.dosageForm.formCategory} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label="وحدات العلبة الواحدة" value={`${medicine.unitsPerBox} units`} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label="حد التنبيه للمخزن" value={`${medicine.pharmacyDrugDetails.minStockAlert} عبوة`} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard label="أيام إنذار الصلاحية" value={`${medicine.pharmacyDrugDetails.expiryDateAlarm} يوم`} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <StatCard
              label="تاريخ الإضافة"
              value={new Date(medicine.createdAt).toLocaleDateString("ar-EG")}
            />
          </Grid>
        </Grid>

        {/* Notes Block */}
        {medicine.pharmacyDrugDetails.notes && (
          <Box
            sx={{
              mt: 2.5,
              p: 2,
              backgroundColor: "#f0f9ff",
              borderRadius: "10px",
              border: "1px solid #bae6fd",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <InfoIcon sx={{ color: "#0284c7", fontSize: 20, mt: 0.2 }} />
            <Box>
              <Typography variant="caption" sx={{ color: "#0369a1", fontWeight: 700, display: "block", mb: 0.5 }}>
                ملاحظات الصيدلية
              </Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontSize: "0.825rem", lineHeight: 1.5 }}>
                {medicine.pharmacyDrugDetails.notes}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};