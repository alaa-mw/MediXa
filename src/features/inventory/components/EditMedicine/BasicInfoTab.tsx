import React from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import { CustomAutocomplete } from "../CustomAutocomplete";

interface BasicInfoTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  dosageForms: any[];
  loadingDosageForms: boolean;
  selectedDosageForm: any;
  setSelectedDosageForm: (val: any) => void;
  categories: any[];
  loadingCategories: boolean;
  selectedCategories: any[];
  setSelectedCategories: (val: any[]) => void;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  setFormData,
  dosageForms,
  loadingDosageForms,
  selectedDosageForm,
  setSelectedDosageForm,
  categories,
  loadingCategories,
  selectedCategories,
  setSelectedCategories,
}) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          label="الاسم التجاري للدواء" 
          value={formData.tradeName} 
          onChange={(val) => setFormData((p: any) => ({ ...p, tradeName: val }))} 
        />
      </Box>
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          label="الباركود الدولي (Barcode)" 
          value={formData.barcode} 
          onChange={(val) => setFormData((p: any) => ({ ...p, barcode: val }))} 
        />
      </Box>
      
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomAutocomplete 
          label="الشكل الصيدلاني"
          options={dosageForms}
          value={selectedDosageForm}
          onChange={(val) => setSelectedDosageForm(val)}
          getOptionLabel={(opt) => opt.dosageFormName || ""}
          isOptionEqualToValue={(opt, val) => opt.dosageFormId === val?.dosageFormId}
          placeholder={loadingDosageForms ? "جاري التحميل..." : "اختر الشكل الصيدلاني..."}
        />
      </Box>
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          type="number" 
          label="عدد القطع/العبوات داخل العلبة" 
          value={formData.unitsPerBox} 
          onChange={(val) => setFormData((p: any) => ({ ...p, unitsPerBox: parseInt(val) || 1 }))} 
        />
      </Box>
      
      <Box sx={{ gridColumn: "span 12" }}>
        <CustomAutocomplete 
          multiple
          label="التصنيفات الدوائية والعلاجية"
          options={categories}
          value={selectedCategories}
          onChange={(val) => setSelectedCategories(val as any[])}
          getOptionLabel={(opt) => opt.categoryName || ""}
          isOptionEqualToValue={(opt, val) => opt.categoryId === val?.categoryId}
          placeholder={loadingCategories ? "جاري التحميل..." : "اختر الفئات الدوائية..."}
        />
      </Box>
      
      <Box sx={{ gridColumn: "span 12" }}>
        <Box sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <FormControlLabel 
            control={
              <Switch 
                checked={formData.isRx} 
                onChange={(e) => setFormData((p: any) => ({ ...p, isRx: e.target.checked }))} 
                sx={{ 
                  "& .Mui-checked": { color: "#df1c1c !important" }, 
                  "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#df1c1c !important" } 
                }} 
              />
            } 
            label={<Typography sx={{ fontWeight: "600", fontSize: "0.9rem", color: "#334155" }}>يتطلب وصفة طبية معتمدة (Rx)</Typography>} 
          />
        </Box>
      </Box>
    </Box>
  );
};