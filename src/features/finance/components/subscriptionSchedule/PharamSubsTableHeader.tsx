import { Box } from "@mui/material";

export const GRID_COLUMNS = "0.6fr 1.5fr 1fr 1.5fr 1.8fr 1.5fr 2fr 1.8fr";

const PharamSubsTableHeader = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: GRID_COLUMNS,
        p: 1.5,
        bgcolor: "#e6e6e6",
        borderBottom: "1px solid #E2E8F0",
        fontWeight: 700,
        fontSize: 14,
        alignItems: "center",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <Box>#</Box>
      <Box>خطة الاشتراك</Box>
      <Box>المدة</Box>
      <Box>حالة الاشتراك</Box>
      <Box>فترة الاشتراك</Box>
      <Box>التكلفة</Box>
      <Box>العرض المطبق</Box>
      <Box>التكلفة النهائية</Box>
    </Box>
  );
};

export default PharamSubsTableHeader;
