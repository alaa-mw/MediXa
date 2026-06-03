import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  footerCompanyLinks,
  footerProductLinks,
  footerSupportLinks,
  type FooterLink,
} from "../constants/footer";

const renderFooterLink = (item: FooterLink) => {
  if (!item.href) {
    return <Typography key={item.label}>{item.label}</Typography>;
  }

  return (
    <Typography
      key={item.label}
      component="a"
      href={item.href}
      sx={{ color: "inherit", textDecoration: "none" }}
    >
      {item.label}
    </Typography>
  );
};

const FooterSection = () => {
  return (
    <Box sx={{ bgcolor: "#0F172A", color: "#CBD5E1", pt: 6, pb: 3 }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr 1fr 1fr" },
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 1.5 }}
            >
              <LocalPharmacyIcon sx={{ color: "#38BDF8" }} />
              <Typography color="#E2E8F0" sx={{ fontWeight: 800 }}>
                MediXa AI
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ maxWidth: 360, mb: 1.5 }}>
              منظومة إدارة الصيدلية الذكية. تجمع المخزون، الفواتير، التقارير،
              والمساعد الدوائي في منصة واحدة.
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">info@medixa.ai</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+963 954</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography color="#E2E8F0" sx={{ fontWeight: 700, mb: 1.5 }}>
              المنتج
            </Typography>
            <Stack spacing={1}>
              {footerProductLinks.map(renderFooterLink)}
            </Stack>
          </Box>

          <Box>
            <Typography color="#E2E8F0" sx={{ fontWeight: 700, mb: 1.5 }}>
              الشركة
            </Typography>
            <Stack spacing={1}>
              {footerCompanyLinks.map(renderFooterLink)}
            </Stack>
          </Box>

          <Box>
            <Typography color="#E2E8F0" sx={{ fontWeight: 700, mb: 1.5 }}>
              الدعم
            </Typography>
            <Stack spacing={1}>
              {footerSupportLinks.map(renderFooterLink)}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(148,163,184,0.3)" }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography variant="body2">
            © 2026 MediXa AI. جميع الحقوق محفوظة.
          </Typography>
          <Chip size="small" color="success" label="الخدمة تعمل بشكل طبيعي" />
        </Stack>
      </Container>
    </Box>
  );
};

export default FooterSection;
