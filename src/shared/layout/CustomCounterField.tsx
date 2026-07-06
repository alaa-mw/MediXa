// features/inventory/components/CustomCounterField.tsx
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CustomCounterFieldProps {
  value: number;
  onChange: (val: number) => void;
  label?: string ;
  min?: number;
  max?: number;
  step?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  height?: string;
}

export const CustomCounterField: React.FC<CustomCounterFieldProps> = ({
  value,
  onChange,
  label = undefined,
  min = 0,
  max = 999,
  step = 1,
  fullWidth = true,
  disabled = false,
  height = "56px",
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    }
  };

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "auto",
        position: "relative",
        direction: "rtl",
      }}
    >
      {/* Label */}
      {label  && (
        <Typography
          component="label"
          sx={{
            color: "#64748b",
            fontSize: "14px",
            fontWeight: 400,
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            pointerEvents: "none",
            transition: "all 0.2s ease-in-out",
            backgroundColor: "transparent",
            padding: "0 4px",
            ...(value !== 0 && {
              top: "4px",
              transform: "translateY(0) scale(0.75)",
              backgroundColor: "#ffffff",
              padding: "0 6px",
              right: "14px",
            }),
          }}
        >
          {label}
        </Typography>
      )}

      {/* Counter Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f5f9",
          borderRadius: "14px",
          transition: "all 0.2s ease-in-out",
          border: "1.5px solid transparent",
          height: height,
          position: "relative",
          "&:hover": {
            borderColor: "#cbd5e1",
          },
          "&:focus-within": {
            borderColor: "#0f766e",
          },
        }}
      >
        {/* Decrement Button */}
        <IconButton
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          sx={{
            borderRadius: "50%",
            color: "#64748b",
            padding: "8px",
            marginRight: "8px",
            "&:hover": {
              backgroundColor: "rgba(15, 118, 110, 0.08)",
              color: "#0f766e",
            },
            "&.Mui-disabled": {
              color: "#cbd5e1",
            },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        {/* Value Input */}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          style={{
            flex: 1,
            textAlign: "center",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "16px",
            fontWeight: 500,
            color: "#0f172a",
            padding: "16px 0",
            width: "100%",
            minWidth: "40px",
            fontFamily: "inherit",
          }}
        />

        {/* Increment Button */}
        <IconButton
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          sx={{
            borderRadius: "50%",
            color: "#64748b",
            padding: "8px",
            marginLeft: "8px",
            "&:hover": {
              backgroundColor: "rgba(15, 118, 110, 0.08)",
              color: "#0f766e",
            },
            "&.Mui-disabled": {
              color: "#cbd5e1",
            },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
