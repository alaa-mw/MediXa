import {
  TextField,
  type TextFieldProps,
  type Theme,
  type SxProps,
} from "@mui/material";
import textfieldStyle from "../../../shared/constants/textFieldStyle";

const FormTextField = ({ sx, ...props }: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      {...props}
      // 🛠️ دمج الستايل المشترك مع التعديلات المخصصة لضبط الـ Label في المنتصف
      sx={
        [
          ...(Array.isArray(textfieldStyle)
            ? textfieldStyle
            : [textfieldStyle]),
          {
            "& .MuiInputLabel-outlined": {
              // 1. توسيط الـ Label عمودياً تماماً داخل الحقل الصغير (size="small")
              transform: "translate(0, 10px) scale(1) !important",

              // 2. إعطاؤه مسافة أمان (Padding) من الأسفل لمنع الالتصاق
              pb: "4px",

              // التأكد من الحفاظ على التموضع الأيمن في بيئة الـ RTL
              right: "14px !important",
              left: "auto !important",

              // 3. الحفاظ على شكل الـ Label الأصلي عندما ينكمش (Shrink) عند الكتابة
              "&.MuiInputLabel-shrink": {
                transform: "translate(0, -6px) scale(0.75) !important",
              },
            },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    />
  );
};

export default FormTextField;
