import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface PricingHeroProps {
  selectedPlanName?: string;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export default function PricingHero({
  selectedPlanName,
  isSubmitting,
  onConfirm,
}: PricingHeroProps) {
  return (
    <Stack
      sx={{
        width: "100%",
        mb: 6,
        mt: 2,
        direction: "rtl",
      }}
    >
      {/* إذا تم اختيار خطة، نعرض تفاصيل الاختيار وزر التأكيد في سطر واحد (العنوان يميناً والزر يساراً) */}
      {selectedPlanName ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "primary.50",
            p: 3,
            borderRadius: "16px",
            border: "1px dashed",
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            الخطة المختارة للتجديد:{" "}
            <Typography
              component="span"
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {selectedPlanName}
            </Typography>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onConfirm}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CheckIcon />
              )
            }
            sx={{
              borderRadius: "10px",
              px: 4,
              py: 1.2,
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {isSubmitting ? "جاري التجديد..." : "تأكيد تجديد الاشتراك"}
          </Button>
        </Box>
      ) : (
        /* العرض الافتراضي في حال لم يتم اختيار أي خطة بعد */
        <Stack sx={{ alignItems: "center", textAlign: "center", spacing: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            اختر الخطة المناسبة لصيدليتك
          </Typography>
          <Typography sx={{ maxWidth: 800, color: "text.secondary" }}>
            خطط مرنة تناسب جميع أحجام الصيدليات مع أدوات ذكية تدعم نمو عملك.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
