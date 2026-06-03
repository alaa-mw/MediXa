import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { sectionTitleSx } from "../constants/sectionStyles";
import { featuresData } from "../constants/features";

const FeaturesSection = () => {
  return (
    <Box id="features" sx={{ bgcolor: "#FFFFFF", py: 10 }}>
      <Container>
        <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
          <Chip label="الميزات" color="primary" variant="outlined" />
          <Typography
            variant="h2"
            sx={{
              ...sectionTitleSx,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            كل ما تحتاجه الصيدلية في منصة واحدة
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", maxWidth: 760 }}
          >
            من إدارة المخزون إلى المساعد الدوائي الذكي. كل الأدوات في متناول
            يدك.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {featuresData.map((feature) => (
            <Card
              key={feature.title}
              sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                boxShadow: "none",
                height: "100%",
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2, display: "flex" }}>
                  <feature.icon color="primary" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
