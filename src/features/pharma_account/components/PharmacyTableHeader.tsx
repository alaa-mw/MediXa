import { Box } from "@mui/material";

const PharmacyTableHeader = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr 4fr",
        p: 1.2,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 700,
        fontSize: 15,
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        اسم الصيدلية
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>المالك</Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>الحالة</Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        تاريخ الاشتراك
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>الاشتراك</Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>الإجراءات</Box>
    </Box>
  );
};

export default PharmacyTableHeader;
