import React from "react";
import { Box, Typography, Button, Paper, styled } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import type { ReturnInvoiceData } from "../../types/returnInvoice";

const PremiumReturnCard = styled(Paper)(({  }) => ({
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
    borderColor: "#ef444430", // تلميح أحمر خفيف عند الهوفر ليناسب طبيعة المرتجع
  },
}));

interface ReturnInvoiceCardProps {
  invoice: ReturnInvoiceData;
  onDetailsClick: (id: number) => void;
}

export const ReturnInvoiceCard: React.FC<ReturnInvoiceCardProps> = ({ invoice, onDetailsClick }) => {
  const invoiceDate = new Date(invoice.createdAt);
  const formattedDate = invoiceDate.toLocaleDateString("ar-SY", { day: "numeric", month: "numeric", year: "numeric" });
  const formattedTime = invoiceDate.toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" });

  const totalRefund = parseFloat(invoice.subtotalRefund);
  const hasPatient = !!invoice.pharmacyInvoice.patient?.fullName;

  return (
    <PremiumReturnCard elevation={0}>
      {/* 1. الرأس: رقم فاتورة المرتجع والتاريخ (بدون أيقونة دوت المبيعات) */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", pl: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1f1f1f", fontSize: "1.05rem" }}>
            #RET-{invoice.returnInvoiceId}
          </Typography>
          <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.78rem", mr: "auto", fontWeight: 500 }}>
            الفاتورة الأصلية: #INV-{invoice.referenceSaleInvoiceId}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#595959", fontSize: "0.82rem", fontWeight: 600 }}>
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
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: hasPatient ? "#eef2f7" : "#f5f5f5",
            color: hasPatient ? "#475569" : "#bfbfbf",
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: 24 }} />
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 700, 
            color: hasPatient ? "#262626" : "#bfbfbf", 
            fontSize: "1.15rem",
            fontStyle: "normal"
          }}
        >
          {hasPatient ? invoice.pharmacyInvoice.patient?.fullName : "غير محدد"}
        </Typography>
      </Box>

      {/* 3. الأسفل: إجمالي المبلغ المرتجع فقط باللون الأحمر الجريء والأنيق */}
      <Box sx={{ mt: "auto", pt: 2, borderTop: "1px dashed #f0f0f0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.85rem", fontWeight: 600 }}>
            إجمالي قيمة المرتجع
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#dc2626" }}>
            {totalRefund.toLocaleString()}{" "}
            <Box component="span" sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#dc2626", mr: 0.5 }}>
              ل.س
            </Box>
          </Typography>
        </Box>
        {invoice.pharmacyInvoice.notes && (
          <Typography variant="caption" sx={{ display: "block", color: "#6b7280", mt: 1, fontSize: "0.78rem", fontStyle: "italic" }}>
            ملاحظة: {invoice.pharmacyInvoice.notes}
          </Typography>
        )}
      </Box>

      {/* 4. زر العمليات */}
      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={() => onDetailsClick(invoice.returnInvoiceId)}
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
          عرض تفاصيل المرتجع
        </Button>
      </Box>
    </PremiumReturnCard>
  );
};