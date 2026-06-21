// features/inventory/components/NotFoundMedicineDialog.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { CustomStepper } from "./CustomStepper";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomTextField } from "../CustomTextField";
import { CloseButton } from "../CloseButton";
import { MedicineStockForm } from "./MedicineStockForm";
import type { BatchRow } from "./BatchTable";

interface NotFoundMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  alertLimit: number;
  setAlertLimit: (val: number) => void;
  expiryAlertMonths: number;
  setExpiryAlertMonths: (val: number) => void;
  allowRetail: boolean;
  setAllowRetail: (val: boolean) => void;
  batches: BatchRow[];
  onAddNewBatch: () => void;
  onDeleteBatch: (id: string) => void;
  onUpdateBatchField: (
    id: string,
    field: keyof BatchRow,
    value: string | number
  ) => void;
}

export const NotFoundMedicineDialog: React.FC<NotFoundMedicineDialogProps> = (props) => {
  const { open, onClose, activeStep, setActiveStep } = props;

  const [tradeName, setTradeName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState("");
  const [formType, setFormType] = useState("");
  const [barcode, setBarcode] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [consumerPrice, setConsumerPrice] = useState("");

  const categoriesList = [
    "مسكنات وآلام",
    "مضادات حيوية",
    "الفيتامينات والمكملات",
    "أدوية السكري",
    "أدوية الضغط",
  ];
  const formTypesList = [
    "أقراص (Tablets)",
    "كبسولات (Capsules)",
    "شراب (Syrup)",
    "حقن (Injection)",
    "مرهم (Ointment)",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "28px",
            p: 1,
            position: "relative",
            overflowX: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,.08)",
          },
        },
      }}
    >
      <CloseButton onClick={onClose} />

      <DialogContent sx={{ p: 4, overflowX: "hidden" }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              textAlign: "center",
              mb: 5,
            }}
          >
            إضافة منتج جديد يدوياً
          </Typography>

          <CustomStepper activeStep={activeStep} />
        </Box>

        <Box
          key={activeStep}
          sx={{
            animation: "fadeSlide .35s ease",
            "@keyframes fadeSlide": {
              from: { opacity: 0, transform: "translateY(15px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {activeStep === 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <CustomTextField
                label="الاسم التجاري"
                placeholder="Panadol"
                value={tradeName}
                onChange={setTradeName}
              />

              <CustomTextField
                label="الاسم العلمي"
                placeholder="Paracetamol"
                value={scientificName}
                onChange={setScientificName}
              />

              <CustomAutocomplete
                label="الفئة"
                options={categoriesList}
                value={category}
                onChange={setCategory}
              />

              <CustomAutocomplete
                label="الشكل الصيدلاني"
                options={formTypesList}
                value={formType}
                onChange={setFormType}
              />

              <Box sx={{ gridColumn: { sm: "span 2" } }}>
                <CustomTextField
                  label="الباركود الدولي"
                  placeholder="628110111..."
                  value={barcode}
                  onChange={setBarcode}
                />
              </Box>

              <CustomTextField
                label="سعر الشراء"
                type="number"
                value={purchasePrice}
                onChange={setPurchasePrice}
              />

              <CustomTextField
                label="سعر المستهلك"
                type="number"
                value={consumerPrice}
                onChange={setConsumerPrice}
              />
            </Box>
          ) : (
            <Box sx={{ py: 1 }}>
              <MedicineStockForm {...props} />
            </Box>
          )}
        </Box>

        {/* شريط الأزرار السفلي مع توحيد الأطوال */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Button onClick={onClose} sx={{ color: "#64748b", fontWeight: 700 }}>
            إلغاء
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {activeStep === 1 && (
              <Button
                variant="outlined"
                startIcon={<ArrowForwardIcon />}
                onClick={() => setActiveStep(0)}
                sx={{
                  borderRadius: "14px",
                  width: "160px", // 🌟 توحيد العرض هنا
                  py: 1.2,        // توحيد الارتفاع الداخلي مع الزر الثاني
                  borderColor: "#cbd5e1",
                  color: "#475569",
                  fontWeight: 700,
                }}
              >
                السابق
              </Button>
            )}

            <Button
              variant="contained"
              endIcon={activeStep === 0 ? <ArrowBackIcon /> : undefined}
              onClick={() => {
                if (activeStep === 0) {
                  setActiveStep(1);
                } else {
                  console.log({
                    tradeName,
                    scientificName,
                    category,
                    formType,
                    barcode,
                    purchasePrice,
                    consumerPrice,
                  });
                  onClose();
                }
              }}
              sx={{
                backgroundColor: "secondary.dark",
                "&:hover": { backgroundColor: "#1e293b" },
                borderRadius: "12px",
                width: "160px", // 🌟 توحيد العرض هنا
                py: 1.2,        // توحيد الارتفاع الداخلي مع زر السابق
                fontWeight: "bold",
                boxShadow: "none",
              }}
            >
              {activeStep === 0 ? "الخطوة التالية" : "تأكيد حفظ الدواء"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};