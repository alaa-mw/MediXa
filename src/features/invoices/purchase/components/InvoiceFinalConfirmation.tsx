import React from "react";
import { Box, Typography, Paper, Grid, Divider, Button, Chip } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function InvoiceFinalConfirmation({
  onBack,
}: {
  onBack: () => void;
}) {
  const items = [
    {
      name: "أوجمنتين 1 جم",
      label: "Augmentin 1g Tablets",
      qty: "50 علبة",
      price: "120.00 ر.س",
      total: "6,000.00 ر.س",
    },
    {
      name: "بانادول إكسترا",
      label: "Panadol Extra 20 Tablets",
      qty: "200 علبة",
      price: "12.50 ر.س",
      total: "2,500.00 ر.س",
    },
    {
      name: "فولتارين جل 50جم",
      label: "Voltaren Emulgel 50g",
      qty: "30 أنبوب",
      price: "35.00 ر.س",
      total: "1,050.00 ر.س",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#2D3A4D", mb: 1 }}
        >
          تأكيد الفاتورة النهائية
        </Typography>
        <Typography sx={{ color: "#64748B" }}>
          تأكد من مطابقة البيانات المستلمة مع الفاتورة الورقية قبل الاعتماد
          النهائي للمخزون
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid sx={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid #EAF2F6",
              boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Inventory2OutlinedIcon />
                <Typography sx={{ fontWeight: 800 }}>
                  مراجعة الأصناف المضافة
                </Typography>
              </Box>
              <Chip
                label="6 أصناف مسجلة"
                sx={{ bgcolor: "#316A75", color: "white" }}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr 1.5fr 1.5fr",
                bgcolor: "#EBF5F8",
                p: 2,
                borderRadius: 2,
                mb: 2,
                fontWeight: 700,
              }}
            >
              <Box>الصنف</Box>
              <Box sx={{ textAlign: "center" }}>الكمية</Box>
              <Box sx={{ textAlign: "center" }}>سعر الوحدة</Box>
              <Box sx={{ textAlign: "center" }}>الإجمالي</Box>
            </Box>

            {items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr 1.5fr 1.5fr",
                  alignItems: "center",
                  bgcolor: "#FAFCFD",
                  p: 2,
                  borderRadius: 2,
                  mb: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <MedicationOutlinedIcon sx={{ color: "#2D3A4D" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#A0AEC0" }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ textAlign: "center" }}>{item.qty}</Typography>
                <Typography sx={{ textAlign: "center" }}>
                  {item.price}
                </Typography>
                <Typography sx={{ textAlign: "center", fontWeight: 800 }}>
                  {item.total}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid sx={{ xs: 12, md: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Paper
              sx={{ p: 3, borderRadius: 4, bgcolor: "#2C394B", color: "white" }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <ReceiptOutlinedIcon sx={{ color: "#CBD5E1" }} />
                <Typography sx={{ fontWeight: 700 }}>
                  ملخص الفاتورة النهائي
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#CBD5E1" }}>
                  إجمالي الأصناف
                </Typography>
                <Typography>16,662.50</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography sx={{ color: "#CBD5E1" }}>
                  ضريبة القيمة المضافة (14%)
                </Typography>
                <Typography>2,332.75</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography sx={{ color: "#CBD5E1" }}>خصم خاص</Typography>
                <Typography>- 495.25</Typography>
              </Box>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Box>
                  <Typography sx={{ color: "#CBD5E1", fontSize: 11 }}>
                    الصافي المطلوب دفعه
                  </Typography>
                  <Chip
                    label="EGP"
                    size="small"
                    sx={{
                      bgcolor: "#415065",
                      color: "white",
                      mt: 0.5,
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: 26 }}>
                  18,500.00
                </Typography>
              </Box>
            </Paper>

            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "#EAF6FA",
                border: "1px solid #D6EAF3",
                boxShadow: "none",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <InfoOutlinedIcon sx={{ color: "#316A75" }} />
                <Typography sx={{ fontWeight: 700, color: "#2D3A4D" }}>
                  بيانات المورد والدفع
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ color: "#64748B" }}>
                  المورد
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  مستودع الأدوية المركزية
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ color: "#64748B" }}>
                  تاريخ الشراء
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  15 أكتوبر 2023
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyValue: "space-between",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "#64748B" }}>
                  حالة الدفع
                </Typography>
                <Chip
                  label="دفع مؤجل (30 يوم)"
                  size="small"
                  sx={{
                    bgcolor: "#D1FAE5",
                    color: "#065F46",
                    fontWeight: 700,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
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
          sx={{ bgcolor: "#5C4066", "&:hover": { bgcolor: "#4A3352" }, px: 4 }}
        >
          تأكيد الفاتورة
        </Button>
      </Paper>
    </Box>
  );
}
