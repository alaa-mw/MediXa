import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AddIcon from "@mui/icons-material/Add";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DeleteOutlined, ErrorOutlined } from "@mui/icons-material";

export default function BatchManagementForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#2D3A4D", mb: 1 }}
        >
          إدارة دفعات الأدوية
        </Typography>
        <Typography sx={{ color: "#64748B" }}>
          قم بتحديد الكميات وتواريخ إنهاء الصلاحية لكل صنف مضاف
        </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="ابحث عن دواء (اسم أو باركود)..."
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QrCodeScannerIcon sx={{ color: "#A0AEC0" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Active Filled Card Block */}
      <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: "1px solid #E2F0F4" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ ml: 1, mr: 0 }} />}
            sx={{
              bgcolor: "#316A75",
              "&:hover": { bgcolor: "#255159" },
              borderRadius: 5,
            }}
          >
            إضافة دفعة
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{ fontWeight: 700, color: "#2D3A4D", fontSize: 16 }}
              >
                بانادو B إكسترا - 500 ملجم
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                <Chip label="Panadol Extra" size="small" />
                <Chip label="مسكن آلام" color="success" size="small" />
              </Box>
            </Box>
            <Box sx={{ bgcolor: "#F0F4F8", p: 1, borderRadius: 2 }}>
              <LocalPharmacyIcon sx={{ color: "#316A75" }} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2.5fr 2fr 2fr 1fr",
            bgcolor: "#EBF5F8",
            p: 1.5,
            borderRadius: 2,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 13,
            mb: 2,
          }}
        >
          <Box>رقم التشغيلة (Batch)</Box>
          <Box>الكمية (علبة)</Box>
          <Box>تاريخ الانتهاء</Box>
          <Box>الإجراءات</Box>
        </Box>

        {[
          ["B-99821-X", "50", "05/12/2026"],
          ["B-99822-X", "25", "08/20/2026"],
        ].map((row, idx) => (
          <Box
            key={idx}
            sx={{
              display: "grid",
              gridTemplateColumns: "2.5fr 2fr 2fr 1fr",
              alignItems: "center",
              mb: 1.5,
              textAlign: "center",
            }}
          >
            <Box sx={{ px: 1 }}>
              <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
                {row[0]}
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
                {row[1]}
              </Box>
            </Box>
            <Box sx={{ px: 1 }}>
              <Box sx={{ bgcolor: "#F1F5F9", py: 1, borderRadius: 2 }}>
                {row[2]}
              </Box>
            </Box>
            <IconButton color="error">
              <DeleteOutlined/>
            </IconButton>
          </Box>
        ))}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Typography sx={{ color: "#718096" }}>
            إجمالي الكمية للصنف:
          </Typography>
          <Typography sx={{ fontWeight: 800, color: "#316A75" }}>75</Typography>
        </Box>
      </Paper>

      {/* Info Footnotes layout rows */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
          mt: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#EBF8F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#234E46" }} />
          <Typography sx={{ fontSize: 12, color: "#234E46" }}>
            نظام إدارة الدفعات يضمن تتبع دقيق للصلاحية
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#FFF5F5",
            p: 2,
            borderRadius: 2,
          }}
        >
          <ErrorOutlined sx={{ color: "#9B2C2C" }} />
          <Typography sx={{ fontSize: 12, color: "#9B2C2C" }}>
            سيتم تنبيهك تلقائياً عند اقتراب انتهاء صلاحية أي دفعة
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#F7FAFC",
            p: 2,
            borderRadius: 2,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#4A5568" }} />
          <Typography sx={{ fontSize: 12, color: "#4A5568" }}>
            تاريخ الانتهاء هو العامل الأساسي في قاعدة صرف الأدوية FEFO
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "none",
        }}
      >
        <Button
          onClick={onBack}
          startIcon={<ArrowForwardIcon sx={{ ml: 1, mr: 0 }} />}
          sx={{ color: "#64748B" }}
        >
          الرجوع للسابق
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          startIcon={<ArrowBackIcon sx={{ ml: 1, mr: 0 }} />}
          sx={{ bgcolor: "#5C4066", "&:hover": { bgcolor: "#4A3352" } }}
        >
          الخطوة التالية
        </Button>
      </Paper>
    </Box>
  );
}
