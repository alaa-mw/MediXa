import { Box } from "@mui/material";
import React from "react";
export const RETURN_INVOICE_COLUMN = "0.7fr 2fr 2fr 1fr 2fr 2fr 3fr 1fr 2fr";
const ReturnInvoiceTableHeader = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: RETURN_INVOICE_COLUMN,
        p: 1.2,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 600,
        fontSize: 14,
        alignItems: "center",
        direction: "rtl", // متوافق مع واجهة التطبيق العربية
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>#</Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        اسم الدواء
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الوحدة</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الكمية</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>سعر المفرد</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        السعر الإجمالي
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>سبب الإرجاع</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>reStock</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        الدفعات المرجعية
      </Box>
    </Box>
  );
};

export default ReturnInvoiceTableHeader;
