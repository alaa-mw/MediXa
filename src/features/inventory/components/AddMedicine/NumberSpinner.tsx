// features/inventory/components/NumberSpinner.tsx
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface NumberSpinnerProps {
  label: string;
  size?: "small" | "medium";
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
}

export const NumberSpinner: React.FC<NumberSpinnerProps> = ({ 
  label, size = "small", min = 0, max, value, onChange 
}) => {
  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (min !== undefined && value <= min) return;
    onChange(value - 1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569", textAlign: "right" }}>
        {label}
      </Typography>
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          backgroundColor: "#f1f5f9", 
          borderRadius: "14px", 
          p: size === "small" ? 0.4 : 0.8,
          border: "1px solid transparent",
          "&:focus-within": {
            border: "1px solid #0f172a",
            backgroundColor: "#ffffff",
          }
        }}
      >
        <IconButton 
          size="small" 
          onClick={handleIncrement}
          sx={{ color: "#0f172a", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", "&:hover": { backgroundColor: "#e2e8f0" } }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        
        <input 
          type="number" 
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            if (min !== undefined && val < min) onChange(min);
            else if (max !== undefined && val > max) onChange(max);
            else onChange(val);
          }}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            textAlign: "center",
            fontWeight: "700",
            color: "#0f172a",
            fontSize: size === "small" ? "14px" : "16px",
            outline: "none"
          }}
        />

        <IconButton 
          size="small" 
          onClick={handleDecrement}
          disabled={min !== undefined && value <= min}
          sx={{ color: "#0f172a", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", "&:hover": { backgroundColor: "#e2e8f0" }, "&.Mui-disabled": { backgroundColor: "#f1f5f9", color: "#cbd5e1" } }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};