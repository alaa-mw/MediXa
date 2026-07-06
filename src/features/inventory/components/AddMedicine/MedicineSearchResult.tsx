import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ImportMedicineCard } from "./ImportMedicineCard";
import type { CentralDrugData } from "../../types/centralDrug";
import theme from "../../../../shared/styles/mainTheme";

interface MedicineSearchResultProps {
  hasSearched: boolean;
  searchResult: "found" | "not_found" | null;
  foundDrug: CentralDrugData | null; // 🟢 إضافة الـ prop الجديد
  onOpenFound: () => void;
  onOpenNotFound: () => void;
}

export const MedicineSearchResult: React.FC<MedicineSearchResultProps> = ({
  hasSearched,
  searchResult,
  foundDrug,
  onOpenFound,
  onOpenNotFound,
}) => {
  if (!hasSearched) {
    return (
      <Box sx={{ textAlign: "center", margin: "auto", py: 6 }}>
        <PageviewIcon sx={{ fontSize: "100px", color: theme.palette?.primary?.light, mb: 2 }} />
        <Typography
          variant="body2"
          sx={{ color: "#94a3b8", maxWidth: "350px", margin: "0 auto",lineHeight: 2 }}
        >
          أدخل الكلمات المفتاحية في شريط البحث العلوي لبدء فحص السجلات المركزية.
        </Typography>
      </Box>
    );
  }

  // 🟢 تعديل العرض ليصبح ديناميكياً بناءً على بيانات السيرفر
  if (searchResult === "found" && foundDrug) {
    // جلب المادة الفعالة مع التركيز (تجميعها من مصفوفة المكونات)
    const scientificName =
      foundDrug.ingredients
        .map(
          (ing) =>
            `${ing.ingredient.ingredientName} ${ing.strengthValue}${ing.unit}`,
        )
        .join(" + ") || "غير محدد";

    // جلب أول تصنيف متاح للدواء
    const categoryName =
      foundDrug.categories?.[0]?.category?.categoryName || "عام";

    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} sx={{ direction: "rtl" }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ImportMedicineCard
              medicineName={foundDrug.tradeName} // الاسم التجاري الحقيقي
              scientificName={scientificName} // المادة الفعالة الحقيقية
              category={categoryName} // التصنيف الحقيقي
              requiresRx={foundDrug.isRx} // هل يتطلب وصفة طبية؟
              type={`${foundDrug.dosageForm?.dosageFormName} (${foundDrug.unitsPerBox} قطعة)`} // الشكل الصيدلاني وعدد الوحدات
              purchasePrice={Number(foundDrug.netPrice)} // سعر الشراء حقيقي
              consumerPrice={Number(foundDrug.consumerPrice)} // سعر المستهلك حقيقي
              onAddClick={onOpenFound}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (searchResult === "not_found") {
    return (
      <Box sx={{ textAlign: "center", margin: "auto", py: 4 }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "20px",
              backgroundColor: "#f1f5f9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{ fontSize: "36px", color: "#64748b" }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              left: -4,
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "bold",
              border: "3px solid #f8fafc",
            }}
          >
            ✕
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#1e293b", mb: 1 }}
        >
          الدواء غير موجود
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#64748b", maxWidth: "420px", mb: 3, lineHeight: 1.6 }}
        >
          لم نتمكن من العثور على أي نتائج مطابقة في السجلات المركزية. بإمكانك
          إضافة معلوماته ليتوفر ضمن مخزونك الخاص.
        </Typography>
        <Button
          variant="contained"
          onClick={onOpenNotFound}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: theme.palette?.secondary?.main,
            "&:hover": { backgroundColor: theme.palette?.secondary?.light },
            borderRadius: "12px",
            px: 4,
            py: 1.4,
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          إضافة الدواء للمخزون
        </Button>
      </Box>
    );
  }

  return null;
};
