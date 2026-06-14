import { Button, Card, Container, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import theme from "../../../shared/styles/mainTheme";

const CtaSection = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Card
        sx={{
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          textAlign: "center",
          background: `${theme.palette.gradient.primary}`,
          color: "#fff",
        }}
      >
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <AutoAwesomeIcon />
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1.7rem", md: "2.4rem" } }}
          >
            ابدأ اليوم واجعل إدارة صيدليتك أكثر ذكاءً
          </Typography>
          <Typography sx={{ opacity: 0.95 }}>
            حوّل العمليات اليومية إلى نظام منظم، سريع، ومدعوم بالذكاء الاصطناعي.
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              href="#pricing"
              sx={{
                bgcolor: "#fff",
                color: "text.primary",
                "&:hover": { bgcolor: "#E2E8F0" },
              }}
            >
              اطلب الاشتراك الآن
            </Button>
            <Button
              variant="outlined"
              href="#features"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              استعرض الميزات
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

export default CtaSection;
