import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { problems } from "../constants/problems";
import { sectionTitleSx } from "../constants/sectionStyles";

const ProblemsSection = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
        <Chip label="لماذا MediXa AI؟" />
        <Typography
          variant="h2"
          sx={{
            ...sectionTitleSx,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
          }}
        >
          لماذا تحتاج الصيدليات إلى MediXa AI؟
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 760 }}
        >
          الصيدلية الحديثة تواجه تحديات يومية تؤثر على الكفاءة والسلامة
          والربحية. MediXa AI صُمم للتعامل معها مباشرة.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {problems.map((item) => (
          <Card
            key={item.title}
            sx={{
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Box sx={{ mb: 2, display: "flex" }}>
                <item.icon color="primary" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography color="text.secondary">{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ProblemsSection;
