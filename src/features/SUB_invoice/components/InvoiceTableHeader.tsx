import { Box } from "@mui/material";

const InvoiceTableHeader = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 2fr 2fr 2fr 2fr 3fr 3fr 3fr",
        p: 1.2,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 700,
        fontSize: 14,
        alignItems: "center",
        direction: "rtl", // متوافق مع واجهة التطبيق العربية
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>#</Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>الباركود</Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        اسم الدواء
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الوحدة</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>الكمية</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>سعر المفرد</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        النسبة المضافة{" "}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        السعر الإجمالي
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        الدفعات المرجعية
      </Box>
    </Box>
  );
};

export default InvoiceTableHeader;
