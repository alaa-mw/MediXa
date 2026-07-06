// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Typography,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import AddIcon from "@mui/icons-material/Add";

// import { CustomStepper } from "./CustomStepper";
// import { CustomAutocomplete } from "../CustomAutocomplete";
// import { CustomTextField } from "../CustomTextField";
// import { CloseButton } from "../CloseButton";
// import { NumberSpinner } from "./NumberSpinner";
// import { BatchesTable } from "./BatchTable";
// import { useMedicineBatches } from "../../hooks/useMedicineBatches";
// import { useSnackbar } from "../../../../shared/providers/useSnackbar";
// import {
//   useCreatePrivateDrug,
//   type CreatePrivateDrugPayload,
// } from "../../hooks/useCreatePrivateDrug";
// import {
//   useFetchDrugCategories,
//   type CategoryOption,
// } from "../../hooks/useFetchDrugCategories";

// // 🟢 استيراد الـ Hook الجديد والـ Interface الخاص بالأشكال الصيدلانية
// import {
//   useFetchDosageForms,
//   type DosageFormOption,
// } from "../../hooks/useFetchDosageForms";

// interface NotFoundMedicineDialogProps {
//   open: boolean;
//   onClose: () => void;
//   barcode: string;
// }

// export const NotFoundMedicineDialog: React.FC<NotFoundMedicineDialogProps> = ({
//   open,
//   onClose,
//   barcode: initialBarcode,
// }) => {
//   const [activeStep, setActiveStep] = useState(0);

//   const { showSnackbar } = useSnackbar();

//   const {
//     categories,
//     fetchCategories,
//     loading: loadingCategories, // 🟢 تفعيل الـ loading للاستخدام في الـ placeholder
//   } = useFetchDrugCategories();

//   // 🟢 استدعاء الـ Hook الخاص بجلب الأشكال الصيدلانية
//   const {
//     dosageForms,
//     fetchDosageForms,
//     loading: loadingDosageForms,
//   } = useFetchDosageForms();

//   const {
//     createPrivateDrug,
//     loading: isSaving,
//     error,
//     success,
//   } = useCreatePrivateDrug();

//   // 🟢 جلب الفئات والأشكال الصيدلانية من السيرفر بمجرد فتح الدايلوج
//   useEffect(() => {
//     if (open) {
//       fetchCategories();
//       fetchDosageForms();
//     }
//   }, [open, fetchCategories, fetchDosageForms]);

//   useEffect(() => {
//     if (success) {
//       showSnackbar("تمت إضافة الدواء الخاص والجديد بنجاح!", "success");
//       handleClose();
//     }
//   }, [success]);

//   useEffect(() => {
//     if (error) {
//       showSnackbar(error, "error");
//     }
//   }, [error]);

//   // حقول الخطوة الأولى (Step 0)
//   const [tradeName, setTradeName] = useState("");
//   const [scientificName, setScientificName] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<
//     CategoryOption[]
//   >([]);

//   // 🟢 تحويل الـ State لتستقبل كائن الـ DosageFormOption المختار بدلاً من النص
//   const [selectedDosageForm, setSelectedDosageForm] =
//     useState<DosageFormOption | null>(null);

//   const [barcode, setBarcode] = useState(initialBarcode || "");
//   const [purchasePrice, setPurchasePrice] = useState("");
//   const [consumerPrice, setConsumerPrice] = useState("");
//   const [unitsPerBox, setUnitsPerBox] = useState("");

//   // حقول الخطوة الثانية (Step 1)
//   const [alertLimit, setAlertLimit] = useState<number>(10);
//   const [expiryAlertMonths, setExpiryAlertMonths] = useState<number>(3);
//   const [allowRetail, setAllowRetail] = useState(false);
//   const [isRx, setIsRx] = useState(false);
//   const [location, setLocation] = useState("");
//   const [note, setNote] = useState("");

//   const {
//     batches,
//     addNewBatchRow,
//     deleteBatchRow,
//     updateBatchField,
//     resetBatches,
//   } = useMedicineBatches();

