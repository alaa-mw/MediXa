import { Box } from "@mui/material";
import React from "react";

const CreateReturnInvoiceHeder = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr 2fr 3fr 3fr",
        p: 1.2,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 600,
        fontSize: 14,
        alignItems: "center",
        direction: "rtl", // متوافق مع واجهة التطبيق العربية
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}></Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        اسم الدواء
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الوحدة</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>السعر الفردي</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الكمية </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الإجمالي</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        السعر بعد الخصم
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الدفعة</Box>
    </Box>
  );
};

export default CreateReturnInvoiceHeder;
