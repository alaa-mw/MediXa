// src/features/inventory/components/AddPrivateDrug/Step1BasicInfo.tsx
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, Switch, Button, IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../../../shared/store/hooks";
import {
  selectPrivateDrugState,
  updatePrivateFormField,
  addIngredient,
  removeIngredient,
} from "../../store/privateDrugSlice";
import { CustomTextField } from "../CustomTextField";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";

import { useSnackbar } from "../../../../shared/providers/useSnackbar";
import { useFetchDrugCategories, type CategoryOption } from "../../hooks/useFetchDrugCategories";
import { useFetchDosageForms, type DosageFormOption } from "../../hooks/useFetchDosageForms";
import { useFetchIngredients, type IngredientOption } from "../../hooks/useFetchIngredients";
import { BarcodeScannerField } from "../../../../shared/layout/BarcodeScannerField";

const AVAILABLE_UNITS = ["mg", "g", "ml", "mcg", "IU", "%"];

export const StepBasicInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectPrivateDrugState);
  const { showSnackbar } = useSnackbar();

  const { categories, fetchCategories, loading: loadingCategories } = useFetchDrugCategories();
  const { dosageForms, fetchDosageForms, loading: loadingDosageForms } = useFetchDosageForms();
  const { ingredients, fetchIngredients, loading: loadingIngredients } = useFetchIngredients();

  const [tempIngredient, setTempIngredient] = useState<IngredientOption | null>(null);
  const [tempStrength, setTempStrength] = useState("");
  const [tempUnit, setTempUnit] = useState("mg");

  useEffect(() => {
    fetchCategories();
    fetchDosageForms();
    fetchIngredients();
  }, [fetchCategories, fetchDosageForms, fetchIngredients]);

  const handleChange = (field: keyof typeof state, value: any) => {
    dispatch(updatePrivateFormField({ field, value }));
  };

  const handleAddTempIngredient = () => {
    if (!tempIngredient || !tempStrength) {
      showSnackbar("يرجى اختيار المادة وتحديد التركيز أولاً", "warning");
      return;
    }

    dispatch(
      addIngredient({
        ingredientId: tempIngredient.ingredientId,
        ingredientName: tempIngredient.ingredientName,
        strengthValue: Number(tempStrength),
        unit: tempUnit,
      })
    );
    setTempIngredient(null);
    setTempStrength("");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1100px", mx: "auto" }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, color: "#0F172A" }}>
          بيانات الدواء الأساسية
        </Typography>

        <Grid container spacing={2.5}>
          {/* الاسم التجاري */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField
              label="الاسم التجاري (Trade Name)"
              placeholder="Panadol Extra"
              value={state.tradeName}
              onChange={(val) => handleChange("tradeName", val)}
            />
          </Grid>

          {/* الباركود */}
          <Grid size={{ xs: 12, sm: 6 }}>
  <BarcodeScannerField
    label="الباركود (Barcode)"
    placeholder="1234567890123"
    value={state.barcode}
    onChange={(val) => handleChange("barcode", val)}
    autoFocus={true} // يحدد الحقل مباشرة فور فتح الصفحة
    onScan={(scannedBarcode) => {
      // يوضع الباركود بداخل الحقل ويعرض تنبيهاً بنجاح القراءة
      handleChange("barcode", scannedBarcode);
    }}
  />
</Grid>

          {/* الفئات */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomAutocomplete<CategoryOption>
              label="الفئات (Categories)"
              multiple
              options={categories}
              value={categories.filter((cat) => state.categoryIds.includes(cat.categoryId))}
              onChange={(newValue) => {
                const cats = newValue as CategoryOption[];
                handleChange("categoryIds", cats.map((c) => c.categoryId));
              }}
              getOptionLabel={(option) => option.categoryName}
              isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
              placeholder={loadingCategories ? "جاري التحميل..." : "اختر الفئات..."}
            />
          </Grid>

          {/* الشكل الصيدلاني */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomAutocomplete<DosageFormOption>
              label="الشكل الصيدلاني (Dosage Form)"
              multiple={false}
              options={dosageForms}
              value={dosageForms.find((df) => df.dosageFormId === state.dosageFormId) || null}
              onChange={(newValue) => {
                const df = newValue as DosageFormOption | null;
                handleChange("dosageFormId", df ? df.dosageFormId : null);
              }}
              getOptionLabel={(option) => option.dosageFormName}
              isOptionEqualToValue={(option, value) => option.dosageFormId === value.dosageFormId}
              placeholder={loadingDosageForms ? "جاري التحميل..." : "اختر الشكل الصيدلاني..."}
            />
          </Grid>

          {/* عدد الوحدات بالعلبة */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
              عدد الوحدات في العلبة
            </Typography>
            <CustomCounterField
              value={state.unitsPerBox}
              onChange={(val) => handleChange("unitsPerBox", val)}
              height="42px"
            />
          </Grid>

          {/* هل يحتاج وصفة طبية */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                px: 2,
                borderRadius: 2.5,
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155" }}>
                  دواء بوصفة طبية (isRx)
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B" }}>
                  يتطلب وجود وصفة طبية قبل البيع
                </Typography>
              </Box>
              <Switch
                checked={state.isRx}
                onChange={(e) => handleChange("isRx", e.target.checked)}
                color="primary"
              />
            </Paper>
          </Grid>

          {/* قسم المكونات الفعالة */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 1, p: 2.5, borderRadius: 3, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A", mb: 2 }}>
                المكونات الفعالة والتركيز (Ingredients)
              </Typography>

              {/* حقول الإدخال السريع */}
              <Grid container spacing={1.5}  sx={{ mb: 2,alignItems: "flex-end" }}>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <CustomAutocomplete<IngredientOption>
                    label="المادة الفعالة"
                    options={ingredients}
                    value={tempIngredient}
                    onChange={(val) => setTempIngredient(val as IngredientOption | null)}
                    getOptionLabel={(option) => option.ingredientName}
                    isOptionEqualToValue={(option, value) => option.ingredientId === value.ingredientId}
                    placeholder={loadingIngredients ? "تحميل..." : "ابحث عن مادة..."}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <CustomTextField
                    label="التركيز"
                    type="number"
                    placeholder="500"
                    value={tempStrength}
                    onChange={setTempStrength}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 2 }}>
                  <CustomAutocomplete<string>
                    label="الوحدة"
                    options={AVAILABLE_UNITS}
                    value={tempUnit}
                    onChange={(val) => setTempUnit((val as string) || "mg")}
                    getOptionLabel={(opt) => opt}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddTempIngredient}
                    startIcon={<AddIcon />}
                    sx={{ height: "42px", borderRadius: 2, fontWeight: 700 }}
                  >
                    إضافة
                  </Button>
                </Grid>
              </Grid>

              {/* عرض البطاقات الذكية للأدوية المضافة */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
                {state.ingredients.length === 0 ? (
                  <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "13px", fontStyle: "italic" }}>
                    لم يتم إضافة مواد فعالة بعد.
                  </Typography>
                ) : (
                  state.ingredients.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        backgroundColor: "#e0f2fe",
                        border: "1px solid #bae6fd",
                        color: "#0369a1",
                        px: 2,
                        py: 0.8,
                        borderRadius: "30px",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                        {item.ingredientName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          backgroundColor: "#ffffff",
                          px: 1,
                          borderRadius: "10px",
                          fontWeight: 600,
                        }}
                      >
                        {item.strengthValue} {item.unit}
                      </Typography>
                      <Box
                        onClick={() => dispatch(removeIngredient(index))}
                        sx={{
                          cursor: "pointer",
                          fontSize: "14px",
                          opacity: 0.6,
                          "&:hover": { opacity: 1, color: "#ef4444" },
                        }}
                      >
                        ✕
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};