//   const handleClose = () => {
//     setActiveStep(0);
//     resetBatches();
//     setTradeName("");
//     setScientificName("");
//     setSelectedCategories([]);
//     setSelectedDosageForm(null); // 🟢 ريسيت للشكل الصيدلاني المختار
//     setPurchasePrice("");
//     setConsumerPrice("");
//     setUnitsPerBox("");
//     setIsRx(false);
//     setAllowRetail(false);
//     setLocation("");
//     setNote("");
//     onClose();
//   };

//   const handleSaveMedicine = async () => {
//     // 🟢 التحقق من تعبئة الحقول الأساسية والشكل الصيدلاني لمنع الـ Bad Requests
//     if (!tradeName || selectedCategories.length === 0 || !selectedDosageForm) {
//       showSnackbar(
//         "يرجى إدخال الاسم التجاري، واختيار الفئات والشكل الصيدلاني أولاً.",
//         "warning",
//       );
//       return;
//     }

//     const payload: CreatePrivateDrugPayload = {
//       tradeName: tradeName,
//       barcode: barcode,
//       // 🟢 إرسال الـ ID الخاص بالشكل الصيدلاني المختار ديناميكياً للباك إند
//       dosageFormId: selectedDosageForm.dosageFormId||1,
//       unitsPerBox: Number(unitsPerBox) || 0,
//       isRx: isRx,
//       minStockAlert: alertLimit,
//       sellPart: allowRetail,
//       netPrice: Number(purchasePrice) || 0,
//       consumerPrice: Number(consumerPrice) || 0,
//       expiryDateAlarm: expiryAlertMonths,
//       notes: note,
//       storageLocation: location,
//       categoryIds: selectedCategories.map((cat) => cat.categoryId),
//       ingredients: [],
//       batches: batches.map((b) => ({
//         initialQuantity: Number(b.quantity) || 0,
//         expiryDate:
//           !b.expiryDate || b.expiryDate === "yyyy-mm-dd"
//             ? new Date().toISOString().split("T")[0]
//             : b.expiryDate,
//         receivedDate:
//           !b.receivingDate || b.receivingDate === "yyyy-mm-dd"
//             ? new Date().toISOString().split("T")[0]
//             : b.receivingDate,
//       })),
//     };

//     try {
//       await createPrivateDrug(payload);
//     } catch (err) {
//       console.error("حدث خطأ أثناء إرسال طلب الدواء اليدوي:", err);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <CloseButton onClick={handleClose} />
//       <DialogContent sx={{ p: 4, overflowX: "hidden" }}>
//         {/* العناوين والـ Stepper */}
//         <Box sx={{ mb: 5 }}>
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 800,
//               color: "#0f172a",
//               textAlign: "center",
//               mb: 3,
//             }}
//           >
//             إضافة منتج جديد يدوياً
//           </Typography>
//           <CustomStepper activeStep={activeStep} />
//         </Box>

//         {/* محتوى الخطوات */}
//         <Box key={activeStep}>
//           {activeStep === 0 ? (
//             /* --- الخطوة الأولى: معلومات الدواء الأساسية --- */
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
//                 gap: 3,
//               }}
//             >
//               <CustomTextField
//                 label="الاسم التجاري"
//                 placeholder="Panadol"
//                 value={tradeName}
//                 onChange={setTradeName}
//               />
//               <CustomTextField
//                 label="الاسم العلمي"
//                 placeholder="Paracetamol"
//                 value={scientificName}
//                 onChange={setScientificName}
//               />

//               {/* حقل الفئات (متعدد الاختيارات) */}
//               <CustomAutocomplete<CategoryOption>
//                 label="الفئات"
//                 multiple={true}
//                 options={categories}
//                 value={selectedCategories}
//                 onChange={(newValue) =>
//                   setSelectedCategories(newValue as CategoryOption[])
//                 }
//                 getOptionLabel={(option) => option.categoryName}
//                 isOptionEqualToValue={(option, value) =>
//                   option.categoryId === value.categoryId
//                 }
//                 placeholder={
//                   loadingCategories ? "جاري التحميل..." : "اختر الفئات..."
//                 }
//               />

