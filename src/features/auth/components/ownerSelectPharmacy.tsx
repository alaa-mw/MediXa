import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import logonobg from "../../../assets/logonobg.png";
import type { Pharmacies } from "../types/LoginResponse";

export const OwnerSelectPharmacy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // استدعاء useLocation

  // استخراج الصيدليات من الـ state، مع وضع مصفوفة فارغة كقيمة احترازية
  const pharmacies: Pharmacies[] = location.state?.pharmacies || [];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // دالة التعامل مع اختيار الصيدلية
  const handleSelectPharmacy = (pharmacy: Pharmacies) => {
    setSelectedId(pharmacy.pharmacyId);

    // حفظ معرف الصيدلية في الـ localStorage
    localStorage.setItem("pharmacyId", pharmacy.pharmacyId);
    localStorage.setItem("pharmacyName", pharmacy.pharmacyName);
    const role = "PHARMACY_OWNER";

    // الانتقال للداشبورد
    navigate(`/${role?.toLocaleLowerCase()}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, md: 4 },
        direction: "rtl", // دعم اللغة العربية
      }}
    >
      {/* رأس الصفحة مع الشعار الحقيقي */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={logonobg}
            alt="Logo"
            width={120}
            sx={{
              transform: "scale(2)",
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          أهلاً بك في منظومتنا ..!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2b1b3d" }}>
          اختر الصيدلية للمتابعة
        </Typography>
      </Box>

      {/* قائمة الصيدليات بعرض كامل ضمن حاوية محددة العرض ومنسقة */}
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <Grid container spacing={2.5}>
          {pharmacies.map((pharmacy) => {
            const isSelected = selectedId === pharmacy.pharmacyId;
            return (
              <Grid size={{ xs: 12 }} key={pharmacy.pharmacyId}>
                <Card
                  onClick={() => handleSelectPharmacy(pharmacy)}
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: 2.5,
                    border: isSelected
                      ? "2px solid #59386e"
                      : "1px solid #e0e0e0",
                    backgroundColor: isSelected ? "#f7f2f9" : "#ffffff",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#59386e",
                      boxShadow: "0px 6px 20px rgba(89, 56, 110, 0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: "20px !important",
                      px: "24px !important",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 2.5 }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: isSelected ? "#59386e" : "#f0ebf4",
                          color: isSelected ? "#ffffff" : "#59386e",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <StorefrontIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            color: "#2b1b3d",
                            fontSize: "1.05rem",
                          }}
                        >
                          {pharmacy.pharmacyName}
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.3 }}
                        >
                          {pharmacy.address}
                        </Typography> */}
                        {/* <Chip
                          label={`ID: ${pharmacy.pharmacyId}`}
                          size="small"
                          sx={{
                            mt: 1,
                            backgroundColor: "#eee8f2",
                            color: "#59386e",
                            fontWeight: 600,
                          }}
                        /> */}
                      </Box>
                    </Box>

                    <Button
                      variant={isSelected ? "contained" : "outlined"}
                      sx={{
                        backgroundColor: isSelected ? "#59386e" : "transparent",
                        borderColor: "#59386e",
                        color: isSelected ? "#ffffff" : "#59386e",
                        borderRadius: 2,
                        textTransform: "none",
                        px: 3.5,
                        py: 1,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: isSelected ? "#472b57" : "#f7f2f9",
                          borderColor: "#59386e",
                        },
                      }}
                    >
                      {isSelected ? "جاري الدخول..." : "اختيار"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
