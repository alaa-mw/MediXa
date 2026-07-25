import { Box, Switch, Typography } from "@mui/material";
import { MedicationOutlined } from "@mui/icons-material"; // أو أي أيقونة RX مخصصة لديك

interface RxToggleFieldProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const RxToggleField = ({
  label = "دواء يتطلب وصفة طبية (RX)",
  checked,
  onChange,
}: RxToggleFieldProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // لتوزيع النص والزر على أطراف السطر
        direction: "rtl",
        backgroundColor: "#f0fdf4", // خلفية خضراء ناعمة جداً مطابقة للصورة
        border: "1px solid #bbf7d0", // حد خارجي أخضر فاتح
        borderRadius: "14px", // حواف دائرية متناسقة مع حقولك السابقة
        padding: "9px 20px",
        width: "100%",
      }}
    >
      {/* القسم الأيمن: الأيقونة والنص الاسترشادي */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          variant="body1"
          sx={{
            color: "secondary.main",
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* القسم الأيسر: زر التبديل (Switch) مع كلمة نعم/لا */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: checked ? "secondary.main" : "#64748b",
            fontWeight: "bold",
            minWidth: "30px", // يمنع اهتزاز التصميم عند تغير الكلمة
            textAlign: "center",
          }}
        >
          {checked ? "نعم" : "لا"}
        </Typography>

        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color="secondary" // ليعطي اللون الأخضر عند التفعيل تلقائياً
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "secondary.main",
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default RxToggleField;
