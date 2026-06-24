// features/inventory/components/PriceBox.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface PriceBoxProps {
  label: string;
  price: number;
  isConsumer?: boolean;
}

export const PriceBox: React.FC<PriceBoxProps> = ({ label, price, isConsumer = false }) => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: isConsumer ? "#f0faf2" : "#f8f9fa",
        p: 1.5,
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <Typography 
        variant="caption" 
        color={isConsumer ? "#2e7d32" : "#7a868f"} 
        sx={{ display: "block", mb: 0.5 }}
      >
        {label}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ fontWeight: "bold", color: isConsumer ? "#2e7d32" : "#1e2524" }}
      >
        {price.toFixed(2)}
      </Typography>
    </Box>
  );
};