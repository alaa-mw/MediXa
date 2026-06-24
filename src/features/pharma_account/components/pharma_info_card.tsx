import { Box, Card, Grid, Typography, Button, Stack } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import theme from "../../../shared/styles/mainTheme";

const PharmaInfoCard = () => {
  return (
    <Card sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          bgcolor: "#2E3B5E",
          color: "white",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">تفاصيل الصيدلية</Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          اسم الصيدلية : صيدلية النور
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon fontSize="small" />
            alnoor@pharmacy.com
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneOutlinedIcon fontSize="small" />
            0978695779
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnOutlinedIcon fontSize="small" />
            ريف دمشق
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            مالك الصيدلية : محمد أحمد
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon fontSize="small" />
            alnoor@pharmacy.com
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneOutlinedIcon fontSize="small" />
            0978695779
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            تاريخ الاشتراك (سنوي)
          </Typography>

          <Stack sx={{ mt: 1 }}>
            <Typography>بداية : 2026-04-01</Typography>
            <Typography>نهاية : 2027-04-01</Typography>
          </Stack>
        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button fullWidth variant="outlined">
            إرسال إشعار
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#d8c0e7",
              color: "#000",
            }}
          >
            تجديد الاشتراك
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PharmaInfoCard;
