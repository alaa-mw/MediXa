
import React, { useState, useEffect, useRef } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button, IconButton, Tabs, Tab, CircularProgress
} from "@mui/material";
import { X, Settings, Beaker, Pill, DollarSign } from "lucide-react"; 
import type { PharmacyDrug } from "../../types/pharnacyDrug";

import { useFetchIngredients } from "../../hooks/useFetchIngredients";
import { useFetchDrugCategories } from "../../hooks/useFetchDrugCategories";
import { useFetchDosageForms } from "../../hooks/useFetchDosageForms";

import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";

import { BasicInfoTab } from "./BasicInfoTab";
import { IngredientsTab } from "./IngredientsTab";
import { PricingAndStockTab } from "./PricingAndStockTab";

interface EditPrivateMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  medicine: PharmacyDrug;
}

interface UnitOption { id: string; label: string; }

export const EditPrivateMedicineDialog: React.FC<EditPrivateMedicineDialogProps> = ({ open, onClose, medicine }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<number>(0);

  const { categories, fetchCategories, loading: loadingCategories } = useFetchDrugCategories();
  const { dosageForms, fetchDosageForms, loading: loadingDosageForms } = useFetchDosageForms();
  const { ingredients, fetchIngredients, loading: loadingIngredients } = useFetchIngredients();

 const drugId = medicine?.pharmacyDrugId;
  const { mutate: updateDrug, isPending } = usePostData<any>(
    `/pharmacy-drugs/update-private-drug/${drugId}`
  );

  const [allUnits] = useState<UnitOption[]>([
    { id: "mg", label: "ملغ (mg)" },
    { id: "g", label: "غرام (g)" },
    { id: "ml", label: "مل (ml)" },
    { id: "IU", label: "وحدة دولية (IU)" }
  ]);

  // الحالات المشتركة
  const [selectedDosageForm, setSelectedDosageForm] = useState<any | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [activeIngredients, setActiveIngredients] = useState<any[]>([]);
  
  // الحالات المؤقتة الخاصة بتاب التركيبة
  const [tempIngredient, setTempIngredient] = useState<any | null>(null);
  const [tempStrength, setTempStrength] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<UnitOption | null>(allUnits[0]);

  const [formData, setFormData] = useState({
    tradeName: "", barcode: "", unitsPerBox: 1, isRx: false, isActive: true,
    minStockAlert: 10, sellPart: true, consumerPrice: 0, expiryDateAlarm: 30, notes: ""
  });

  const isFormInitialized = useRef(false);

  useEffect(() => {
    if (open) {
      setActiveTab(0);
      fetchCategories();
      fetchDosageForms();
      fetchIngredients();
      isFormInitialized.current = false;
      setSelectedDosageForm(null);
      setSelectedCategories([]);
      setActiveIngredients([]);
    }
  }, [open]);

  useEffect(() => {
    if (medicine && open && !isFormInitialized.current) {
      setFormData({
        tradeName: medicine.tradeName || "",
        barcode: medicine.barcode || "",
        unitsPerBox: medicine.unitsPerBox || 1,
        isRx: medicine.isRx ?? false,
        isActive: medicine.isDrugActive ?? true,
        minStockAlert: medicine.pharmacyDrugDetails?.minStockAlert ?? 10,
        sellPart: medicine.pharmacyDrugDetails?.sellPart ?? true,
        consumerPrice: medicine.pharmacyDrugDetails?.consumerPrice ?? 0,
        expiryDateAlarm: medicine.pharmacyDrugDetails?.expiryDateAlarm ?? 30,
        notes: medicine.pharmacyDrugDetails?.notes || ""
      });
      isFormInitialized.current = true;
    }
  }, [medicine, open]);

  useEffect(() => {
    if (open && medicine?.dosageForm?.dosageFormId && dosageForms.length > 0) {
      const matched = dosageForms.find(f => f.dosageFormId === medicine.dosageForm?.dosageFormId);
      if (matched) setSelectedDosageForm(matched);
    }
  }, [dosageForms, medicine, open]);

  useEffect(() => {
    if (open && medicine?.categories && categories.length > 0) {
      const matched = categories.filter(cat => 
        medicine.categories?.some(c => c.categoryId === cat.categoryId)
      );
      setSelectedCategories(matched);
    }
  }, [categories, medicine, open]);

  useEffect(() => {
    if (open && medicine?.ingredients && ingredients.length > 0) {
      const initialIngredients = medicine.ingredients.map(ing => {
        const matchingIngredient = ingredients.find(i => i.ingredientId === ing.ingredientId);
        return {
          ...ing,
          name: matchingIngredient ? matchingIngredient.ingredientName : "غير معروف",
          unitObj: allUnits.find(u => u.id === ing.unit) || allUnits[0]
        };
      });
      setActiveIngredients(initialIngredients);
    }
  }, [ingredients, medicine, open, allUnits]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddIngredient = () => {
    if (!tempIngredient) {
      showSnackbar("الرجاء اختيار اسم المادة الفعالة أولاً!", "warning");
      return;
    }
    if (!tempStrength || tempStrength.trim() === "") {
      showSnackbar("الرجاء إدخال تركيز المادة الفعالة!", "warning");
      return;
    }
    const isAlreadyAdded = activeIngredients.some(ing => ing.ingredientId === tempIngredient.ingredientId);
    if (isAlreadyAdded) {
      showSnackbar("هذه المادة الفعالة مضافة بالفعل للتركيبة!", "warning");
      return;
    }

    setActiveIngredients(prev => [...prev, { 
      ingredientId: tempIngredient.ingredientId, 
      name: tempIngredient.ingredientName, 
      strengthValue: tempStrength, 
      unitObj: tempUnit 
    }]);
    setTempIngredient(null);
    setTempStrength("");
  };

  const handleSave = () => {
   

    const payload = { 
      ...formData, 
      dosageFormId: selectedDosageForm?.dosageFormId, 
      categoryIds: selectedCategories.map(c => c.categoryId), 
      ingredients: activeIngredients.map(ing => ({
        ingredientId: Number(ing.ingredientId),
        strengthValue: Number(ing.strengthValue),
        unit: ing.unitObj?.id || ing.unit
      }))
    };

    updateDrug(payload, {
      onSuccess: () => {
        showSnackbar("تم تعديل بيانات الدواء بنجاح!", "success");
        queryClient.invalidateQueries({ queryKey: ["/pharmacy-drugs/get-all-pharmacy-drugs"] });
        onClose();
      },
      onError: (err) => {
        showSnackbar(err?.message || "حدث خطأ أثناء تعديل الدواء", "error");
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth slotProps={{ paper: { sx: dialogStyles } }}>
      <Box sx={{ direction: "rtl", display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* رأس النافذة */}
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 1.2, borderRadius: "14px", backgroundColor: "#f0fdfa", display: "flex", border: "1px solid #ccfbf1" }}>
              <Settings size={22} color="#0f766e" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "700", fontSize: "1.15rem", color: "#0f172a" }}>
                تعديل بيانات الدواء الخاص
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b", display: "block", mt: 0.2 }}>
                تحديث المواصفات، المكونات والأسعار في المخزن
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "#94a3b8", backgroundColor: "#f8fafc", "&:hover": { backgroundColor: "#f1f5f9" } }}><X size={18} /></IconButton>
        </DialogTitle>

        {/* شريط التبويبات */}
        <Box sx={{ borderBottom: "1px solid #e2e8f0", px: 3, backgroundColor: "#ffffff" }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#0f766e", height: "3px", borderRadius: "3px 3px 0 0" },
              "& .MuiTab-root": { textTransform: "none", fontWeight: "600", fontSize: "0.9rem", color: "#64748b", py: 2, minHeight: "60px", display: "flex", flexDirection: "row", gap: 1 },
              "& .Mui-selected": { color: "#0f766e !important" }
            }}
          >
            <Tab icon={<Pill size={18} />} iconPosition="start" label="البيانات الأساسية" />
            <Tab icon={<Beaker size={18} />} iconPosition="start" label="التركيبة والمكونات" />
            <Tab icon={<DollarSign size={18} />} iconPosition="start" label="الأسعار والمخزن" />
          </Tabs>
        </Box>

        {/* محتوى النافذة المستدعى ديناميكياً بحسب التاب النشط */}
        <DialogContent sx={dialogContentStyles}>
          {activeTab === 0 && (
            <BasicInfoTab 
              formData={formData} setFormData={setFormData}
              dosageForms={dosageForms} loadingDosageForms={loadingDosageForms}
              selectedDosageForm={selectedDosageForm} setSelectedDosageForm={setSelectedDosageForm}
              categories={categories} loadingCategories={loadingCategories}
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            />
          )}

          {activeTab === 1 && (
            <IngredientsTab 
              ingredients={ingredients} loadingIngredients={loadingIngredients}
              activeIngredients={activeIngredients} setActiveIngredients={setActiveIngredients}
              tempIngredient={tempIngredient} setTempIngredient={setTempIngredient}
              tempStrength={tempStrength} setTempStrength={setTempStrength}
              tempUnit={tempUnit} setTempUnit={setTempUnit}
              allUnits={allUnits} handleAddIngredient={handleAddIngredient}
            />
          )}

          {activeTab === 2 && (
            <PricingAndStockTab formData={formData} setFormData={setFormData} />
          )}
        </DialogContent>

        {/* أسفل النافذة */}
        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={onClose} variant="text" disabled={isPending} sx={{ color: "#64748b", fontWeight: "600", px: 3, "&:hover": { backgroundColor: "#f1f5f9" } }}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained" disableElevation disabled={isPending} sx={{ borderRadius: "10px", px: 4, py: 1.2, fontWeight: "600", backgroundColor: "primary.main" }}>
            {isPending ? <CircularProgress size={20} color="inherit" /> : "حفظ التعديلات"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const dialogStyles = {
  borderRadius: "20px",
  boxShadow: "0px 25px 50px -12px rgba(15, 23, 42, 0.08)",
  background: "#ffffff",
  overflow: "hidden"
};

const dialogContentStyles = {
  p: 4, mt: 1.5, minHeight: "380px", maxHeight: "55vh", overflowY: "auto", backgroundColor: "#ffffff",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "100px" }
};

const dialogActionsStyles = {
  p: 2.5, px: 4, gap: 1.5, backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
};