import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface Props {
  offerId: number;
  title: string;
  description: string;
  endsAt: string;
  color: string;
  isSelected: boolean;
  onSelectOffer: (offerId: number) => void;
}

export default function OfferBanner({
  offerId,
  title,
  description,
  endsAt,
  color,
  isSelected,
  onSelectOffer,
}: Props) {
  // دالة لمعالجة النقر على الكارد أو الأيقونة
  const handleAction = (e: React.MouseEvent) => {
    // لمنع انتشار النقر إذا تم النقر على الأيقونة تحديداً،
    // رغم أننا نريد النقر على الكارد بالكامل أن يفعل العرض.
    onSelectOffer(offerId);
  };

  return (
    <Card
      variant="outlined"
      onClick={handleAction} // الكارد بالكامل قابل للنقر
      sx={{
        bgcolor: isSelected ? `${color}.100` : `${color}.50`, // خلفية أغمق قليلاً عند الاختيار

        // تعديل الحدود بناءً على الاختيار
        borderColor: isSelected ? `${color}.main` : `${color}.200`, // لون غامق عند الاختيار وفاتح عند عدمه
        borderWidth: isSelected ? 2 : 1, // سمك أكبر عند الاختيار

        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: `${color}.main`, // إظهار اللون الغامق عند التمرير
          bgcolor: isSelected ? `${color}.100` : `${color}.100`, // تفتيح الخلفية قليلاً عند التمرير
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CardGiftcardIcon color={color as any} sx={{ fontSize: 22 }} />
              <Typography
                sx={{
                  fontWeight: 700,
                  color: `${color}.main`,
                  fontSize: "15px",
                }}
              >
                {title}
              </Typography>
            </Box>

            {/* الأيقونة الدائرية فقط للاختيار */}
            <IconButton
              size="small"
              color={color as any}
              // النقر على الأيقونة يقوم بنفس عمل النقر على الكارد
              onClick={(e) => {
                e.stopPropagation(); // منع النقر مزدوجاً (على الأيقونة ثم الكارد)
                onSelectOffer(offerId);
              }}
              sx={{ p: 0.5 }}
            >
              {isSelected ? (
                // أيقونة صح ممتلئة وغامقة عند الاختيار
                <CheckCircleIcon
                  sx={{ fontSize: 24, color: `${color}.main` }}
                />
              ) : (
                // أيقونة دائرية فارغة وفاتحة عند عدم الاختيار
                <RadioButtonUncheckedIcon
                  sx={{ fontSize: 24, color: `${color}.500` }}
                />
              )}
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "13px", lineHeight: 1.5 }}
          >
            {description}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "11px", fontWeight: 500 }}
          >
            ينتهي في {endsAt.slice(0, 10)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
