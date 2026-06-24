import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField = ({
  label,
  value,
  disabled,
  onChange,
}: CustomTextFieldProps) => {
  return (
    <TextField
      label={label}
      value={value}
      disabled={disabled}
      onChange={onChange}
      fullWidth
      sx={{
        direction: "rtl",
        // 🟢 [أولاً] تنسيق الخطوط والألوان في الحالة العادية (مفتوح للكتابة)
        "& .MuiInputLabel-root": {
          color: "#9e9e9e",
          fontSize: "14px",
          right: 25,
          left: "auto",
          transformOrigin: "top right",
          "&.Mui-focused": {
            color: "#536085",
          },
        },
        "& .MuiInputBase-input": {
          fontSize: "14px",
          color: "#2E3B5E",
          padding: "12px 14px",
          textAlign: "right",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
          },
          "& legend": {
            textAlign: "right",
          },
          "&:hover fieldset": {
            borderColor: "#1d6969",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1d6969",
          },
        },

        // 🔵 [ثانياً] تنسيق الحقول عندما تكون مغلقة (Disabled) مثل كارد المالك
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "#2E3B5E",
          color: "#2E3B5E",
          fontWeight: 500,
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: "#536085",
        },
        "& .MuiInputLabel-shrink": {
          transform: "translate(-4px, -8px) scale(0.75)", // ضبط الإزاحة لتناسب اليمين تماماً
          right: 16,
          left: "auto",
        },
        "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "rgba(0, 0, 0, 0.12)",
          },
        backgroundColor: disabled ? "#f9fbfd" : "transparent",
        borderRadius: "8px",
      }}
    />
  );
};

export default CustomTextField;
