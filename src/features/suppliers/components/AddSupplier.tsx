import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { CustomTextField } from "../../../shared/layout/CustomTextField";
import usePostData from "../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const AddSupplier: React.FC = () => {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    supplierName: "",
    phone: "",
    address: "",
    notes: "",
  });
  console.log("formData:", !formData.address);
  const { mutate } = usePostData("/supplier/create");
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validation if all fields are empty
    if (
      !formData.supplierName &&
      !formData.phone &&
      !formData.address &&
      !formData.notes
    ) {
      showSnackbar("يرجى ملء جميع الحقول المطلوبة", "warning");
      return;
    }

    mutate(formData, {
      onSuccess: () => showSnackbar("تم إضافة المورد بنجاح", "success"),
      onError: () => showSnackbar("حدث خطأ أثناء إضافة المورد", "error"),
    });
  };

  const handleReset = () => {
    setFormData({
      supplierName: "",
      phone: "",
      address: "",
      notes: "",
    });
  };

  return (
    <Container maxWidth="md">
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  label="اسم المورد الكامل"
                  value={formData.supplierName}
                  onChange={(value) => handleChange("supplierName", value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  label="العنوان"
                  value={formData.address}
                  onChange={(value) => handleChange("address", value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  label="رقم الهاتف"
                  value={formData.phone}
                  onChange={(value) => handleChange("phone", value)}
                  placeholder="+966 5X XXX XXXX"
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
            <CustomTextField
              label="ملاحظات إضافية"
              value={formData.notes}
              onChange={(value) => handleChange("notes", value)}
              placeholder="أية تفاصيل إضافية حول شروط التوريد أو التصنيفات..."
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2, justifyContent: "flex-end", gap: 1 }}
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
