import { Box, Typography, Button } from "@mui/material";
import { PlusOne } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // 1. استيراد useNavigate

type ManualAddSectionProps = {
  onManualAdd?: () => void; // تم جعله اختياري في حال عدم الحاجة لتمريره من الأب
};

const ManualAddSection = ({ onManualAdd }: ManualAddSectionProps) => {
  const navigate = useNavigate(); // 2. تهيئة الـ navigate

  const handleManualAdd = () => {
    // التوجيه المباشر لصفحة إضافة الدواء الخاص
    navigate("/pharmacy/inventory/add-private");

    // استدعاء الـ callback إذا كان ممرراً
    if (onManualAdd) {
      onManualAdd();
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #D3CAD6",
        borderRadius: "20px",
        p: 1,
        bgcolor: "#FAF8FB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <PlusOne />
        <Box>
          <Typography
            sx={{ fontWeight: 800, fontSize: "14px", color: "#2E1A30" }}
          >
            لم تجد الدواء في قاعدة البيانات؟
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={handleManualAdd}
        sx={{
          bgcolor: "#5E3E63",
          color: "#FFFFFF",
          borderRadius: "24px",
          px: 3,
          py: 1.2,
          fontWeight: 800,
          fontSize: "12px",
          boxShadow: "0 6px 16px rgba(94, 62, 99, 0.15)",
          textTransform: "none",
          whiteSpace: "nowrap",
          alignSelf: { xs: "stretch", md: "auto" },
          display: "flex",
          gap: 1,
          "&:hover": {
            bgcolor: "#4C3150",
            boxShadow: "0 10px 20px rgba(94, 62, 99, 0.25)",
          },
        }}
      >
        إضافة دواء جديد يدوياً
      </Button>
    </Box>
  );
};

export default ManualAddSection;