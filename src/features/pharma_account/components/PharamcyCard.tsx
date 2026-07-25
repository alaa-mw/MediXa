import { Card, CardContent, Grid, Typography, Box, alpha } from "@mui/material";
import CustomTextField from "./CustomTextField";
import type { PharmacyForm } from "../types/createPharamacyFormTypes";

interface PharmacyCardProps {
  pharmacyData: PharmacyForm;
  setPharmacyData: React.Dispatch<React.SetStateAction<PharmacyForm>>;
}

export default function PharmacyAccountCard({
  pharmacyData,
  setPharmacyData,
}: PharmacyCardProps) {
  const handleChange =
    (field: keyof PharmacyForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPharmacyData({
        ...pharmacyData,
        [field]: e.target.value,
      });
    };
  return (
    <Card
      elevation={3}
      sx={{
        px: 4,
        py: 2,
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRight: `7px solid ${alpha("#210724", 0.15)}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h6">معلومات حساب الصيدلية</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="اسم الصيدلية"
              value={pharmacyData.pharmacyName}
              onChange={handleChange("pharmacyName")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="البريد الإلكتروني"
              value={pharmacyData.email}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="رقم الهاتف"
              value={pharmacyData.contactPhone}
              onChange={handleChange("contactPhone")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="المحافظة"
              value={pharmacyData.governorate}
              onChange={handleChange("governorate")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="الجهة الصحية المشرفة"
              value={pharmacyData.healthDirectorate}
              onChange={handleChange("healthDirectorate")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="رقم الترخيص"
              value={pharmacyData.pharmacistLicenseNo}
              onChange={handleChange("pharmacistLicenseNo")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="اسم المنطقة"
              value={pharmacyData.areaName}
              onChange={handleChange("areaName")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="العنوان الكامل"
              value={pharmacyData.addressText}
              onChange={handleChange("addressText")}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
