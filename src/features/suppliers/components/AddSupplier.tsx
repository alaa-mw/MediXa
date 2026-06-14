import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

interface SupplierFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  additionalNotes: string;
}

const AddSupplier: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState<SupplierFormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    additionalNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // You can add API call or state management logic
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      city: "",
      additionalNotes: "",
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{
              fontWeight: 700,
              paddingRight: { sm: 2 },
              display: "inline-block",
              mb: 2,
            }}
          >
            إضافة مورد جديد
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            يرجى ملء المعلومات أدناه لإضافة مورد جديد إلى النظام
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              المعلومات الأساسية
            </Typography>
            <Grid container spacing={3}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="اسم المورد الكامل"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="مثال: محمد السعيدي"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <PersonIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    },
                  }}
                  helperText="الاسم الرباعي أو الاسم التجاري للمورد"
                />
              </Grid>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="اسم الشركة / المؤسسة"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="مثال: شركة التجهيزات الطبية العالمية"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <BusinessIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="البريد الإلكتروني"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+966 5X XXX XXXX"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <PhoneIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* City Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              المدينة
            </Typography>
            <Grid container spacing={3}>
              <Grid sx={{ xs: 12, sm: 8, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="اسم المدينة"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="مثال: الرياض، جدة، الدمام..."
                  slotProps={{
                    input: {
                      startAdornment: (
                        <LocationCityIcon
                          sx={{ color: "action.active", mr: 1 }}
                        />
                      ),
                    },
                  }}
                  helperText="الموقع الجغرافي للمورد أو مكتبه الرئيسي"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Additional Notes Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ملاحظات إضافية
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                (اختياري)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="ملاحظات إضافية"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="أية تفاصيل إضافية حول شروط التوريد أو التصنيفات..."
              slotProps={{
                input: {
                  startAdornment: (
                    <NoteAddIcon
                      sx={{
                        color: "action.active",
                        mr: 1,
                        alignSelf: "flex-start",
                        mt: 1.5,
                      }}
                    />
                  ),
                },
              }}
              helperText="يمكنك إضافة شروط التوريد، التصنيفات، أو أي معلومات إضافية"
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                order: { xs: 2, sm: 1 },
              }}
            >
              إعادة تعيين
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                order: { xs: 1, sm: 2 },
              }}
            >
              حفظ المورد
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddSupplier;