//               {/* 🟢 حقل الشكل الصيدلاني المحدث (اختيار فردي مربوط بالسيرفر) */}
//               <CustomAutocomplete<DosageFormOption>
//                 label="الشكل الصيدلاني"
//                 multiple={false} // اختيار نوع واحد فقط
//                 options={dosageForms}
//                 value={selectedDosageForm}
//                 onChange={(newValue) =>
//                   setSelectedDosageForm(newValue as DosageFormOption | null)
//                 }
//                 getOptionLabel={(option) => option.dosageFormName}
//                 isOptionEqualToValue={(option, value) =>
//                   option.dosageFormId === value.dosageFormId
//                 }
//                 placeholder={
//                   loadingDosageForms
//                     ? "جاري التحميل..."
//                     : "اختر الشكل الصيدلاني..."
//                 }
//               />

//               <CustomTextField
//                 label="الباركود الدولي"
//                 placeholder="628110111..."
//                 value={barcode}
//                 onChange={setBarcode}
//               />
//               <CustomTextField
//                 label="عدد الوحدات في العلبة"
//                 type="number"
//                 placeholder="مثال: 10"
//                 value={unitsPerBox}
//                 onChange={setUnitsPerBox}
//               />
//               <CustomTextField
//                 label="سعر الشراء"
//                 type="number"
//                 value={purchasePrice}
//                 onChange={setPurchasePrice}
//               />
//               <CustomTextField
//                 label="سعر المستهلك"
//                 type="number"
//                 value={consumerPrice}
//                 onChange={setConsumerPrice}
//               />
//             </Box>
//           ) : (
//             /* --- الخطوة الثانية: المخزون والدفعات --- */
//             <>
//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
//                   gap: 3,
//                   mb: 3,
//                 }}
//               >
//                 <NumberSpinner
//                   label="حد التنبيه (صفر المادة)"
//                   value={alertLimit}
//                   onChange={setAlertLimit}
//                 />
//                 <NumberSpinner
//                   label="تنبيه انتهاء الصلاحية قبل (بالأشهر)"
//                   value={expiryAlertMonths}
//                   onChange={setExpiryAlertMonths}
//                 />
//               </Box>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
//                   gap: 3,
//                   mb: 3,
//                 }}
//               >
//                 <CustomTextField
//                   label="الموقع"
//                   placeholder="مثال: الرف A1"
//                   value={location}
//                   onChange={setLocation}
//                 />
//                 <CustomTextField
//                   label="ملاحظة"
//                   placeholder="اكتب ملاحظتك هنا..."
//                   value={note}
//                   onChange={setNote}
//                 />

//                 <Box
//                   sx={{
//                     gridColumn: { xs: "span 1", sm: "span 2" },
//                     display: "flex",
//                     flexDirection: "row-reverse",
//                      gap: 27,
//                     mt: 1,
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={allowRetail}
//                         onChange={(e) => setAllowRetail(e.target.checked)}
//                         sx={{
//                           color: "#cbd5e1",
//                           "&.Mui-checked": { color: "#0f172a" }, // 🟢 تم وضعها بين علامات تنصيص
//                         }}
//                       />
//                     }
//                     label={
//                       <Typography
//                         sx={{
//                           fontWeight: 600,
//                           color: "#334155",
//                           fontSize: "14px",
//                         }}
//                       >
//                         هل يمكن البيع بالتجزئة؟
//                       </Typography>
//                     }
//                     sx={{ direction: "rtl", marginRight: 0, gap: 1 }}
//                   />

//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={isRx}
//                         onChange={(e) => setIsRx(e.target.checked)}
//                         sx={{
//                           color: "#cbd5e1",
//                           "&.Mui-checked": { color: "#e11d48" }, // 🟢 تم وضعها بين علامات تنصيص
//                         }}
//                       />
//                     }
//                     label={
//                       <Typography
//                         sx={{
//                           fontWeight: 600,
//                           color: "#334155",
//                           fontSize: "14px",
//                         }}
//                       >
//                         هل يحتاج وصفة طبية؟ (isRx)
//                       </Typography>
//                     }
//                     sx={{ direction: "rtl", marginRight: 0, gap: 1 }}
//                   />
//                 </Box>
//               </Box>

