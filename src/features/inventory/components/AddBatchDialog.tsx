
import React, { useState, useEffect } from "react"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { CustomTextField } from "./CustomTextField";
import { RTLDatePicker } from "../../../shared/layout/RTLDatePicker";

interface AddBatchDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isPending?: boolean;
  drugName?: string;
}

const initialFormState = {
  quantity: "",
  expiryDate: "", 
  supplierName: "",
  purchasePrice: "",
  invoiceNumber: "",
  receivedDate: new Date().toISOString().split("T")[0],
};

export const AddBatchDialog: React.FC<AddBatchDialogProps> = ({
  open,
  onClose,
  onSave,
  isPending = false,
  drugName = "",
}) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!open) {
      setFormData(initialFormState);
    }
  }, [open]);

  const handleSave = () => {
    onSave({
      initialQuantity: parseInt(formData.quantity) || 0,
      expiryDate: formData.expiryDate,
      supplierName: formData.supplierName,
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      invoiceNumber: formData.invoiceNumber,
      receivedDate: formData.receivedDate,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
          },
        },
      }}
    >
      {/* رأس النافذة المنبثقة الناعم */}
      <DialogTitle sx={{ p: 3, pb: 2, textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>
        <Typography variant="h6" sx={{ fontWeight: "700", fontSize: "1.1rem", color: "#1e293b" }}>
          إضافة دفعة جديدة
        </Typography>
        {drugName && (
          <Typography variant="caption" sx={{ color: "#0f766e", fontWeight: "700", mt: 0.5, display: "block" }}>
            المستحضر: {drugName}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dir="rtl" sx={{ p: 4, py: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mt: 1,
          }}
        >
          {/* عنوان المجموعة الأولى */}
          <Typography variant="body2" sx={{ gridColumn: "1 / -1", fontWeight: "700", color: "#64748b", mb: -1 }}>
            بيانات المخزون والصلاحية
          </Typography>

          {/* 1. الكمية */}
          <CustomTextField
            type="number"
            label="الكمية الابتدائية"
            placeholder="أدخل عدد الوحدات..."
            value={formData.quantity}
            onChange={(val) => setFormData((p) => ({ ...p, quantity: val }))}
          />

          {/* 2. تاريخ الانتهاء */}
          <RTLDatePicker
            label="تاريخ انتهاء الصلاحية"
            value={formData.expiryDate || null}
            minDate={new Date()}
            onChange={(dateStr) => setFormData((p) => ({ ...p, expiryDate: dateStr }))}
          />

          <Box sx={{ gridColumn: "1 / -1", borderTop: "1px solid #f1f5f9", my: 1 }} />

          {/* عنوان المجموعة الثانية */}
          <Typography variant="body2" sx={{ gridColumn: "1 / -1", fontWeight: "700", color: "#64748b", mb: -1 }}>
            تفاصيل التوريد والفاتورة
          </Typography>

          {/* 3. المورد */}
          <CustomTextField
            label="المورد / المستودع"
            placeholder="اسم مستودع الأدوية..."
            value={formData.supplierName}
            onChange={(val) => setFormData((p) => ({ ...p, supplierName: val }))}
          />

          {/* 4. سعر الشراء */}
          <CustomTextField
            type="number"
            label="سعر شراء الوحدة (ل.س)"
            placeholder="تكلفة القطعة الواحدة..."
            value={formData.purchasePrice}
            onChange={(val) => setFormData((p) => ({ ...p, purchasePrice: val }))}
          />

          {/* 5. رقم الفاتورة */}
          <CustomTextField
            label="رقم فاتورة الشراء"
            placeholder="رقم المستند المرفق..."
            value={formData.invoiceNumber}
            onChange={(val) => setFormData((p) => ({ ...p, invoiceNumber: val }))}
          />

          {/* 6. تاريخ الإدخال للمخزن */}
          <RTLDatePicker
            label="تاريخ الاستلام والإدخال"
            value={formData.receivedDate || null}
            onChange={(dateStr) => setFormData((p) => ({ ...p, receivedDate: dateStr }))}
          />
        </Box>
      </DialogContent>

      {/* أزرار التحكم والـ Actions */}
      <DialogActions
        sx={{
          p: 2,
          px: 4,
          gap: 1.5,
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        <Button
          onClick={onClose}
          variant="text"
          disabled={isPending}
          sx={{ color: "#64748b", fontWeight: "600", px: 3 }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          disabled={isPending}
          sx={{
            borderRadius: "12px",
            px: 4,
            py: 1,
            fontWeight: "600",
          }}
        >
          {isPending ? <CircularProgress size={20} color="inherit" /> : "إضافة الدفعة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBatchDialog;