import React from "react";
import { Box, Typography } from "@mui/material";
import { SearchBar } from "../SearchBar";
import { useBarcodeScanner } from "../../../../shared/services/useBarcodeScanner";

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
  useBarcodeScanner({
    onScan: (scannedCode) => {
      console.log("تم تلقي الباركود من القارئ الإلكتروني:", scannedCode);

      // 1. تحديث قيمة حقل البحث بالبارود الممسوخ
      setSearchQuery(scannedCode);

      // 2. (اختياري) إذا كنت تريد إرسال النموذج تلقائياً بمجرد مسح الباركود
      // يمكنك استدعاء دالة البحث أو إرسال الـ Form هنا مباشرة
    },
  });

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
