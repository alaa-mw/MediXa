// features/inventory/components/CustomTextField.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import textfieldStyle from "../constants/textFieldStyle";

interface CustomTextFieldProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  fullWidth?: boolean;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  fullWidth = true,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={textfieldStyle}
    />
  );
};