//               <Divider sx={{ my: 3, borderColor: "#f1f5f9" }} />

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 2,
//                 }}
//               >
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ fontWeight: 700, color: "#1e293b" }}
//                 >
//                   جدولة الدفعات الحالية
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={addNewBatchRow}
//                   startIcon={<AddIcon />}
//                   sx={{
//                     backgroundColor: "tertiary.dark",
//                     "&:hover": { backgroundColor: "#0d9488" },
//                     borderRadius: "12px",
//                     px: 2.5,
//                     py: 0.8,
//                     fontWeight: "bold",
//                     boxShadow: "none",
//                   }}
//                 >
//                   إضافة دفعة
//                 </Button>
//               </Box>

//               <BatchesTable
//                 batches={batches}
//                 onUpdateField={updateBatchField}
//                 onDeleteRow={deleteBatchRow}
//               />
//             </>
//           )}
//         </Box>

//         {/* أزرار التحكم بالخطوات والتذييل */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
//           <Button
//             onClick={handleClose}
//             disabled={isSaving || success}
//             sx={{ color: "#64748b", fontWeight: 700 }}
//           >
//             إلغاء
//           </Button>
//           <Box sx={{ display: "flex", gap: "12px" }}>
//             {activeStep === 1 && (
//               <Button
//                 variant="outlined"
//                 startIcon={<ArrowForwardIcon />}
//                 onClick={() => setActiveStep(0)}
//                 disabled={isSaving || success}
//                 sx={{ borderRadius: "14px", width: "160px" }}
//               >
//                 السابق
//               </Button>
//             )}
//             <Button
//               variant="contained"
//               endIcon={activeStep === 0 ? <ArrowBackIcon /> : undefined}
//               onClick={() =>
//                 activeStep === 0 ? setActiveStep(1) : handleSaveMedicine()
//               }
//               disabled={isSaving || success}
//               startIcon={
//                 activeStep === 1 &&
//                 isSaving && <CircularProgress size={20} color="inherit" />
//               }
//               sx={{
//                 backgroundColor: "secondary.dark",
//                 width: "160px",
//                 "&:hover": { backgroundColor: "secondary.main" },
//               }}
//             >
//               {isSaving
//                 ? "جاري الحفظ..."
//                 : activeStep === 0
//                   ? "الخطوة التالية"
//                   : "تأكيد حفظ الدواء"}
//             </Button>
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { CustomStepper } from "./CustomStepper";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomTextField } from "../CustomTextField";
import { CloseButton } from "../CloseButton";
import { NumberSpinner } from "./NumberSpinner";
import { BatchesTable } from "./BatchTable";
import { useMedicineBatches } from "../../hooks/useAddMedicineBatche";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";
import {
  useCreatePrivateDrug,
  type CreatePrivateDrugPayload,
} from "../../hooks/useCreatePrivateDrug";
import {
  useFetchDrugCategories,
  type CategoryOption,
} from "../../hooks/useFetchDrugCategories";
import {
  useFetchDosageForms,
  type DosageFormOption,
} from "../../hooks/useFetchDosageForms";
import {
  useFetchIngredients,
  type IngredientOption,
} from "../../hooks/useFetchIngredients";

interface NotFoundMedicineDialogProps {
  open: boolean;
  onClose: () => void;
  barcode: string;
}

const AVAILABLE_UNITS = ["mg", "g", "ml", "mcg", "IU", "%"];

