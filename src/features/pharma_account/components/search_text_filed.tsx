import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface SearchTextFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTextField = ({
  placeholder,
  value,
  onChange,
}: SearchTextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined" //
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#9e9e9e" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        direction: "rtl",
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px", // الحواف المنحنية الجميلة المطابقة لتصميمك
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.15)",
          },
          "&:hover fieldset": {
            borderColor: "#1d6969",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1d6969",
          },
        },
        "& .MuiInputBase-input": {
          fontSize: "14px",
          color: "#2E3B5E",
          padding: "10px 8px", // ضبط الحشوة الداخلية لتظهر الأيقونة والنص متناسقين
        },
      }}
    />
  );
};

export default SearchTextField;
