import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const PurchaseInvoiceStepper = ({ activeStep = 1 }: { activeStep: number }) => {
  const steps = [
    { label: "معلومات الفاتورة", subtitle: "الخطوة 1", icon: <PersonIcon /> },
    {
      label: "إضافة الأدوية والدفعات",
      subtitle: "الخطوة 2",
      icon: <Inventory2OutlinedIcon fontSize="small" />,
    },
    {
      label: "التأكيد النهائي",
      subtitle: "الخطوة 3",
      icon: <AssignmentTurnedInIcon />,
    },
  ];
  return (
    <Box sx={{ width: "80%", mx: "auto", mb: 6, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          height: 2,
          bgcolor: "#E2E8F0",
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        {steps.map((step, idx) => {
          const isCompleted = activeStep > idx;
          const isActive = activeStep === idx;
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 12, color: "#64748B", mb: 0.5 }}>
                {step.subtitle}
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: isCompleted
                    ? "secondary.light"
                    : isActive
                      ? idx === 2
                        ? "#5C4066"
                        : "#2D3A4D"
                      : "#FFF",
                  border:
                    !isCompleted && !isActive ? "2px solid #E2E8F0" : "none",
                  color: isCompleted || isActive ? "#FFF" : "#A0AEC0",
                  display: "flex",
                  alignItems: "center",
                  justifyValue: "center",
                  justifyContent: "center",
                }}
              >
                {isCompleted ? <CheckCircleIcon /> : step.icon}
              </Box>
              <Typography
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#2D3A4D" : "#64748B",
                  mt: 1,
                  fontSize: 14,
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PurchaseInvoiceStepper;
