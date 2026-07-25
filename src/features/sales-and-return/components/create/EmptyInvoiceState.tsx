import { Grid, Paper, Typography } from "@mui/material";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";

export const EmptyInvoiceState = () => (
  <Grid size={{ xs: 12, lg: 8 }}>
    <Paper
      sx={{
        p: 6,
        borderRadius: 4,
        border: "2px dashed #EAF2F6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#FAFCFD",
        minHeight: "360px",
      }}
    >
      <LocalPharmacyOutlinedIcon
        sx={{ fontSize: 64, color: "#94A3B8", mb: 2 }}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, color: "#1E293B", mb: 0.5 }}
      >
        سلة الفاتورة فارغة حالياً
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#64748B", textAlign: "center", maxWidth: 360 }}
      >
        ابحث عن الأدوية واضغط على "إضافة" لإدراج الأدوية والبدء بعملية البيع.
      </Typography>
    </Paper>
  </Grid>
);
