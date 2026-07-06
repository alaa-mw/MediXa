import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "ابحث عن الدواء أو امسح الباركود...",
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: 1.5 }}>
              <SearchIcon sx={{ color: "#757575" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ mr: 0.5 }}>
              <QrCodeScannerIcon sx={{ color: "#1e2524", cursor: "pointer" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px", // 🟢 تم زيادة الدوران هنا لشكل عصري (Pill Shape)
          paddingLeft: "16px", // إضافة حشو داخلي جانبي ليتناسق مع الحواف الدائرية
          paddingRight: "16px",
          backgroundColor: "#ffffff",
          "& fieldset": { borderColor: "#cbd5e1" },
          "&:hover fieldset": { borderColor: "#cbd5e1" },
          "&.Mui-focused fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  );
};
