
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  FormControlLabel, 
  Switch, 
  Tabs,       
  Tab,        
  CircularProgress 
} from "@mui/material";
import { X, Settings, Plus, Trash2 } from "lucide-react";
import type { PharmacyDrug } from "../../types/inventory";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomTextField } from "../CustomTextField";

import { useFetchIngredients } from "../../hooks/useFetchIngredients";
import { useFetchDrugCategories } from "../../hooks/useFetchDrugCategories";
import { useFetchDosageForms } from "../../hooks/useFetchDosageForms";

import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";

interface EditPrivateMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  medicine: PharmacyDrug;
}

interface UnitOption { id: string; label: string; }

export const EditPrivateMedicineDialog: React.FC<EditPrivateMedicineDialogProps> = ({ open, onClose, medicine }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // 🌟 حالة التبويب النشط
  const [activeTab, setActiveTab] = useState<number>(0);

  // 1. استدعاء الهوكات وجلب البيانات
  const { categories, fetchCategories, loading: loadingCategories } = useFetchDrugCategories();
  const { dosageForms, fetchDosageForms, loading: loadingDosageForms } = useFetchDosageForms();
  const { ingredients, fetchIngredients, loading: loadingIngredients } = useFetchIngredients();

  const { mutate: updateDrug, isPending } = usePostData<any>(
    `/pharmacy-drugs/update-private-drug/${medicine?.pharmacyDrugId}`
  );

  const [allUnits] = useState<UnitOption[]>([
    { id: "mg", label: "ملغ (mg)" },
    { id: "g", label: "غرام (g)" },
    { id: "ml", label: "مل (ml)" },
    { id: "IU", label: "وحدة دولية (IU)" }
  ]);

  // 2. الـ States التفاعلية للـ Form
  const [selectedDosageForm, setSelectedDosageForm] = useState<any | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [activeIngredients, setActiveIngredients] = useState<any[]>([]);
  const [tempIngredient, setTempIngredient] = useState<any | null>(null);
  const [tempStrength, setTempStrength] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<UnitOption | null>(allUnits[0]);

  const [formData, setFormData] = useState({
    tradeName: "", barcode: "", unitsPerBox: 1, isRx: false, isActive: true,
    minStockAlert: 10, sellPart: true, consumerPrice: 9500, expiryDateAlarm: 30, notes: ""
  });

  useEffect(() => {
    if (open) {
      setActiveTab(0);
      fetchCategories();
      fetchDosageForms();
      fetchIngredients();
    }
  }, [open]);

  useEffect(() => {
    if (medicine && open) {
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

      setSelectedDosageForm(dosageForms.find(f => f.dosageFormId === medicine.dosageForm?.dosageFormId) || null);
      setSelectedCategories(categories.filter(cat => medicine.categories?.some(c => c.categoryId === cat.categoryId)));
      
      setActiveIngredients(medicine.ingredients?.map(ing => ({
        ...ing,
        name: ingredients.find(i => i.ingredientId === ing.ingredientId)?.ingredientName || "غير معروف",
        unitObj: allUnits.find(u => u.id === ing.unit) || allUnits[0]
      })) || []);
    }
  }, [medicine, open, dosageForms, categories, ingredients]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddIngredient = () => {
    if (!tempIngredient || !tempStrength) return;
    setActiveIngredients(prev => [...prev, { 
      ingredientId: tempIngredient.ingredientId, 
      name: tempIngredient.ingredientName, 
      strengthValue: tempStrength, 
      unitObj: tempUnit 
    }]);
    setTempIngredient(null);
    setTempStrength("");
  };

  const handleRemoveIngredient = (id: number) => {
    setActiveIngredients(prev => prev.filter(ing => ing.ingredientId !== id));
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
      
      {/* 1. رأس النافذة الأنيق */}
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: "12px", backgroundColor: "#f5f3ff", display: "flex" }}>
            <Settings size={22} color="#8b5cf6" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "700", fontSize: "1.1rem", color: "#1e293b" }}>تعديل الدواء الخاص</Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#94a3b8", "&:hover": { backgroundColor: "#f1f5f9" } }}><X size={18} /></IconButton>
      </DialogTitle>

      {/* 2. شريط التبويبات الاحترافي */}
      <Box sx={{ borderBottom: "1px solid #e2e8f0", px: 4, backgroundColor: "#ffffff" }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#0f766e", height: "3px", borderRadius: "3px" },
            "& .MuiTab-root": { textTransform: "none", fontWeight: "600", fontSize: "0.9rem", color: "#64748b", py: 2 },
            "& .Mui-selected": { color: "#0f766e !important" }
          }}
        >
          <Tab
          //  icon={<Pill size={18} />} 
          // iconPosition="start"
           label="البيانات التعريفية الأساسية" />
          <Tab 
          // icon={<Layers size={18} />} iconPosition="start"
           label="التركيبة الطبية والمكونات" />
          <Tab
          //  icon={<AlertTriangle size={18} />} iconPosition="start" 
           label="الأسعار وضوابط المخزن" />
        </Tabs>
      </Box>

      {/* 3. محتوى النافذة المنظم حسب التبويب النشط */}
      <DialogContent 
        sx={{ 
          pt: 5.5,     
          pb: 3.5, 
          px: 4, 
          minHeight: "340px", 
          maxHeight: "60vh",
          overflowY: "auto",
          backgroundColor: "#fcfcfd", 
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f5f9" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "100px" }
        }}
      >
        <Box sx={{ direction: "rtl" }}>
          
          {/* الـ Tab الأول: البيانات الأساسية */}
          {activeTab === 0 && (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 3.5 }}> {/* 🌟 تم زيادة الـ gap هنا لـ 3.5 لتباعد الحقول */}
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField label="الاسم التجاري للدواء" value={formData.tradeName} onChange={(val) => setFormData(p => ({ ...p, tradeName: val }))} /></Box>
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField label="الباركود الدولي (Barcode)" value={formData.barcode} onChange={(val) => setFormData(p => ({ ...p, barcode: val }))} /></Box>
              
              <Box sx={{ gridColumn: "span 6" }}>
                <CustomAutocomplete 
                  label="الشكل الصيدلاني"
                  options={dosageForms}
                  value={selectedDosageForm}
                  onChange={(val) => setSelectedDosageForm(val)}
                  getOptionLabel={(opt) => opt.dosageFormName}
                  isOptionEqualToValue={(opt, val) => opt.dosageFormId === val.dosageFormId}
                  placeholder={loadingDosageForms ? "جاري التحميل..." : "اختر الشكل الصيدلاني..."}
                />
              </Box>
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField type="number" label="عدد القطع/العبوات داخل العلبة" value={formData.unitsPerBox} onChange={(val) => setFormData(p => ({ ...p, unitsPerBox: parseInt(val) || 1 }))} /></Box>
              
              <Box sx={{ gridColumn: "span 12" }}>
                <CustomAutocomplete 
                  multiple
                  label="التصنيفات الدوائية والعلاجية"
                  options={categories}
                  value={selectedCategories}
                  onChange={(val) => setSelectedCategories(val as any[])}
                  getOptionLabel={(opt) => opt.categoryName}
                  isOptionEqualToValue={(opt, val) => opt.categoryId === val.categoryId}
                  placeholder={loadingCategories ? "جاري التحميل..." : "اختر الفئات الدوائية..."}
                />
              </Box>
              
              <Box sx={{ gridColumn: "span 12", mt: 0.5 }}>
                <FormControlLabel control={<Switch checked={formData.isRx} onChange={(e) => setFormData(p => ({ ...p, isRx: e.target.checked }))} color="error" />} label="هل يحتاج وصفة طبية ؟" />
              </Box>
            </Box>
          )}

          {/* الـ Tab الثاني: نظام إدارة المواد الفعالة */}
          {activeTab === 1 && (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 3.5 }}> {/* 🌟 تم زيادة الـ gap هنا لـ 3.5 لتباعد الحقول */}
              <Box sx={{ gridColumn: "span 12" }}>
                
                {/* بار الإضافة المدمج */}
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 3.5, backgroundColor: "#ffffff", p: 2, borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0px 2px 8px rgba(0,0,0,0.01)" }}>
                  <Box sx={{ flex: 3 }}>
                    <CustomAutocomplete
                      label="ابحث عن مادة فعالة لإضافتها..."
                      options={ingredients}
                      value={tempIngredient}
                      onChange={(val) => setTempIngredient(val)}
                      getOptionLabel={(opt) => opt.ingredientName}
                      isOptionEqualToValue={(opt, val) => opt.ingredientId === val.ingredientId}
                      placeholder={loadingIngredients ? "جاري التحميل..." : "ابتدئ بكتابة اسم المادة..."}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <CustomTextField type="number" label="التركيز" value={tempStrength} onChange={(val) => setTempStrength(val)} />
                  </Box>
                  <Box sx={{ flex: 1.2 }}>
                    <CustomAutocomplete
                      label="الوحدة"
                      options={allUnits}
                      value={tempUnit}
                      onChange={(val) => setTempUnit(val as UnitOption | null)}
                      getOptionLabel={(opt) => opt.label}
                      isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    />
                  </Box>
                  <Button variant="contained" disableElevation onClick={handleAddIngredient} sx={{ backgroundColor: "#0f766e", minWidth: "54px", height: "54px", borderRadius: "14px", color: "white", "&:hover": { backgroundColor: "#0d645d" } }}>
                    <Plus size={22} />
                  </Button>
                </Box>

                {/* قائمة عرض المواد المضافة */}
                {activeIngredients.length > 0 ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}> {/* 🌟 زيادة المسافة بين سطور المواد المضافة */}
                    {activeIngredients.map((ing) => (
                      <Box 
                        key={ing.ingredientId} 
                        sx={{ 
                          display: "flex", gap: 2, alignItems: "center", p: 1.5, px: 2.5, 
                          backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #eef2f6",
                          "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" }
                        }}
                      >
                        <Box sx={{ flex: 3, display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0f766e" }} />
                          <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#334155" }}>{ing.name}</Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <CustomTextField 
                            type="number" label="التركيز" value={ing.strengthValue} 
                            onChange={(val) => {
                              const updated = activeIngredients.map(i => i.ingredientId === ing.ingredientId ? { ...i, strengthValue: val } : i);
                              setActiveIngredients(updated);
                            }} 
                          />
                        </Box>

                        <Box sx={{ flex: 1.2 }}>
                          <CustomAutocomplete
                            label="الوحدة" options={allUnits} value={ing.unitObj}
                            onChange={(val) => {
                              const updated = activeIngredients.map(i => i.ingredientId === ing.ingredientId ? { ...i, unitObj: val as UnitOption } : i);
                              setActiveIngredients(updated);
                            }}
                            getOptionLabel={(opt) => opt.label}
                            isOptionEqualToValue={(opt, val) => opt.id === val.id}
                          />
                        </Box>

                        <IconButton 
                          onClick={() => handleRemoveIngredient(ing.ingredientId)} 
                          sx={{ color: "#f43f5e", backgroundColor: "#fff5f5", borderRadius: "10px", p: 1.2, "&:hover": { backgroundColor: "#ffe4e6" } }}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4, backgroundColor: "#ffffff", borderRadius: "14px", border: "1px dashed #cbd5e1" }}>
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>لا يوجد مواد فعالة مركبة لهذا الدواء حالياً.</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* الـ Tab الثالث: الأسعار ومراقبة الأمان الرقابي */}
          {activeTab === 2 && (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 3.5 }}> {/* 🌟 تم زيادة الـ gap هنا لـ 3.5 لتباعد الحقول */}
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField type="number" label="سعر المبيع للمستهلك (ل.س)" value={formData.consumerPrice} onChange={(val) => setFormData(p => ({ ...p, consumerPrice: parseInt(val) || 0 }))} /></Box>
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField type="number" label="حد الأمان الأدنى بالمخزن (تنبيه النقص)" value={formData.minStockAlert} onChange={(val) => setFormData(p => ({ ...p, minStockAlert: parseInt(val) || 0 }))} /></Box>
              
              <Box sx={{ gridColumn: "span 6" }}><CustomTextField type="number" label="تنبيهات انتهاء الصلاحية قبل (أيام)" value={formData.expiryDateAlarm} onChange={(val) => setFormData(p => ({ ...p, expiryDateAlarm: parseInt(val) || 0 }))} /></Box>
              <Box sx={{ gridColumn: "span 6", display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', px: 1 }}>
                <FormControlLabel control={<Switch checked={formData.sellPart} onChange={(e) => setFormData(p => ({ ...p, sellPart: e.target.checked }))} color="success" />} label="إمكانية البيع بالتجزئة" />
                <FormControlLabel control={<Switch checked={formData.isActive} onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))} color="success" />} label="إتاحية البيع" />
              </Box>

              <Box sx={{ gridColumn: "span 12" }}><CustomTextField label="ملاحظات تنظيمية داخلية للصيدلية" value={formData.notes} onChange={(val) => setFormData(p => ({ ...p, notes: val }))} /></Box>
            </Box>
          )}

        </Box>
      </DialogContent>

      {/* 4. أسفل النافذة (Footer) */}
      <DialogActions 
        sx={{ 
          p: 2, 
          px: 4,
          gap: 1.5, 
          backgroundColor: "#f8fafc", 
          borderTop: "1px solid #e2e8f0", 
          borderBottomLeftRadius: "24px", 
          borderBottomRightRadius: "24px" 
        }}
      >
        <Button onClick={onClose} variant="text" disabled={isPending} sx={{ color: "#64748b", fontWeight: "600", px: 3 }}>إلغاء</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disableElevation 
          disabled={isPending} 
          sx={{  borderRadius: "12px", px: 4, py: 1, fontWeight: "600", }}
        >
          {isPending ? <CircularProgress size={20} color="inherit" /> : "حفظ التعديلات"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const dialogStyles = {
  borderRadius: "24px",
  boxShadow: "0px 25px 60px -15px rgba(15, 23, 42, 0.12)",
  background: "#ffffff"
};