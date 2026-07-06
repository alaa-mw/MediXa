
import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, Button, IconButton, FormControlLabel, Switch, CircularProgress
} from "@mui/material";
import { X, Settings, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query"; 
import type { PharmacyDrug } from "../../types/inventory";
import { CustomTextField } from "../CustomTextField";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";
import usePostData from "../../../../shared/hooks/usePostData";


interface EditGlobalMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  medicine: PharmacyDrug;
}

export const EditGlobalMedicineDialog: React.FC<EditGlobalMedicineDialogProps> = ({ open, onClose, medicine }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient(); 

  const drugId = medicine?.pharmacyDrugId;

  const { mutate: updateDrug, isPending } = usePostData<any>(
    `/pharmacy-drugs/update-drug/${drugId}`
  );

  const [formData, setFormData] = useState({
    minStockAlert: 0,
    sellPart: true,
    consumerPrice: 0,
    expiryDateAlarm: 0,
    isActive: true,
    notes: "",
  });

  useEffect(() => {
    if (medicine && open) {
      setFormData({
        minStockAlert: medicine.pharmacyDrugDetails?.minStockAlert ?? 0,
        sellPart: medicine.pharmacyDrugDetails?.sellPart ?? true,
        consumerPrice: medicine.pharmacyDrugDetails?.consumerPrice ?? 0,
        expiryDateAlarm: medicine.pharmacyDrugDetails?.expiryDateAlarm ?? 0,
        isActive: medicine.isDrugActive ?? true,
        notes: medicine.pharmacyDrugDetails?.notes || "",
      });
    }
  }, [medicine, open]);

  const handleSave = () => {
    const globalPayload = {
      ...formData,
    };

    updateDrug(globalPayload, {
      onSuccess: () => {
        showSnackbar("تم تعديل بيانات الدواء بنجاح!", "success");

        
        queryClient.invalidateQueries({
          queryKey: ["/pharmacy-drugs/get-all-pharmacy-drugs"],
        });

        onClose(); 
      },
      onError: (error: any) => {
        showSnackbar(error?.message || "حدث خطأ أثناء تعديل الدواء", "error");
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: dialogStyles } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: "10px", backgroundColor: "#eff6ff", display: "flex" }}>
            <Settings size={20} color="#3b82f6" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "700", fontSize: "1.1rem" }}>تعديل دواء عام</Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#94a3b8" }} disabled={isPending}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
          <Box sx={{ gridColumn: "span 2" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "600", color: "#64748b", mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
              <AlertTriangle size={16} /> أسعار البيع وضوابط المخزن
            </Typography>
          </Box>

          <CustomTextField
            type="number"
            label="سعر المستهلك الحالي (ل.س)"
            value={formData.consumerPrice}
            onChange={(val) => setFormData((p) => ({ ...p, consumerPrice: parseInt(val) || 0 }))}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <FormControlLabel
              control={<Switch checked={formData.sellPart} onChange={(e) => setFormData((p) => ({ ...p, sellPart: e.target.checked }))} color="error" />}
              label="بيع أجزاء"
            />
            <FormControlLabel
              control={<Switch checked={formData.isActive} onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))} color="success" />}
              label="تفعيل"
            />
          </Box>

          <CustomTextField
            type="number"
            label="حد التنبيه الأدنى"
            value={formData.minStockAlert}
            onChange={(val) => setFormData((p) => ({ ...p, minStockAlert: parseInt(val) || 0 }))}
          />
          <CustomTextField
            type="number"
            label="تنبيه انتهاء الصلاحية (أيام)"
            value={formData.expiryDateAlarm}
            onChange={(val) => setFormData((p) => ({ ...p, expiryDateAlarm: parseInt(val) || 0 }))}
          />

          <Box sx={{ gridColumn: "span 2" }}>
            <CustomTextField
              label="ملاحظات التحديث"
              value={formData.notes}
              onChange={(val) => setFormData((p) => ({ ...p, notes: val }))}
              placeholder="اكتب سبب التعديل..."
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1.5 }}>
        <Button onClick={onClose} variant="text" sx={{ color: "#64748b", fontWeight: "600" }} disabled={isPending}>إلغاء</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ borderRadius: "12px", px: 4, fontWeight: "600" }}
        >
          {isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const dialogStyles = {
  borderRadius: "24px",
  p: 1.5,
  boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.08)",
  background: "linear-gradient(to bottom, #ffffff, #fcfcfd)",
};

