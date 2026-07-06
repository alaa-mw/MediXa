import { LocalPharmacy } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

interface Props {
  total: number;
}

export default function CdbHeaderAndInfoCard({ total }: Props) {
  return (
    <Grid container sx={{ flexDirection: "row", alignItems: "center", mr: 3 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#0F172A" }}
          >
            إدارة الصيدليات
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            إدارة الصيدليات في النظام وتتبع حالتها وحالة الاشتراك
          </Typography>
        </Box>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            px: 3,
            bgcolor: "#ffffff",
            borderRadius: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.03)", // ظل خفيف جداً وناعم
            borderRight: "4px solid #0f766e", // خط زيتي أنيق على اليمين يبين بداية الحاوية برونق خاص
            direction: "rtl",
            mb: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "#475569", fontWeight: 600 }}
          >
            قاعدة البيانات المركزية تحتوي على:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f766e" }}>
              2,500
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#64748b", fontWeight: 600 }}
            >
              صنف دواء
            </Typography>
          </Box>
        </Box>
      </Grid> */}
    </Grid>
  );
}
