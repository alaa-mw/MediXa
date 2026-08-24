import { Box, Typography, Chip } from "@mui/material";
import { getMatchStyle } from "../../utils/GetMatchStyle";
import type { PharmacyDrug } from "../../types/drug";

interface AlternativeDrugCardProps {
  drug: PharmacyDrug;
  onToggle: (drug: PharmacyDrug) => void;
  isSelected: boolean;
  isTarget?: boolean;
}

export const AlternativeDrugCard = ({
  drug,
  onToggle,
  isSelected,
  isTarget = false,
}: AlternativeDrugCardProps) => {
  const matchStyle =
    !isTarget && drug.matchType ? getMatchStyle(drug.matchType) : null;
  const isOutOfStock =
    !drug.stock?.isAvailable || drug.stock?.availableBaseQuantity <= 0;

  // 1. الألوان المنظمة
  const THEME_COLORS = {
    selectedBorder: "secondary.light", // لون التحديد (يطبق على البوردر)
    targetBg: "#f8fafc", // خلفية الدواء الهدف
    targetBorder: "#bfdbfe", // بوردر الدواء الهدف قبل التحديد
    selectedBg: "#f1f5f9", // خلفية الأدوية البديلة عند تحديدها
    defaultBg: "#ffffff", // الخلفية الافتراضية للبدائل
    outOfStockBg: "#f8fafc", // خلفية غير المتوفر
    defaultBorder: "#e2e8f0", // البوردر الافتراضي للبدائل
  };

  // 2. تحديد لون البوردر: الأولوية للتحديد أولاً، ثم للهدف، ثم للافتراضي
  const getBorderColor = () => {
    if (isOutOfStock) return THEME_COLORS.defaultBorder;
    if (isSelected) return THEME_COLORS.selectedBorder; // التحديد يغلب دائماً
    if (isTarget) return THEME_COLORS.targetBorder;
    return THEME_COLORS.defaultBorder;
  };

  // 3. تحديد لون الخلفية
  const getBgColor = () => {
    if (isOutOfStock) return THEME_COLORS.outOfStockBg;
    if (isTarget) return THEME_COLORS.targetBg;
    // if (isSelected) return THEME_COLORS.selectedBg;
    return THEME_COLORS.defaultBg;
  };

  const stockColor = isOutOfStock ? "#dc2626" : "#16a34a";

  // السماكة الآن تصبح 2px عند التحديد، سواء كان الدواء هدفاً أم لا
  const borderWidth = isSelected ? "2px" : "1px";

  return (
    <Box
      onClick={() => !isOutOfStock && onToggle(drug)}
      sx={{
        p: 2,
        mb: 1.5,
        border: `${borderWidth} solid`,
        borderColor: getBorderColor(),
        borderRadius: "16px",
        bgcolor: getBgColor(),
        cursor: isOutOfStock ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        opacity: isOutOfStock ? 0.65 : 1,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        "&:hover": {
          // الـ hover يظهر لون التحديد كإيحاء بأنه قابل للنقر (إذا لم يكن محدد مسبقاً)
          borderColor: isOutOfStock
            ? THEME_COLORS.defaultBorder
            : THEME_COLORS.selectedBorder,
          // نحافظ على الخلفية هادئة وثابتة عند الـ hover لتجنب الإزعاج البصري
          bgcolor: getBgColor(),
          transform: isOutOfStock ? "none" : "translateY(-2px)",
          boxShadow: isOutOfStock ? "none" : "0 4px 12px rgba(0,0,0,0.04)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.1rem",
            color: isOutOfStock ? "#94a3b8" : "#0f172a",
            lineHeight: 1.2,
          }}
        >
          {drug.tradeName}
        </Typography>
        {matchStyle && (
          <Chip
            label={matchStyle.label}
            size="small"
            sx={{
              bgcolor: isOutOfStock ? "#f1f5f9" : `${matchStyle.color}1A`,
              color: isOutOfStock ? "#94a3b8" : matchStyle.color,
              fontWeight: 700,
              fontSize: "0.75rem",
              height: "24px",
            }}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
        {drug.dosageForm && (
          <Typography
            variant="caption"
            sx={{
              color: isOutOfStock ? "#94a3b8" : "#475569",
              fontWeight: 700,
              display: "inline-block",
              bgcolor: isOutOfStock ? "transparent" : "#f2f5fb", // تغميق بسيط للـ badge ليتناسب مع الخلفية الفاتحة
              px: 1.2,
              py: 0.3,
              borderRadius: "6px",
              alignSelf: "flex-start",
            }}
          >
            {drug.dosageForm.dosageFormName}
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ color: isOutOfStock ? "#94a3b8" : "#64748b", lineHeight: 1.5 }}
        >
          {drug.ingredients
            ?.map((i) => `${i.ingredientName} ${i.strengthValue}${i.unit}`)
            .join(" + ")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1.5,
          borderTop: "1px dashed",
          borderColor: THEME_COLORS.defaultBorder,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: isOutOfStock ? "#94a3b8" : "#475569",
            }}
          >
            الكمية:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 800, color: stockColor, fontSize: "1.1rem" }}
          >
            {drug.stock?.availableFullBoxes || 0}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 400,
            color: isOutOfStock ? "#94a3b8" : "#0f172a",
            fontSize: "1.15rem",
          }}
        >
          {drug.consumerPrice}{" "}
          <Typography
            component="span"
            variant="caption"
            sx={{ fontWeight: 700, color: "#64748b" }}
          >
            ل.س
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
