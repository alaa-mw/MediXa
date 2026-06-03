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
import { heroStats } from "../constants/hero";

const HeroSection = () => {
  return (
    <Box
      id="hero"
      sx={{
        background:
          "radial-gradient(circle at top, #E6F4FB 0%, #F4F8FB 45%, #F4F8FB 100%)",
        pt: { xs: 8, md: 10 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ alignItems: "center", textAlign: "center" }}>
          <Chip
            label="منظومة إدارة الصيدلية الذكية"
            color="primary"
            variant="outlined"
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2rem", md: "3.2rem" }, maxWidth: 900 }}
          >
            منظومة ذكية تجعل إدارة الصيدلية أسرع، أدق، وأكثر ربحية
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            MediXa AI يجمع بين إدارة المخزون، الفواتير، التنبيهات، التقارير،
            والمساعد الدوائي الذكي في منصة واحدة مصممة للصيدليات الحديثة.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" href="#pricing">
              اشترك الآن
            </Button>
            <Button variant="outlined" size="large" href="#features">
              شاهد الميزات
            </Button>
          </Stack>

          <Box
            sx={{
              width: "100%",
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            }}
          >
            {heroStats.map((stat) => (
              <Card
                key={stat.label}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #E2E8F0",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 800 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
