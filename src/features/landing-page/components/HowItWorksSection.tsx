import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { launchSteps } from "../constants/how-it-works";
import { sectionTitleSx } from "../constants/sectionStyles";

const HowItWorksSection = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
        <Chip label="كيف يعمل" color="primary" variant="outlined" />
        <Typography
          variant="h2"
          sx={{
            ...sectionTitleSx,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
          }}
        >
          ابدأ تشغيل صيدليتك خلال خطوات بسيطة
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {launchSteps.map((step) => (
          <Card
            key={step[1]}
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Chip
                label={step[0]}
                color="primary"
                size="small"
                sx={{ mb: 1.5 }}
              />
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{step[1]}</Typography>
              <Typography variant="body2" color="text.secondary">
                {step[2]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default HowItWorksSection;
