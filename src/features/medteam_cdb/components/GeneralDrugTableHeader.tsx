import { Box } from "@mui/material";

const GeneralDrugTableHeader = () => {
  return (
    <Box
      sx={{
        display: "grid",
        // تم تحديثه ليكون 7 أعمدة متناسقة تناسب حجم البيانات واحتوائها
        gridTemplateColumns: "2.5fr 3fr 2fr 2.5fr 1.5fr 1.5fr 1fr",
        p: 1.5,
        bgcolor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 700,
        fontSize: 15,
        alignItems: "center",
        textAlign: "center", // توحيد المحاذاة الافتراضية بالمنتصف
      }}
    >
      {/* الاسم التجاري يفضل أن يبدأ من اليمين (مرحل حسب الـ RTL) */}
      <Box sx={{ textAlign: "right", pr: 1 }}>الاسم التجاري</Box>
      <Box>المواد الفعالة</Box>
      <Box>التركيب والشكل</Box>
      <Box>التصنيف الدوائي</Box>
      <Box>سعر النت</Box>
      <Box>السعر للمستهلك</Box>
      <Box>isRX ?</Box>
    </Box>
  );
};

export default GeneralDrugTableHeader;
