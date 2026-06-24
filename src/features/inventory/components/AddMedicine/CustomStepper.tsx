// features/inventory/components/CustomStepper.tsx
import React from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

const steps = ["بيانات الدواء الأساسية", "ضبط المخزون والدفعات"];

interface CustomStepperProps {
  activeStep: number;
}

export const CustomStepper: React.FC<CustomStepperProps> = ({ activeStep }) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box sx={backgroundLineStyle} />
      <Box sx={progressLineStyle(activeStep)} />

      <Stepper activeStep={activeStep} alternativeLabel connector={null}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              slots={{
                stepIcon: () => (
                  <CustomIcon index={index} activeStep={activeStep} />
                ),
              }}
            >
              <Typography sx={labelStyle(activeStep === index)}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const backgroundLineStyle = {
  position: "absolute",
  top: 20,
  left: "25%",
  right: "25%",
  height: 4,
  backgroundColor: "#e2e8f0",
  borderRadius: 10,
  zIndex: 0,
};

const progressLineStyle = (activeStep: number) => ({
  position: "absolute",
  top: 20,
  right: "25%",                             
  left: activeStep === 1 ? "25%" : "75%",   
  height: 4,
  borderRadius: 10,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", 
  background: "linear-gradient(270deg, #14b8a6, #0f766e)", 
  zIndex: 1,
});

const labelStyle = (isActive: boolean) => ({
  fontWeight: 700,
  color: isActive ? "#0f172a" : "#64748b",
  mt: 1,
});

const CustomIcon = ({
  index,
  activeStep,
}: {
  index: number;
  activeStep: number;
}) => (
  <Box
    sx={{
      width: 42,
      height: 42,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 700,
      background:
        activeStep >= index
          ? "linear-gradient(135deg,#14b8a6,#0f766e)"
          : "#cbd5e1",
      zIndex: 2,
      position: "relative",
      boxShadow: activeStep === index ? "0 0 0 4px rgba(20, 184, 166, 0.2)" : "none",
      transition: "all 0.3s ease",
    }}
  >
    {index + 1}
  </Box>
);