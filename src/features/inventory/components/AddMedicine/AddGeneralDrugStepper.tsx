import React from "react";
import { Box, Button, Paper, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
    label: "التسعير والتخزين",
    subtitle: "الخطوة 1",
    caption: "تحديد أسعار التكلفة، المبيع، وموقع الرف",
    icon: <AttachMoneyIcon fontSize="small" />,
  },
  {
    label: "الدفعات والصلاحية",
    subtitle: "الخطوة 2",
    caption: "إدخال الكميات المستلمة وتواريخ انتهاء الصلاحية",
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

export const AddGeneralDrugStepper: React.FC<Props> = ({
  activeStep = 0,
  children,
  onNext,
  onBack,
  onSubmit,
  isSubmitting = false,
}) => {
  const isFirst = activeStep === 0;
  const isLast = activeStep === STEPS.length - 1;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
        py: 3,
      }}
    >
      {/* Top Progress Tracker */}
      <Box sx={{ maxWidth: "700px", width: "90%", mx: "auto", mb: 4, position: "relative" }}>
        {/* Track Line */}
        <Box
          sx={{
            position: "absolute",
            top: "28px",
            left: "25%",
            right: "25%",
            height: 2,
            bgcolor: "#E2E8F0",
            zIndex: 0,
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          {STEPS.map((step, idx) => {
            const isCompleted = activeStep > idx;
            const isActive = activeStep === idx;

            return (
              <Box key={idx} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "180px" }}>
                <Typography sx={{ fontSize: 12, color: "#64748B", mb: 0.5, fontWeight: 600 }}>
                  {step.subtitle}
                </Typography>

                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    bgcolor: isCompleted ? "#10B981" : isActive ? "primary.main" : "#FFFFFF",
                    border: !isCompleted && !isActive ? "2px solid #CBD5E1" : "none",
                    color: isCompleted || isActive ? "#FFFFFF" : "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isActive ? "0px 4px 14px rgba(37, 99, 235, 0.3)" : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {isCompleted ? <CheckCircleIcon sx={{ fontSize: 26 }} /> : step.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "#1E293B" : "#64748B",
                    mt: 1.2,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {step.label}
                </Typography>

                {isActive && (
                  <Typography sx={{ fontSize: 11, color: "#94A3B8", textAlign: "center", mt: 0.5 }}>
                    {step.caption}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, pb: 4 }}>
        {children}
      </Box>

      {/* Floating Bottom Navigation Bar */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: "800px",
          width: "90%",
          mx: "auto",
          position: "sticky",
          bottom: 20,
          p: 2,
          px: 3,
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFFFFF",
          borderRadius: 4,
          boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.05)",
          zIndex: 10,
        }}
      >
        <Button
          disabled={isFirst || isSubmitting}
          onClick={onBack}
          variant="outlined"
          sx={{
            borderRadius: 2.5,
            px: 3.5,
            py: 1,
            borderColor: "#CBD5E1",
            color: "#475569",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          الرجوع للخطوة السابقة
        </Button>

        <Button
          variant="contained"
          disabled={isSubmitting}
          onClick={isLast ? onSubmit : onNext}
          sx={{
            borderRadius: 2.5,
            px: 4,
            py: 1,
            fontWeight: 700,
            bgcolor: "primary.main",
            boxShadow: "0px 4px 12px rgba(37, 99, 235, 0.2)",
            textTransform: "none",
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : isLast ? (
            "حفظ وإضافة الدواء للصيدلية"
          ) : (
            "الخطوة التالية: إضافة الدفعات"
          )}
        </Button>
      </Paper>
    </Box>
  );
};