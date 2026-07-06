import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { pricingData } from "../constants/pricing";
import { sectionTitleSx } from "../constants/sectionStyles";
import theme from "../../../shared/styles/mainTheme";

const PricingSection = () => {
  return (
    <Box id="pricing" sx={{ bgcolor: "#FFFFFF", py: 10 }}>
      <Container>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
          <Chip label="الاشتراكات" />
          <Typography
            variant="h2"
            sx={{
              ...sectionTitleSx,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            خطط اشتراك تناسب حجم صيدليتك
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", maxWidth: 760 }}
          >
            ابدأ بالخطة المناسبة واترقَّ متى تريد. جميع الخطط تشمل التحديثات
            والدعم الفني.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2.5,
          }}
        >
          {pricingData.map((tier, index) => (
            <Card
              key={index}
              sx={{
                position: "relative",
                borderRadius: 3,
                border: tier.isPopular
                  ? `2px solid ${theme.palette.primary.main}`
                  : "1px solid #E2E8F0",
                boxShadow: tier.isPopular
                  ? `0 10px 24px ${theme.palette.primary.main}`
                  : "none",
              }}
            >
              {tier.isPopular && (
                <Chip
                  label="الأكثر طلباً"
                  color="primary"
                  size="small"
                  icon={<TrendingUpIcon />}
                  sx={{ position: "absolute", top: 12, right: 12 }}
                />
              )}
              <CardContent sx={{ p: 3 }}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mb: 0.5 }}
                >
                  {tier.englishLabel}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {tier.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {tier.target}
                </Typography>

                <Stack spacing={1} sx={{ mb: 3 }}>
                  {tier.features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CheckCircleIcon color="primary" sx={{ fontSize: 18 }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant={tier.isPopular ? "contained" : "outlined"}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Typography color="text.secondary" sx={{ textAlign: "center", mt: 3 }}>
          جميع الخطط تشمل الوصول الكامل للنظام وتحديثات مستمرة. لا عقود طويلة
          الأمد.
        </Typography>
      </Container>
    </Box>
  );
};

export default PricingSection;
