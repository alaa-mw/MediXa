import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { socialProofStats, testimonials } from "../constants/testimonials";
import { sectionTitleSx } from "../constants/sectionStyles";

const TestimonialsSection = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
        <Chip label="آراء العملاء" color="primary" variant="outlined" />
        <Typography
          variant="h2"
          sx={{
            ...sectionTitleSx,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
          }}
        >
          ماذا يقول مستخدمو MediXa AI
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2.5,
        }}
      >
        {testimonials.map((quote) => (
          <Card
            key={quote}
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography color="text.secondary">"{quote}"</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {socialProofStats.map((item) => (
          <Card
            key={item[1]}
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
                {item[0]}
              </Typography>
              <Typography color="text.secondary">{item[1]}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TestimonialsSection;
