import React from "react";
import { Box, Button, Paper, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LayersIcon from "@mui/icons-material/Layers";

interface StepConfig {
  label: string;
  subtitle: string;
  caption: string;
  icon: React.ReactNode;
}

const STEPS: StepConfig[] = [
  {
    label: "البيانات الأساسية",
    subtitle: "الخطوة 1",
    caption: "اسم الدواء، الباركود، الفئات والمكونات",
    icon: <InfoOutlinedIcon fontSize="small" />,
  },
  {
    label: "التسعير والتخزين",
    subtitle: "الخطوة 2",
    caption: "أسعار الشراء والمبيع والرف والتنبيهات",
    icon: <AttachMoneyIcon fontSize="small" />,
  },
  {
    label: "الدفعات والصلاحية",
    subtitle: "الخطوة 3",
    caption: "الكميات المستلمة وتواريخ الصلاحية",
    icon: <LayersIcon fontSize="small" />,
  },
];

interface Props {
  activeStep: number;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const AddPrivateDrugStepper: React.FC<Props> = ({
  activeStep = 0,
  children,
  onNext,
  onBack,
  onSubmit,
  isSubmitting = false,
}) => {
  const isFirst = activeStep === 0;
  const isLast = activeStep === STEPS.length - 1;

  const progressPercent = (activeStep / (STEPS.length - 1)) * 100;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#F8FAFC", py: 2, px: { xs: 1.5, md: 3 } }}>
      
      {/* ─── Stepper Tracker العلوي ─── */}
      <Box sx={{ maxWidth: "1100px", width: "100%", mx: "auto", mb: 2, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 36,
            left: "100px",
            right: "100px",
            height: 2.5,
            bgcolor: "#E2E8F0",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${progressPercent}%`,
              bgcolor: "#10B981",
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          {STEPS.map((step, idx) => {
            const isCompleted = activeStep > idx;
            const isActive = activeStep === idx;

            return (
              <Box key={idx} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "200px" }}>
                <Typography sx={{ fontSize: 11, color: "#64748B", mb: 0.3, fontWeight: 600 }}>
                  {step.subtitle}
                </Typography>

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    bgcolor: isCompleted ? "#10B981" : isActive ? "primary.main" : "#FFFFFF",
                    border: !isCompleted && !isActive ? "2px solid #CBD5E1" : "none",
                    color: isCompleted || isActive ? "#FFFFFF" : "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isActive ? "0px 4px 12px rgba(37, 99, 235, 0.25)" : "none",
                    transition: "all 0.3s ease-in-out",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {isCompleted ? <CheckCircleIcon sx={{ fontSize: 22 }} /> : step.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "#1E293B" : "#64748B",
                    mt: 0.8,
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ─── حاوية العناصر بالمنتصف مع حركة انتقال ناعمة ─── */}
      <Box 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", // سنترة عمودية
          alignItems: "center",     // سنترة أفقيّة
          width: "100%",
          maxWidth: "1100px",
          mx: "auto",
          pb: 3,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // الحركة الناعمة عند الإضافة والارتفاع
        }}
      >
        <Box sx={{ width: "100%", transition: "all 0.4s ease-in-out" }}>
          {children}
        </Box>
      </Box>

      {/* ─── الشريط السفلي ─── */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: "1100px",
          width: "100%",
          mx: "auto",
          position: "sticky",
          bottom: 12,
          p: 1.2,
          px: 3,
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <Button
          disabled={isFirst || isSubmitting}
          onClick={onBack}
          variant="text"
          sx={{ 
            borderRadius: "12px", 
            px: 3, 
            py: 0.8, 
            fontWeight: 600,
            color: "#64748B",
            "&:hover": { bgcolor: "#F1F5F9" }
          }}
        >
          الرجوع للسابقة
        </Button>

        <Button
          variant="contained"
          disabled={isSubmitting}
          onClick={isLast ? onSubmit : onNext}
          sx={{ 
            borderRadius: "12px", 
            px: 4, 
            py: 0.8, 
            fontWeight: 700,
            fontSize: "13px",
            boxShadow: "none",
            bgcolor: "#5E3E63",
            "&:hover": { bgcolor: "#4A314E" }
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : isLast ? (
            "حفظ وإضافة الدواء الخاص"
          ) : (
            "الخطوة التالية"
          )}
        </Button>
      </Paper>
    </Box>
  );
};