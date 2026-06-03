import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { aiBenefits } from "../constants/ai-assistant";
import { sectionTitleSx } from "../constants/sectionStyles";

const AIAssistantSection = () => {
  return (
    <Container id="ai-assistant" sx={{ py: 10 }}>
      <Stack spacing={1} sx={{ alignItems: "center", mb: 5 }}>
        <Chip label="المساعد الذكي" color="secondary" />
        <Typography
          variant="h2"
          sx={{
            ...sectionTitleSx,
            fontSize: { xs: "1.7rem", md: "2.2rem" },
          }}
        >
          مساعد دوائي ذكي داخل الصيدلية
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 760 }}
        >
          اسأل عن دواء، مادة فعالة، بدائل، أو معلومات دوائية، وسيقدم MediXa AI
          إجابة دقيقة وسريعة.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.2fr 1fr" },
          gap: 3,
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              {aiBenefits.map((benefit) => (
                <Stack
                  key={benefit.title}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Box sx={{ mt: 0.3 }}>
                    <benefit.icon color="primary" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Stack spacing={1.8}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  المساعد الدوائي
                </Typography>
                <Chip label="متصل" color="success" size="small" />
              </Stack>
              <Box sx={{ bgcolor: "#F1F5F9", p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2">ما البدائل لهذا الدواء؟</Typography>
              </Box>
              <Box sx={{ bgcolor: "#E0F2FE", p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2">
                  سأعرض لك البدائل حسب المادة الفعالة.
                </Typography>
              </Box>
              <Box sx={{ bgcolor: "#F1F5F9", p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2">
                  هل يمكن صرف هذا الدواء للمرضى المزمنين؟
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AIAssistantSection;
