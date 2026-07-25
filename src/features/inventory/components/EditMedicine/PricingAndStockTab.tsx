import React from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { CustomTextField } from "../CustomTextField";

interface PricingAndStockTabProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const PricingAndStockTab: React.FC<PricingAndStockTabProps> = ({ formData, setFormData }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          type="number" 
          label="حد الأمان الأدنى (تنبيه النقص)" 
          value={formData.minStockAlert} 
          onChange={(val) => setFormData((p: any) => ({ ...p, minStockAlert: parseInt(val) || 0 }))} 
        />
      </Box>
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          type="number" 
          label="تنبيه انتهاء الصلاحية (أيام)" 
          value={formData.expiryDateAlarm} 
          onChange={(val) => setFormData((p: any) => ({ ...p, expiryDateAlarm: parseInt(val) || 0 }))} 
        />
      </Box>
      
      <Box sx={{ 
        gridColumn: "span 6", backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', px: 3, py: 2, display: 'flex', alignItems: 'center'
      }}>
        <FormControlLabel 
          control={
            <Switch 
              checked={formData.sellPart} 
              onChange={(e) => setFormData((p: any) => ({ ...p, sellPart: e.target.checked }))}  
              sx={{ "& .Mui-checked": { color: "#0f766e !important" }, "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#0f766e !important" } }} 
            />
          } 
          label={<Typography sx={{ fontWeight: "600", fontSize: "0.85rem", color: "#334155" }}>إمكانية البيع بالتجزئة (أجزاء من العلبة)</Typography>} 
        />
      </Box>

      <Box sx={{ 
        gridColumn: "span 6", backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', px: 3, py: 2, display: 'flex', alignItems: 'center'
      }}>
        <FormControlLabel 
          control={
            <Switch 
              checked={formData.isActive} 
              onChange={(e) => setFormData((p: any) => ({ ...p, isActive: e.target.checked }))} 
              sx={{ "& .Mui-checked": { color: "#0f766e !important" }, "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#0f766e !important" } }} 
            />
          } 
          label={<Typography sx={{ fontWeight: "600", fontSize: "0.85rem", color: "#334155" }}>إتاحة الدواء للبيع حالياً بالصيدلية</Typography>} 
        />
      </Box>

      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          type="number" 
          label="سعر المستهلك (ل.س)" 
          value={formData.consumerPrice} 
          onChange={(val) => setFormData((p: any) => ({ ...p, consumerPrice: parseInt(val) || 0 }))} 
        />
      </Box>
      
      <Box sx={{ gridColumn: "span 6" }}>
        <CustomTextField 
          label="ملاحظات تنظيمية داخلية للصيدلية" 
          value={formData.notes} 
          onChange={(val) => setFormData((p: any) => ({ ...p, notes: val }))} 
        />
      </Box>
    </Box>
  );
};