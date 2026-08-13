import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface OwnerPricingHeroProps {
  selectedPlanName?: string;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export default function OwnerPricingHero({
  selectedPlanName,
  isSubmitting,
  onConfirm,
}: OwnerPricingHeroProps) {
  return (
    <Stack
      sx={{
        width: "100%",
        mb: 6,
        mt: 2,
        direction: "rtl",
      }}
    >
      {selectedPlanName ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
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

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", gap: 2 }}
          >
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
                py: 1,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              {isSubmitting ? "جاري التجديد..." : "تأكيد تجديد الاشتراك"}
            </Button>
          </Stack>
        </Box>
      ) : (
        <Stack sx={{ alignItems: "center", textAlign: "center" }} spacing={2}>
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
