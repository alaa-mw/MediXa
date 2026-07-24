import { Box, Typography } from "@mui/material";

interface Props {
  discount: number;
  color?: string;
  lightColor: string;
}

export default function DiscountCorner({
  discount,
  color = "#2E7D32",
  lightColor,
}: Props) {
  const isMuiColor = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ].includes(color);

  // تحديد اللون النصي ولون الخلفية
  const textColor = isMuiColor ? `${color}.main` : color;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 90,
        height: 90,
        pointerEvents: "none",
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
        backgroundColor: lightColor || "#EBF7EE",
      }}
    >
      {/* حاوية النصوص مع إزاحة مدروسة ومريحة داخل زاوية المثلث */}
      <Box
        sx={{
          position: "absolute",
          top: 11,
          left: 11,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          lineHeight: 1,
        }}
      >
        {/* كلمة "خصم" */}
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: textColor, // تم إرجاع اللون للون الداكن الأصلي ليتناسق مع الخلفية الفاتحة
            fontSize: "0.75rem",
            lineHeight: 1.1,
            opacity: 0.9,
          }}
        >
          خصم
        </Typography>

        {/* النسبة المئوية */}
        <Typography
          sx={{
            fontWeight: 800,
            color: textColor,
            fontSize: "1.1rem",
            lineHeight: 1,
            mt: 0.2,
          }}
        >
          {discount}%
        </Typography>
      </Box>
    </Box>
  );
}
