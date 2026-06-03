import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../constants/faq";
import { sectionTitleSx } from "../constants/sectionStyles";

const FaqSection = () => {
  return (
    <Box id="faq" sx={{ bgcolor: "#FFFFFF", py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={1} sx={{ alignItems: "center", mb: 4 }}>
          <Chip label="الأسئلة الشائعة" />
          <Typography
            variant="h2"
            sx={{
              ...sectionTitleSx,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            إجابات على أكثر الأسئلة شيوعاً
          </Typography>
        </Stack>

        {faqs.map((item) => (
          <Accordion
            key={item.q}
            sx={{
              mb: 1.5,
              borderRadius: "10px !important",
              border: "1px solid #E2E8F0",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FaqSection;
