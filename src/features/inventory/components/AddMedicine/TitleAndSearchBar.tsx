// features/inventory/components/AddMedicineSearchBar.tsx
import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

interface AddMedicineSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddMedicineSearchBar: React.FC<AddMedicineSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
          إستيراد الأدوية للمخزون
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          ابحث في قاعدة البيانات المركزية لتوسيع مستودع صيدليتك المحلي
        </Typography>
      </Box>

      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: "800px" }}>
        <TextField
          fullWidth
          placeholder="ابحث باسم الدواء أو امسح الباركود..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <QrCodeScannerIcon sx={{ color: "#94a3b8", cursor: "pointer" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "26px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
              px: 2,
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#cbd5e1" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
        />
      </form>
    </Box>
  );
};