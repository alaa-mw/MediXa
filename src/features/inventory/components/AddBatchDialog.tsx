
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { DeleteIcon } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../../shared/providers/useSnackbar";
import usePostData from "../../../shared/hooks/usePostData";
import { RTLDatePicker } from "../../../shared/layout/RTLDatePicker";
import { CustomCounterField } from "../../../shared/layout/CustomCounterField";

interface BatchRow {
  batchNumber?: string;
  initialQuantity: number;
  expiryDate: string | null;
  receivedDate: string | null;
  notes?: string;
}

interface AddOpeningStockDialogProps {
  open: boolean;
  onClose: () => void;
  pharmacyDrugId: number | null;
  drugName?: string;
}

export const AddOpeningStockDialog: React.FC<AddOpeningStockDialogProps> = ({
  open,
  onClose,
  pharmacyDrugId,
  drugName,
}) => {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // تهيئة قائمة الدفعات مع دفعة افتراضية واحدة
  const [batches, setBatches] = useState<BatchRow[]>([
    {
      initialQuantity: 10,
      expiryDate: null,
      receivedDate: new Date().toISOString().split("T")[0],
    },
  ]);

  // إعادة ضبط الحالة عند فتح النافذة
  useEffect(() => {
    if (open) {
      setBatches([
        {
          initialQuantity: 10,
          expiryDate: null,
          receivedDate: new Date().toISOString().split("T")[0],
        },
      ]);
    }
  }, [open]);

  // حساب مجموع الكميات
  const totalQuantity = batches.reduce(
    (sum, b) => sum + (Number(b.initialQuantity) || 0),
    0
  );

  // إدارة التغييرات في صفوف الجدول
  const handleAddBatch = () => {
    setBatches((prev) => [
      ...prev,
      {
        initialQuantity: 1,
        expiryDate: null,
        receivedDate: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const handleRemoveBatch = (index: number) => {
    if (batches.length <= 1) return;
    setBatches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBatch = (
    index: number,
    field: keyof BatchRow,
    value: any
  ) => {
    setBatches((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  // الربط مع الـ API
  const { mutate: addOpeningStock, isPending } = usePostData(
    "/batch/opening-stock"
  );

  const handleSubmit = () => {
    if (!pharmacyDrugId) {
      showSnackbar("معرف الدواء غير محدد!", "error");
      return;
    }

    // التحقق من إدخال تاريخ الصلاحية لكافة الدفعات
    const hasInvalidDate = batches.some((b) => !b.expiryDate);
    if (hasInvalidDate) {
      showSnackbar("يرجى تحديد تاريخ انتهاء الصلاحية لجميع الدفعات", "error");
      return;
    }

    // صياغة الـ Payload
    const payload = {
      batches: batches.map((b) => ({
        pharmacyDrugId: pharmacyDrugId,
        initialQuantity: Number(b.initialQuantity),
        expiryDate: b.expiryDate,
        ...(b.receivedDate && { receivedDate: b.receivedDate }),
        ...(b.batchNumber && { batchNumber: b.batchNumber }),
        ...(b.notes && { notes: b.notes }),
      })),
    };

    addOpeningStock(payload, {
      onSuccess: () => {
        showSnackbar("تمت إضافة بضاعة أول المدة بنجاح!", "success");

        // 1. تحديث كاش دفعات هذا الدواء الخاص تحديداً بالـ ID لكي تظهر فوراً بالصفحة
        if (pharmacyDrugId) {
          queryClient.invalidateQueries({
            queryKey: [`/batch/pharmacy-drug/${pharmacyDrugId}`],
          });
        }

        // 2. تحديث قائمة الأدوية الرئيسية
        queryClient.invalidateQueries({ queryKey: ["/pharmacy-drugs"] });

        onClose();
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.message || "حدث خطأ أثناء حفظ الدفعات!";
        showSnackbar(msg, "error");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A" }}>
            إضافة دفعات  {drugName ? `- ${drugName}` : ""}
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
            أدخل تواريخ الصلاحية والكميات الخاصة بكل دفعة يتم إدخالها للمخزن.
          </Typography>
        </Box>
        <IconButton onClick={onClose} disabled={isPending}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ width: "100%", mx: "auto", mt: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3.5,
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRight: `5px solid ${theme.palette.primary.main}`,
            }}
          >
            {/* بطاقة إجمالي الكمية */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2.5,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  px: 2.5,
                  bgcolor: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="caption" sx={{ color: "#166534", fontWeight: 600 }}>
                  مجموع الكمية الكلية
                </Typography>
                <Typography variant="h6" sx={{ color: "#15803D", fontWeight: 800 }}>
                  {totalQuantity} علبة
                </Typography>
              </Paper>
            </Box>

            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1.8fr 2fr 2fr 1.5fr",
                gap: 2,
                alignItems: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                p: 1.5,
                px: 2,
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: 14,
                color: theme.palette.primary.dark || "#1E3A8A",
                mb: 2,
              }}
            >
              <Box>الكمية (علبة)</Box>
              <Box>تاريخ الاستلام</Box>
              <Box>تاريخ انتهاء الصلاحية</Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: "18px !important" }} />}
                  onClick={handleAddBatch}
                  sx={{
                    fontWeight: 700,
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    minWidth: "fit-content",
                    bgcolor: theme.palette.primary.main,
                    color: "#FFFFFF",
                    borderRadius: 2,
                    textTransform: "none",
                    px: 2,
                    py: 0.6,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                      boxShadow: "none",
                    },
                  }}
                >
                  إضافة دفعة
                </Button>
              </Box>
            </Box>

            {/* Rows */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {batches.map((batch, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.8fr 2fr 2fr 1.5fr",
                    gap: 2,
                    alignItems: "center",
                    p: 1.5,
                    px: 2,
                    borderRadius: 2.5,
                    border: "1px solid #E2E8F0",
                    bgcolor: "#FFFFFF",
                  }}
                >
                  <CustomCounterField
                    value={batch.initialQuantity}
                    onChange={(val) =>
                      handleUpdateBatch(idx, "initialQuantity", val)
                    }
                    height="40px"
                  />

                  <RTLDatePicker
                    value={batch.receivedDate}
                    onChange={(date) =>
                      handleUpdateBatch(idx, "receivedDate", date)
                    }
                  />

                  <RTLDatePicker
                    value={batch.expiryDate}
                    onChange={(date) =>
                      handleUpdateBatch(idx, "expiryDate", date)
                    }
                  />

                  <Box sx={{ textAlign: "center" }}>
                    <Tooltip
                      title={
                        batches.length <= 1
                          ? "يلزم وجود دفعة واحدة على الأقل"
                          : "حذف هذه الدفعة"
                      }
                    >
                      <span>
                        <IconButton
                          color="error"
                          disabled={batches.length <= 1}
                          onClick={() => handleRemoveBatch(idx)}
                          size="small"
                          sx={{
                            bgcolor: "#FEF2F2",
                            "&:hover": { bgcolor: "#FEE2E2" },
                          }}
                        >
                          <DeleteIcon size={18} />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isPending}
          variant="outlined"
          sx={{ borderRadius: 2.5, px: 3 }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          variant="contained"
          sx={{ borderRadius: 2.5, px: 4, fontWeight: 700 }}
        >
          {isPending ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "حفظ الدفعات"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};