export const NotFoundMedicineDialog: React.FC<NotFoundMedicineDialogProps> = ({
  open,
  onClose,
  barcode: initialBarcode,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const { showSnackbar } = useSnackbar();

  // جلب الـ Hooks والـ APIs
  const {
    categories,
    fetchCategories,
    loading: loadingCategories,
  } = useFetchDrugCategories();
  const {
    dosageForms,
    fetchDosageForms,
    loading: loadingDosageForms,
  } = useFetchDosageForms();
  const {
    ingredients,
    fetchIngredients,
    loading: loadingIngredients,
  } = useFetchIngredients();
  const {
    createPrivateDrug,
    loading: isSaving,
    error,
    success,
  } = useCreatePrivateDrug();

  // جلب البيانات عند فتح الـ Dialog
  useEffect(() => {
    if (open) {
      fetchCategories();
      fetchDosageForms();
      fetchIngredients();
    }
  }, [open, fetchCategories, fetchDosageForms, fetchIngredients]);

  useEffect(() => {
    if (success) {
      showSnackbar("تمت إضافة الدواء الخاص والجديد بنجاح!", "success");
      handleClose();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error]);

  // حقول الخطوة الأولى (Step 0) الأساسية
  const [tradeName, setTradeName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >([]);
  const [selectedDosageForm, setSelectedDosageForm] =
    useState<DosageFormOption | null>(null);

  // 🟢 المصفوفة الأساسية للتراكيب المخزنة التي ستُرسل للباك إند
  const [selectedIngredients, setSelectedIngredients] = useState<
    {
      ingredient: IngredientOption | null;
      strengthValue: string;
      unit: string;
    }[]
  >([]);

  // 🟢 حقول الإدخال السريع المؤقتة (لإضافة العناصر للبطاقات)
  const [tempIngredient, setTempIngredient] = useState<IngredientOption | null>(
    null,
  );
  const [tempStrength, setTempStrength] = useState("");
  const [tempUnit, setTempUnit] = useState("mg");

  const [barcode, setBarcode] = useState(initialBarcode || "");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [consumerPrice, setConsumerPrice] = useState("");
  const [unitsPerBox, setUnitsPerBox] = useState("");

  // حقول الخطوة الثانية (Step 1)
  const [alertLimit, setAlertLimit] = useState<number>(10);
  const [expiryAlertMonths, setExpiryAlertMonths] = useState<number>(3);
  const [allowRetail, setAllowRetail] = useState(false);
  const [isRx, setIsRx] = useState(false);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const {
    batches,
    addNewBatchRow,
    deleteBatchRow,
    updateBatchField,
    resetBatches,
  } = useMedicineBatches();

  const handleClose = () => {
    setActiveStep(0);
    resetBatches();
    setTradeName("");
    setScientificName("");
    setSelectedCategories([]);
    setSelectedDosageForm(null);
    setSelectedIngredients([]);
    setTempIngredient(null);
    setTempStrength("");
    setTempUnit("mg");
    setPurchasePrice("");
    setConsumerPrice("");
    setUnitsPerBox("");
    setIsRx(false);
    setAllowRetail(false);
    setLocation("");
    setNote("");
    onClose();
  };

  const handleSaveMedicine = async () => {
    if (!tradeName || selectedCategories.length === 0 || !selectedDosageForm) {
      showSnackbar(
        "يرجى إدخال الاسم التجاري، واختيار الفئات والشكل الصيدلاني أولاً.",
        "warning",
      );
      return;
    }

    const payload: CreatePrivateDrugPayload = {
      dosageFormId: selectedDosageForm.dosageFormId,
      tradeName: tradeName,
      barcode: barcode,
      unitsPerBox: Number(unitsPerBox) || 0,
      isRx: isRx,
      minStockAlert: alertLimit,
      sellPart: allowRetail,
      netPrice: Number(purchasePrice) || 0,
      consumerPrice: Number(consumerPrice) || 0,
      notes: note,
      storageLocation: location,
      categoryIds: selectedCategories.map((cat) => cat.categoryId),

      // صياغة المكونات الفعالة (Ingredients)
      ingredients: selectedIngredients
        .filter((item) => item.ingredient !== null && item.strengthValue !== "")
        .map((item) => ({
          ingredientId: item.ingredient!.ingredientId,
          strengthValue: Number(item.strengthValue),
          unit: item.unit,
        })),

      // صياغة الدفعات (Batches) لتطابق الأسماء المطلوبة
      batches: batches.map((b) => ({
        initialQuantity: Number(b.quantity) || 0,
        expiryDate: !b.expiryDate || b.expiryDate === "yyyy-mm-dd"
          ? new Date().toISOString().split("T")[0]
          : b.expiryDate,
        receivedDate: !b.receivingDate || b.receivingDate === "yyyy-mm-dd"
          ? new Date().toISOString().split("T")[0]
          : b.receivingDate, // 🟢 تم تعديل الاسم هنا ليطابق receivedDate المطلوبة في الباك إند
      })),
    };

    try {
      await createPrivateDrug(payload);
    } catch (err) {
      console.error("حدث خطأ أثناء إرسال طلب الدواء اليدوي:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ p: 4, overflowX: "hidden" }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              textAlign: "center",
              mb: 3,
            }}
          >
            إضافة منتج جديد يدوياً
          </Typography>
          <CustomStepper activeStep={activeStep} />
        </Box>

        <Box key={activeStep}>
          {activeStep === 0 ? (
            /* --- الخطوة الأولى: معلومات الدواء الأساسية --- */
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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

                <CustomAutocomplete<CategoryOption>
                  label="الفئات"
                  multiple={true}
                  options={categories}
                  value={selectedCategories}
                  onChange={(newValue) =>
                    setSelectedCategories(newValue as CategoryOption[])
                  }
                  getOptionLabel={(option) => option.categoryName}
                  isOptionEqualToValue={(option, value) =>
                    option.categoryId === value.categoryId
                  }
                  placeholder={
                    loadingCategories ? "جاري التحميل..." : "اختر الفئات..."
                  }
                />

                <CustomAutocomplete<DosageFormOption>
                  label="الشكل الصيدلاني"
                  multiple={false}
                  options={dosageForms}
                  value={selectedDosageForm}
                  onChange={(newValue) =>
                    setSelectedDosageForm(newValue as DosageFormOption | null)
                  }
                  getOptionLabel={(option) => option.dosageFormName}
                  isOptionEqualToValue={(option, value) =>
                    option.dosageFormId === value.dosageFormId
                  }
                  placeholder={
                    loadingDosageForms
                      ? "جاري التحميل..."
                      : "اختر الشكل الصيدلاني..."
                  }
                />
              </Box>

              {/* 🟢 قسم التراكيب الفعالة العصري (Smart Chips Grid) */}
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "#1e293b",
                    fontSize: "14px",
                    mb: 2,
                  }}
                >
                  المكونات الفعالة والتركيز (Ingredients)
                </Typography>

                {/* لوحة الإدخال السريع الثابتة */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 1fr auto" },
                    gap: 2,
                    alignItems: "end",
                    backgroundColor: "#ffffff",
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                  }}
                >
                  <CustomAutocomplete<IngredientOption>
                    label="ابحث عن مادة فعالة لإضافتها..."
                    options={ingredients}
                    value={tempIngredient}
                    onChange={(newValue) =>
                      setTempIngredient(newValue as IngredientOption | null)
                    }
                    getOptionLabel={(option) => option.ingredientName}
                    isOptionEqualToValue={(option, value) =>
                      option.ingredientId === value.ingredientId
                    }
                    placeholder={
                      loadingIngredients
                        ? "جاري التحميل..."
                        : "مثال: Paracetamol"
                    }
                  />

                  <CustomTextField
                    label="التركيز"
                    type="number"
                    placeholder="500"
                    value={tempStrength}
                    onChange={setTempStrength}
                  />

                  <CustomAutocomplete<string>
                    label="الوحدة"
                    options={AVAILABLE_UNITS}
                    value={tempUnit}
                    onChange={(newValue) =>
                      setTempUnit((newValue as string) || "mg")
                    }
                    getOptionLabel={(option) => option}
                  />

                  <Button
                    variant="contained"
                    onClick={() => {
                      if (!tempIngredient || !tempStrength) {
                        showSnackbar(
                          "يرجى اختيار المادة وتحديد التركيز أولاً",
                          "warning",
                        );
                        return;
                      }
                      setSelectedIngredients([
                        ...selectedIngredients,
                        {
                          ingredient: tempIngredient,
                          strengthValue: tempStrength,
                          unit: tempUnit,
                        },
                      ]);
                      setTempIngredient(null);
                      setTempStrength("");
                    }}
                    sx={{
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "primary",
                      fontWeight: 600,
                      px: 3,
                      "&:hover": { backgroundColor: "#1e293b" },
                    }}
                  >
                    إضافة
                  </Button>
                </Box>

                {/* عرض المواد المضافة كبطاقات ذكية أفقية (Flex Wrap Chips) */}
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}
                >
                  {selectedIngredients.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        fontStyle: "italic",
                        pl: 1,
                        py: 0.5,
                      }}
                    >
                      لم يتم إضافة مواد فعالة بعد.
                    </Typography>
                  ) : (
                    selectedIngredients.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          backgroundColor: "#e0f2fe",
                          border: "1px solid #bae6fd",
                          color: "#0369a1",
                          px: 2,
                          py: 0.8,
                          borderRadius: "30px",
                          transition: "all 0.2s",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            borderColor: "#cbd5e1",
                            color: "#334155",
                          },
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>
                          {item.ingredient?.ingredientName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: 0.8,
                            backgroundColor: "#ffffff",
                            px: 1,
                            borderRadius: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {item.strengthValue} {item.unit}
                        </Typography>
                        <Box
                          onClick={() =>
                            setSelectedIngredients(
                              selectedIngredients.filter((_, i) => i !== index),
                            )
                          }
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            fontSize: "14px",
                            ml: 0.5,
                            opacity: 0.6,
                            "&:hover": { opacity: 1, color: "#ef4444" },
                          }}
                        >
                          ✕
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <CustomTextField
                  label="الباركود الدولي"
                  placeholder="628110111..."
                  value={barcode}
                  onChange={setBarcode}
                />
                <CustomTextField
                  label="عدد الوحدات في العلبة"
                  type="number"
                  placeholder="مثال: 10"
                  value={unitsPerBox}
                  onChange={setUnitsPerBox}
                />
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
            </Box>
          ) : (
            /* --- الخطوة الثانية: المخزون والدفعات --- */
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <NumberSpinner
                  label="حد التنبيه (صفر المادة)"
                  value={alertLimit}
                  onChange={setAlertLimit}
                />
                <NumberSpinner
                  label="تنبيه انتهاء الصلاحية قبل (بالأشهر)"
                  value={expiryAlertMonths}
                  onChange={setExpiryAlertMonths}
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <CustomTextField
                  label="الموقع"
                  placeholder="مثال: الرف A1"
                  value={location}
                  onChange={setLocation}
                />
                <CustomTextField
                  label="ملاحظة"
                  placeholder="اكتب ملاحظتك هنا..."
                  value={note}
                  onChange={setNote}
                />

                {/* التوزيع المتباعد الاحترافي (شرق وغرب) */}
                <Box
                  sx={{
                    gridColumn: { xs: "span 1", sm: "span 2" },
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: 27,
                    mt: 1,
                    justifyContent: "flex-end",
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
                        sx={{
                          fontWeight: 600,
                          color: "#334155",
                          fontSize: "14px",
                        }}
                      >
                        هل يمكن البيع بالتجزئة؟
                      </Typography>
                    }
                    sx={{ direction: "rtl", marginRight: 0, gap: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isRx}
                        onChange={(e) => setIsRx(e.target.checked)}
                        sx={{
                          color: "#cbd5e1",
                          "&.Mui-checked": { color: "#e11d48" },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#334155",
                          fontSize: "14px",
                        }}
                      >
                        هل يحتاج وصفة طبية؟ (isRx)
                      </Typography>
                    }
                    sx={{ direction: "rtl", marginRight: 0, gap: 1 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3, borderColor: "#f1f5f9" }} />

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
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
          <Button
            onClick={handleClose}
            disabled={isSaving || success}
            sx={{ color: "#64748b", fontWeight: 700 }}
          >
            إلغاء
          </Button>
          <Box sx={{ display: "flex", gap: "12px" }}>
            {activeStep === 1 && (
              <Button
                variant="outlined"
                startIcon={<ArrowForwardIcon />}
                onClick={() => setActiveStep(0)}
                disabled={isSaving || success}
                sx={{ borderRadius: "14px", width: "160px" }}
              >
                السابق
              </Button>
            )}
            <Button
              variant="contained"
              endIcon={activeStep === 0 ? <ArrowBackIcon /> : undefined}
              onClick={() =>
                activeStep === 0 ? setActiveStep(1) : handleSaveMedicine()
              }
              disabled={isSaving || success}
              startIcon={
                activeStep === 1 &&
                isSaving && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                backgroundColor: "secondary.dark",
                width: "160px",
                "&:hover": { backgroundColor: "secondary.main" },
              }}
            >
              {isSaving
                ? "جاري الحفظ..."
                : activeStep === 0
                  ? "الخطوة التالية"
                  : "تأكيد حفظ الدواء"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
