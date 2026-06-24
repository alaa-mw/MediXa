import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function InvoiceDetailsForm({ onNext }: { onNext: () => void }) {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#2D3A4D", mb: 1 }}
        >
          ادخال معلومات الفاتورة
        </Typography>
        <Typography sx={{ color: "#64748B" }}>
          يرجى إدخال بيانات المورد و تفاصيل الفاتورة الأساسية للمتابعة
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          mb: 3,
          border: "1px solid #EAF2F6",
        }}
      >
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12 }}>
            <Typography
              sx={{ fontWeight: 700, mb: 1, fontSize: 14, color: "#2D3A4D" }}
            >
              اسم المورد
            </Typography>
            <TextField
              fullWidth
              placeholder="ابحث عن مورد مسجل أو أدخل اسماً جديداً..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StorefrontIcon sx={{ color: "#A0AEC0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sx={{ xs: 12 }}>
            <Typography
              sx={{ fontWeight: 700, mb: 1, fontSize: 14, color: "#2D3A4D" }}
            >
              تاريخ الشراء
            </Typography>
            <TextField
              fullWidth
              defaultValue="05/20/2024"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayOutlinedIcon sx={{ color: "#A0AEC0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sx={{ xs: 12 }}>
            <Typography
              sx={{ fontWeight: 700, mb: 1, fontSize: 14, color: "#2D3A4D" }}
            >
              حالة الدفع
            </Typography>
            <Select fullWidth defaultValue="paid">
              <MenuItem value="paid">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "#38A169", fontSize: 20 }} />
                  مدفوع بالكامل
                </Box>
              </MenuItem>
            </Select>
          </Grid>
          <Grid sx={{ xs: 12 }}>
            <Typography
              sx={{ fontWeight: 700, mb: 1, fontSize: 14, color: "#2D3A4D" }}
            >
              ملاحظات إضافية (اختياري)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="أي تفاصيل أخرى متعلقة بهذه الفاتورة..."
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: "none", display: "flex" }}>
        <Button
          variant="contained"
          onClick={onNext}
          startIcon={<ArrowBackIcon sx={{ ml: 1, mr: 0 }} />}
          sx={{ bgcolor: "#5C4066", "&:hover": { bgcolor: "#4A3352" } }}
        >
          الخطوة التالية
        </Button>
      </Paper>
    </Box>
  );
}

// export default InvoiceDetailsForm;
