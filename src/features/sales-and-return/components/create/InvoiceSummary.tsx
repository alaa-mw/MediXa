import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useSaleInvoice } from "../../hooks/useSaleInvoice";
import { CustomTextField } from "../../../../shared/layout/CustomTextField";
import PatientInfoCard from "./PatientInfoCard";

export const InvoiceSummary: React.FC = () => {
  const {
    state: { discount, paymentStatus, paidAmount, notes, patient },
    selectors: {
      items,
      subTotal,
      netTotal,
      requiresPrescriptionAny,
      shouldShowPatientCard,
      isSubmitting,
    },
    actions: {
      updatePatientInfo,
      changeDiscount,
      changePaymentStatus,
      changePaidAmount,
      changeNotes,
      submitInvoice,
      clearInvoice
    },
  } = useSaleInvoice();

  const [feedback, setFeedback] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    discount: "",
    paidAmount: "",
    patientName: "",
  });

  const handleSubmit = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    setFieldErrors({ discount: "", paidAmount: "", patientName: "" });
    let hasError = false;

    if (discount < 0) {
      setFieldErrors((prev) => ({
        ...prev,
        discount: "الخصم لا يمكن أن يكون سالباً",
      }));
      hasError = true;
    } else if (discount > subTotal) {
      setFieldErrors((prev) => ({
        ...prev,
        discount: "الخصم يجب ألا يتجاوز الإجمالي",
      }));
      hasError = true;
    }

    if (paymentStatus === "PARTIAL") {
      if (!paidAmount || paidAmount <= 0) {
        setFieldErrors((prev) => ({
          ...prev,
          paidAmount: "يرجى إدخال المبلغ المدفوع جزئياً بشكل صحيح",
        }));
        hasError = true;
      } else if (paidAmount >= netTotal) {
        setFieldErrors((prev) => ({
          ...prev,
          paidAmount: "المبلغ المدفوع يجب أن يكون أقل من الصافي",
        }));
        hasError = true;
      }
    }

    if (shouldShowPatientCard && !patient?.fullName?.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        patientName: "يرجى إدخال اسم المريض كاملاً",
      }));
      hasError = true;
    }

    if (hasError) {
      setFeedback({
        open: true,
        type: "error",
        message: "يرجى تصحيح الأخطاء في الحقول المحددة.",
      });
      return;
    }

    submitInvoice({
      onSuccess: (res) => {
        setFeedback({
          open: true,
          type: "success",
          message: `تم إنشاء الفاتورة بنجاح! رقم الفاتورة: #${res?.id || res?.invoiceNumber || ""}`,
        });
      },
      onError: (err) => {
        const serverMsg =
          err?.response?.data?.message || "حدث خطأ أثناء حفظ الفاتورة.";
        setFeedback({
          open: true,
          type: "error",
          message: Array.isArray(serverMsg) ? serverMsg.join(" | ") : serverMsg,
        });
      },
    });
  };

  return (
    <Grid size={{ xs: 12, lg: 4 }} sx={{ height: "100%" }}>
      {/* Container رئيسي ممتد وموحد */}
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          maxHeight: "100%", // ضمان الاحتواء داخل الشاشة
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          p: 2.5,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* ===================== [ الجزء 1: ثابت في الأعلى ] ===================== */}
        <Box sx={{ flexShrink: 0 }}>
          {/* عنوان ملخص الفاتورة النهائي */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ReceiptOutlinedIcon sx={{ color: "#316A75", fontSize: 22 }} />
            <Typography
              sx={{ fontWeight: 800, fontSize: 16, color: "#0F172A" }}
            >
              ملخص الفاتورة النهائي
            </Typography>
          </Box>

          {/* البطاقة الداكنة لملخص الأرقام */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3.5,
              bgcolor: "tertiary.main",
              color: "white",
              mb: 2.5,
            }}
          >
            <Stack spacing={1.8}>
              {/* إجمالي الأصناف */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#CBD5E1", whiteSpace: "nowrap" }}>
                  إجمالي الأصناف ({items.length})
                </Typography>
                <Typography>
                  {subTotal.toLocaleString()}{" "}
                  <Box component="span" sx={{ fontSize: 11, color: "#94A3B8" }}>
                    ل.س
                  </Box>
                </Typography>
              </Box>

              {/* خصم خاص */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#CBD5E1", whiteSpace: "nowrap" }}>
                  خصم خاص
                </Typography>
                <Box sx={{ width: 130 }}>
                  <CustomTextField
                    label=""
                    placeholder="0"
                    value={discount || ""}
                    onChange={(val) => {
                      setFieldErrors((prev) => ({ ...prev, discount: "" }));
                      changeDiscount(Number(val) || 0);
                    }}
                    type="number"
                    padding="4px"
                    error={!!fieldErrors.discount}
                    helperText={fieldErrors.discount}
                  />
                </Box>
              </Box>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 0.5 }} />

              {/* الصافي المطلوب دفعه */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#CBD5E1", whiteSpace: "nowrap" }}>
                  إجمالي المستحق
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: 24,
                      color: "#bde8f1",
                      letterSpacing: -0.5,
                    }}
                  >
                    {netTotal.toLocaleString()}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 700, color: "#94A3B8" }}
                  >
                    ل.س
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* ===================== [ الجزء 2: قابل للسكرول ] ===================== */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 0.5,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            "&::-webkit-scrollbar": { width: 5 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#CBD5E1",
              borderRadius: 4,
            },
          }}
        >
          {/* حالة الدفع */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#64748B",
                mb: 1,
                display: "block",
              }}
            >
              حالة الدفع
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[
                { label: "مدفوع", value: "PAID" },
                { label: "معلق", value: "PENDING" },
                { label: "دفع جزئي", value: "PARTIAL" },
              ].map((status) => {
                const isSelected = paymentStatus === status.value;
                return (
                  <Chip
                    key={status.value}
                    label={status.label}
                    onClick={() => {
                      setFieldErrors((prev) => ({ ...prev, paidAmount: "" }));
                      changePaymentStatus(status.value as any);
                    }}
                    icon={
                      isSelected ? (
                        <CheckCircleRoundedIcon
                          style={{ color: "white", fontSize: 16 }}
                        />
                      ) : undefined
                    }
                    sx={{
                      flex: 1,
                      height: 40,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      bgcolor: isSelected ? "#316A75" : "#F8FAFC",
                      color: isSelected ? "white" : "#475569",
                      border: isSelected ? "none" : "1px solid #E2E8F0",
                      "& .MuiChip-label": { px: 1 },
                      "&:hover": {
                        bgcolor: isSelected ? "#25535C" : "#F1F5F9",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* حقل المبلغ المدفوع جزئياً */}
          {paymentStatus === "PARTIAL" && (
            <CustomTextField
              label="المبلغ المدفوع جزئياً *"
              placeholder="أدخل المبلغ المدفوع"
              value={paidAmount || ""}
              onChange={(val) => {
                setFieldErrors((prev) => ({ ...prev, paidAmount: "" }));
                changePaidAmount(Number(val) || 0);
              }}
              type="number"
              error={!!fieldErrors.paidAmount}
              helperText={fieldErrors.paidAmount}
            />
          )}


          {/* lملاحظات الفاتورة*/}
          <CustomTextField
            label="ملاحظات الفاتورة (اختياري)"
            placeholder="أضف أي ملاحظات إضافية..."
            value={notes}
            onChange={(val) => changeNotes(val)}
          />


          {/*معلومات المريض*/}
          {shouldShowPatientCard && (
            <PatientInfoCard
              patient={patient}
              requiresPrescriptionAny={requiresPrescriptionAny}
              nameError={fieldErrors.patientName}
              onUpdate={updatePatientInfo}
              onClearError={() =>
                setFieldErrors((prev) => ({ ...prev, patientName: "" }))
              }
            />
          )}
        </Box>

        {/* ===================== [ الجزء 3: ثابت في الأسفل ] ===================== */}
        {/* <Box sx={{ flexShrink: 0, pt: 2, borderTop: "1px solid #F1F5F9" }}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            disabled={items.length === 0 || isSubmitting}
            onClick={handleSubmit}
            sx={{
              bgcolor: "primary.main",
              py: 1.4,
              fontSize: 15,
              fontWeight: 800,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(49, 106, 117, 0.25)",
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "إنشاء الفاتورة"
            )}
          </Button>

        </Box> */}
        <Box
  sx={{
    flexShrink: 0,
    pt: 2,
    borderTop: "1px solid #F1F5F9",
    display: "flex", 
    gap: 1.5, 
    alignItems: "center",
  }}
>
  <Button
    type="button"
    variant="contained"
    disabled={items.length === 0 || isSubmitting}
    onClick={handleSubmit}
    sx={{
      flex: 1, 
      py: 1.4,
      fontSize: 15,
      fontWeight: 800,
      borderRadius: 3,
      whiteSpace: "nowrap", 
      minWidth: 0, 
      bgcolor: "primary.main",
      boxShadow: "0 4px 12px rgba(49, 106, 117, 0.25)",
    }}
  >
    {isSubmitting ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      "إنشاء الفاتورة"
    )}
  </Button>
  {/* 1️⃣ زر إلغاء الفاتورة */}
  <Button
    type="button"
    variant="outlined"
    color="error"
    disabled={items.length === 0 || isSubmitting}
    onClick={() => {
      clearInvoice();
    }}
    sx={{
      flex: 1, 
      py: 1.4,
      fontSize: 15,
      fontWeight: 800,
      borderRadius: 3,
      whiteSpace: "nowrap", 
      minWidth: 0,
      borderColor: "#FCA5A5",
      bgcolor: "#FEF2F2",
      color: "#DC2626",
      "&.Mui-disabled": {
        bgcolor: "#F8FAFC",
        borderColor: "#E2E8F0",
        color: "#94A3B8",
      },
    }}
  >
    إلغاء الفاتورة
  </Button>  
</Box>
      </Paper>

      {/* التنبيهات */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={5000}
        onClose={() => setFeedback((f) => ({ ...f, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={feedback.type}
          variant="filled"
          sx={{ width: "100%", fontWeight: 700, borderRadius: 2 }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
