
// src/components/SaleInvoiceCard.tsx
import React from "react";
import { Box, Typography, Button, Paper, styled } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import type { SaleInvoiceData } from "../../types/saleInvoice";

{/*ستايل الكارد  */}
const PremiumCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.01)",
  border: "1px solid #f2f2f2",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  flexDirection: "column",
  gap: "16px", 
  height: "100%",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.03)",
    borderColor: `${theme.palette.primary.main}25`,
  },
}));

{/*ستايل النقطة التي توضح حالة الفاتورة */}
const StatusDot = styled(Box)<{ dotColor: string }>(({ dotColor }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: dotColor,
  display: "inline-block",
  boxShadow: `0 0 0 4px ${dotColor}15`,
}));

interface SaleInvoiceCardProps {
  invoice: SaleInvoiceData;
  onDetailsClick: (id: number) => void;
}

export const SaleInvoiceCard: React.FC<SaleInvoiceCardProps> = ({ invoice, onDetailsClick }) => {

  {/*إعطاء لون للنقطة التي تعبر عن حالة الفاتورة */}
  const getStatusColor = (): string => {
    switch (invoice.paymentStatus) {
      case "PENDING":
        return "#f59e0b";
      case "PARTIAL":
        return "#06b6d4";
      case "PAID":
        return "#10b981";
      default:
        return "#3b82f6";
    }
  };

  const statusColor = getStatusColor();

  const invoiceDate = new Date(invoice.createdAt);
  const formattedDate = invoiceDate.toLocaleDateString("ar-SY", { day: "numeric", month: "numeric", year: "numeric" });
  const formattedTime = invoiceDate.toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" });

  const total = parseFloat(invoice.totalAmount);
  

  //ارجاع قيمة كل من المدفوع و الجزئي و المتبقي 
  const getFinancials = () => {
    if (invoice.paymentStatus === "PAID") {
      return { paid: total, remaining: 0 };
    }
    if (invoice.paymentStatus === "PENDING") {
      return { paid: 0, remaining: total };
    }
    const paid = invoice.subtotal ? parseFloat(invoice.subtotal) : 0;
    return { paid: paid, remaining: Math.max(0, total - paid) };
  };
  const { paid: paidAmount, remaining: remainingAmount } = getFinancials();

//التأكد من أن المريض موجود
  const hasPatient = !!invoice.pharmacyInvoice.patient?.fullName;

  return (
    <PremiumCard elevation={0}>
      {/* 1. الرأس: رقم الفاتورة والتاريخ */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <StatusDot dotColor={statusColor} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1f1f1f", fontSize: "1.05rem" }}>
            #INV-{invoice.pharmacyInvoiceId}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#595959", fontSize: "0.82rem", fontWeight: 600, pr: 3.5 }}>
          {formattedDate} • {formattedTime}
        </Typography>
      </Box>

      {/* 2. المنتصف: اسم المريض والأيقونة */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // تم تكبير أبعاد الدائرة التي تحوي الأيقونة
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: hasPatient ? "#b8e0fa40" : "#f5f5f5",
            color: hasPatient ? "#506680" : "#bfbfbf",
          }}
        >
          {/* تم تكبير حجم الأيقونة الداخلي */}
          <PersonOutlineIcon sx={{ fontSize: 24 }} />
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 700, 
            color: hasPatient ? "#262626" : "#bfbfbf", 
            fontSize: "1.15rem", // تم تكبير حجم الخط لاسم المريض
            fontStyle: "normal" // إلغاء الخط المائل تماماً ليظهر مستقيماً في كل الحالات
          }}
        >
          {hasPatient ? invoice.pharmacyInvoice.patient?.fullName : "غير محدد"}
        </Typography>
      </Box>

      {/* 3. الأسفل: المبالغ المالية */}
      <Box sx={{ mt: "auto", pt: 2, borderTop: "1px dashed #f0f0f0" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          
          {/* سطر إجمالي الفاتورة */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
              إجمالي الفاتورة
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "1.12rem", fontWeight: 600, color: "#1f1f1f" }}>
              {total.toLocaleString()}{" "}
              <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#8c8c8c", mr: 0.5 }}>
                ل.س
              </Box>
            </Typography>
          </Box>

          {/* سطر المدفوع */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
              المدفوع
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#434343", fontSize: "1rem" }}>
              {paidAmount.toLocaleString()}{" "}
              <Box component="span" sx={{ fontSize: "0.72rem", fontWeight: 400, color: "#8c8c8c", mr: 0.3 }}>
                ل.س
              </Box>
            </Typography>
          </Box>

          {/* سطر المتبقي */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
              المتبقي
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: statusColor, fontSize: "1rem" }}>
              {remainingAmount.toLocaleString()}{" "}
              <Box component="span" sx={{ fontSize: "0.72rem", fontWeight: 400, color: "#8c8c8c", mr: 0.3 }}>
                ل.س
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 4. زر العمليات */}
      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={() => onDetailsClick(invoice.saleInvoiceId)}
          fullWidth
          sx={{
            backgroundColor: "secondary.main",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.88rem",
            textTransform: "none",
            borderRadius: "10px",
            py: "10px",
            transition: "all 0.2s ease",
          }}
        >
          عرض التفاصيل
        </Button>
      </Box>
    </PremiumCard>
  );
};