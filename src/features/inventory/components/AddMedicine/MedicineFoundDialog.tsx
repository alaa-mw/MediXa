
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CloseButton } from "../CloseButton";
import { NumberSpinner } from "./NumberSpinner";
import { CustomTextField } from "../CustomTextField";
import type { CentralDrugData } from "../../types/centralDrug";
import { BatchesTable } from "./BatchTable";
import { useCreatePharmacyDrug } from "../../hooks/useCreatePharmacyDrug";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";
import { useMedicineBatches } from "../../hooks/useAddMedicineBatche";

export interface FoundDrugPreview {
  generalDrugId: number;
  tradeName?: string;
  dosageForm?: {
    dosageFormName?: string;
  } | null;
}

interface FoundMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  foundDrug: FoundDrugPreview | CentralDrugData | null;
  onSuccess?: (createdDrug: unknown) => void;
}

export const FoundMedicineDialog: React.FC<FoundMedicineDialogProps> = ({
  open,
  onClose,
  foundDrug,
  onSuccess,
}) => {
  const [alertLimit, setAlertLimit] = useState<number>(10);
  const [expiryAlertMonths, setExpiryAlertMonths] = useState<number>(3);
  const [allowRetail, setAllowRetail] = useState(false);

  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const { showSnackbar } = useSnackbar();

  const { createPharmacyDrug, loading, error, success } =
    useCreatePharmacyDrug();

  const {
    batches,
    addNewBatchRow,
    deleteBatchRow,
    updateBatchField,
    totalQuantity,
    resetBatches,
  } = useMedicineBatches();

  useEffect(() => {
    if (success) {
      showSnackbar("تمت إضافة الدواء إلى مخزون الصيدلية بنجاح!", "success");
      // eslint-disable-next-line react-hooks/immutability
      handleClose();      
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error]);

  // const handleClose = () => {
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleClose = useCallback(() => {
    resetBatches();
    setPurchasePrice("");
    setSalePrice("");
    setLocation("");
    setNote("");
    setAllowRetail(false);
    onClose();
  }, [onClose, resetBatches]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error, showSnackbar]);

  const handleSubmitSave = async () => {
    if (!foundDrug?.generalDrugId) {
      showSnackbar("عذراً، معرّف الدواء غير موجود.", "error");
      return;
    }

    // if (!purchasePrice || !salePrice) {
    //   showSnackbar("يرجى إدخال أسعار الشراء والبيع أولاً.", "warning");
    //   return;
    // }

    const formattedBatches = batches.map((b) => ({
      initialQuantity: Number(b.quantity || 0),
      expiryDate:
        b.expiryDate === "yyyy-mm-dd" || !b.expiryDate
          ? new Date().toISOString().split("T")[0]
          : b.expiryDate,
      receivedDate:
        b.receivingDate === "yyyy-mm-dd" || !b.receivingDate
          ? new Date().toISOString().split("T")[0]
          : b.receivingDate,
    }));

    const payload = {
      generalDrugId: foundDrug.generalDrugId,
      minStockAlert: Number(alertLimit),
      sellPart: allowRetail,
      netPrice: Number(purchasePrice || 0),
      consumerPrice: Number(salePrice || 0),
      expiryDateAlarm: Number(expiryAlertMonths),
      notes: note,
      storageLocation: location,
      batches: formattedBatches,
    };

    try {
      const createdDrug = await createPharmacyDrug(payload);
      if (onSuccess) {
        onSuccess(createdDrug);
      }
      showSnackbar("تمت إضافة الدواء إلى مخزون الصيدلية بنجاح!", "success");
      handleClose();
    } catch (err) {
      console.error("طلب الـ POST واجه مشكلة:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ p: 4, pt: 4, overflowX: "hidden" }}>
        {/* ترويسة معلومات الدواء */}
        <Box sx={{ textAlign: "right", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}
          >
            {foundDrug?.tradeName || "اسم الدواء"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#94a3b8" }}>
            {foundDrug?.dosageForm?.dosageFormName || "المادة الفعالة"}
          </Typography>
        </Box>

        {/* سطر العدادات الرقمية */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          <NumberSpinner
            label="حد التنبيه (نقص المادة)"
            value={alertLimit}
            onChange={setAlertLimit}
          />
          <NumberSpinner
            label="تنبيه انتهاء الصلاحية قبل (بالآيام)"
            value={expiryAlertMonths}
            onChange={setExpiryAlertMonths}
          />
        </Box>

        {/* شبكة حقول البيانات الأساسية للمخزون */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          <CustomTextField
            label="سعر الشراء"
            type="number"
            value={purchasePrice}
            onChange={setPurchasePrice}
          />
          <CustomTextField
            label="سعر البيع"
            type="number"
            value={salePrice}
            onChange={setSalePrice}
          />
          <CustomTextField
            label="الموقع في المستودع"
            placeholder="مثال: الرف العلوي"
            value={location}
            onChange={setLocation}
          />
          <CustomTextField
            label="ملاحظة"
            placeholder="اكتب ملاحظتك هنا..."
            value={note}
            onChange={setNote}
          />

          <Box
            sx={{
              gridColumn: { xs: "span 1", sm: "span 2" },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={allowRetail}
                  onChange={(e) => setAllowRetail(e.target.checked)}
                  sx={{
                    color: "#cbd5e1",
                    "&.Mui-checked": { color: "#0f172a" },
                  }}
                />
              }
              label={
                <Typography
                  sx={{ fontWeight: 600, color: "#334155", fontSize: "14px" }}
                >
                  هل يمكن البيع بالتجزئة؟
                </Typography>
              }
              sx={{ direction: "rtl", marginRight: 0, gap: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "#f1f5f9" }} />

        {/* قسم جدول الدفعات */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: "#1e293b" }}
          >
            جدولة الدفعات الحالية
          </Typography>
          <Button
            variant="contained"
            onClick={addNewBatchRow}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "tertiary.dark",
              "&:hover": { backgroundColor: "#0d9488" },
              borderRadius: "12px",
              px: 2.5,
              py: 0.8,
              fontWeight: "bold",
              boxShadow: "none",
            }}
          >
            إضافة دفعة
          </Button>
        </Box>

        <BatchesTable
          batches={batches}
          onUpdateField={updateBatchField}
          onDeleteRow={deleteBatchRow}
        />

        {/* تذييل الـ Dialog */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, color: "#64748b" }}>
            إجمالي الكمية المدخلة:{" "}
            <span
              style={{ color: "#0284c7", fontSize: "24px", fontWeight: "800" }}
            >
              {totalQuantity}
            </span>{" "}
            علبة
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleClose}
              disabled={loading || success}
              sx={{ color: "#64748b", fontWeight: 700 }}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitSave}
              disabled={loading || success} // شل الحركة في حال الحفظ أو النجاح
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                backgroundColor: "secondary.dark",
                px: 4,
                borderRadius: "14px",
                "&:hover": { backgroundColor: "secondary.main" },
              }}
            >
              {loading ? "جاري الحفظ..." : "تأكيد حفظ الدواء"}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
