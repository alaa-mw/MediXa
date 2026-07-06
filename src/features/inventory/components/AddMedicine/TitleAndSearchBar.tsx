import React from "react";
import { Box, Typography } from "@mui/material";
import { SearchBar } from "../SearchBar";

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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
          إستيراد الأدوية للمخزون
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          ابحث في قاعدة البيانات المركزية لتوسيع مستودع صيدليتك المحلي
        </Typography>
      </Box>

      <Box sx={{ mt: 3, width: "100%", maxWidth: "1200px" }}>
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="ابحث باسم الدواء أو امسح الباركود من هنا..."
          />
        </form>
      </Box>
    </Box>
  );
};
