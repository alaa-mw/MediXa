import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Beaker, Plus, ClipboardList, Trash2 } from "lucide-react";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomTextField } from "../CustomTextField";

interface UnitOption { id: string; label: string; }

interface IngredientsTabProps {
  ingredients: any[];
  loadingIngredients: boolean;
  activeIngredients: any[];
  setActiveIngredients: React.Dispatch<React.SetStateAction<any[]>>;
  tempIngredient: any;
  setTempIngredient: (val: any) => void;
  tempStrength: string;
  setTempStrength: (val: string) => void;
  tempUnit: UnitOption | null;
  setTempUnit: (val: UnitOption | null) => void;
  allUnits: UnitOption[];
  handleAddIngredient: () => void;
}

export const IngredientsTab: React.FC<IngredientsTabProps> = ({
  ingredients,
  loadingIngredients,
  activeIngredients,
  setActiveIngredients,
  tempIngredient,
  setTempIngredient,
  tempStrength,
  setTempStrength,
  tempUnit,
  setTempUnit,
  allUnits,
  handleAddIngredient,
}) => {
  
  const handleRemoveIngredient = (id: number) => {
    setActiveIngredients(prev => prev.filter(ing => ing.ingredientId !== id));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* بار إضافة مادة جديدة */}
      <Box sx={{ backgroundColor: "#ffffff", p: 2.5, borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Beaker size={18} color="#0f766e" />
          <Typography variant="subtitle2" sx={{ fontWeight: "700", color: "#0f766e", fontSize: "0.9rem" }}>
            إضافة مادة فعالة جديدة للتركيبة
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          <Box sx={{ flex: 3 }}>
            <CustomAutocomplete
              label="المادة الفعالة"
              options={ingredients}
              value={tempIngredient}
              onChange={(val) => setTempIngredient(val)}
              getOptionLabel={(opt) => opt.ingredientName || ""}
              isOptionEqualToValue={(opt, val) => opt.ingredientId === val?.ingredientId}
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
              getOptionLabel={(opt) => opt.label || ""}
              isOptionEqualToValue={(opt, val) => opt.id === val?.id}
            />
          </Box>
          <Button 
            variant="contained" 
            disableElevation 
            onClick={handleAddIngredient} 
            sx={{ 
              backgroundColor: "#0f766e", 
              minWidth: "48px", 
              height: "48px", 
              borderRadius: "10px", 
              color: "white", 
              "&:hover": { backgroundColor: "#0d645d" } 
            }}
          >
            <Plus size={20} />
          </Button>
        </Box>
      </Box>

      {/* قائمة عرض المواد المضافة */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <ClipboardList size={18} color="#475569" />
          <Typography variant="subtitle2" sx={{ fontWeight: "700", color: "#475569", fontSize: "0.9rem" }}>
            المواد الفعالة الحالية ({activeIngredients.length})
          </Typography>
        </Box>

        {activeIngredients.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {activeIngredients.map((ing) => (
              <Box 
                key={ing.ingredientId} 
                sx={{ 
                  display: "flex", 
                  gap: 2, 
                  alignItems: "center", 
                  p: 2, 
                  backgroundColor: "#ffffff", 
                  borderRadius: "12px", 
                  border: "1px solid #e2e8f0",
                  "&:hover": { borderColor: "#cbd5e1" }
                }}
              >
                <Box sx={{ flex: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#0f766e" }} />
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>
                    {ing.name}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <CustomTextField 
                    type="number" 
                    label="التركيز" 
                    value={ing.strengthValue} 
                    onChange={(val) => {
                      const updated = activeIngredients.map(i => i.ingredientId === ing.ingredientId ? { ...i, strengthValue: val } : i);
                      setActiveIngredients(updated);
                    }} 
                  />
                </Box>

                <Box sx={{ flex: 1.2 }}>
                  <CustomAutocomplete
                    label="الوحدة" 
                    options={allUnits} 
                    value={ing.unitObj}
                    onChange={(val) => {
                      const updated = activeIngredients.map(i => i.ingredientId === ing.ingredientId ? { ...i, unitObj: val as UnitOption } : i);
                      setActiveIngredients(updated);
                    }}
                    getOptionLabel={(opt) => opt.label || ""}
                    isOptionEqualToValue={(opt, val) => opt.id === val?.id}
                  />
                </Box>

                <IconButton 
                  onClick={() => handleRemoveIngredient(ing.ingredientId)} 
                  sx={{ 
                    color: "#ef4444", 
                    backgroundColor: "#fef2f2", 
                    borderRadius: "8px", 
                    p: 1, 
                    "&:hover": { backgroundColor: "#fee2e2" } 
                  }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ 
            textAlign: "center", py: 4, backgroundColor: "#ffffff", borderRadius: "16px", border: "2px dashed #e2e8f0",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 1
          }}>
            <Beaker size={28} color="#94a3b8" style={{ strokeWidth: 1.5 }} />
            <Typography sx={{ color: "#64748b", fontSize: "0.85rem", fontWeight: "600" }}>
              لا يوجد مواد فعالة مركبة حالياً
            </Typography>
            <Typography sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
              استخدم النموذج أعلاه لتركيب المكونات الطبية للدواء.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};