// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   InputAdornment,
//   Card,
//   Chip,
//   Button,
//   Stack,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
// import PageviewIcon from "@mui/icons-material/Pageview";
// import AddIcon from "@mui/icons-material/Add";
// import { NotFoundMedicineDialog } from "../components/AddMedicine/MedicineNotFoundDialog";
// import { FoundMedicineDialog } from "../components/AddMedicine/MedicineFoundDialog";
// import type { BatchRow } from "../components/AddMedicine/BatchTable";

// export const AddMedicinePage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [searchResult, setSearchResult] = useState<
//     "found" | "not_found" | null
//   >(null);

//   const [openFoundDialog, setOpenFoundDialog] = useState(false);
//   const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [allowRetail, setAllowRetail] = useState(false);
//   const [alertLimit, setAlertLimit] = useState<number>(10);
//   const [expiryAlertMonths, setExpiryAlertMonths] = useState<number>(3);

//   // الحالة الابتدائية النظيفة للدفعات
//   const initialBatchesState: BatchRow[] = [
//     {
//       id: "initial-batch-1",
//       batchNumber: "B-00000-X",
//       quantity: 1,
//       expiryDate: "yyyy-dd-mm",
//     },
//   ];

//   const [batches, setBatches] = useState<BatchRow[]>(initialBatchesState);

//   // ✨ دالة موحدة لإغلاق النوافذ وتصفير البيانات فوراً لضمان عدم بقائها في الذاكرة
//   const handleCloseDialogs = () => {
//     setOpenFoundDialog(false);
//     setOpenNotFoundDialog(false);
//     setBatches(initialBatchesState); // تصفير المصفوفة وإعادتها للعنصر الافتراضي النظيف
//     setActiveStep(0); // إعادة تعيين خطوات نافذة الدواء غير الموجود
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;

//     setHasSearched(true);
//     setSearchResult(
//       searchQuery.toLowerCase().includes("panadol") ? "found" : "not_found",
//     );
//   };

//   // 👈 الدالة المحدثة التي تمنع ظهور الأرقام العشوائية وتثبت القيمة
//   const addNewBatchRow = () => {
//     const uniqueId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//     const defaultBatchNumber = "B-00000-X";

//     setBatches([
//       ...batches,
//       {
//         id: uniqueId,
//         batchNumber: defaultBatchNumber,
//         quantity: "",
//         expiryDate: "",
//       },
//     ]);
//   };

//   const deleteBatchRow = (id: string) => {
//     if (batches.length === 1) return;
//     setBatches(batches.filter((b) => b.id !== id));
//   };

//   const updateBatchField = (
//     id: string,
//     field:  any,
//     value: string | number,
//   ) => {
//     setBatches(
//       batches.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
//     );
//   };

//   const totalQuantity = useMemo(() => {
//     return batches.reduce((sum, b) => sum + Number(b.quantity || 0), 0);
//   }, [batches]);

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         minHeight: "100vh",
//         display: "flex",
//         backgroundColor: "#f8fafc",
//         direction: "rtl",
//       }}
//     >
//       <Box
//         sx={{
//           flexGrow: 1,
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//           gap: 3,
//         }}
//       >
//         {/* شريط العنوان والبحث */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             alignItems: "flex-start",
//             width: "100%",
//           }}
//         >
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
//             <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
//               إستيراد الأدوية للمخزون
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#64748b" }}>
//               ابحث في قاعدة البيانات المركزية لتوسيع مستودع صيدليتك المحلي
//             </Typography>
//           </Box>

//           <form
//             onSubmit={handleSearchSubmit}
//             style={{ width: "100%", maxWidth: "800px" }}
//           >
//             <TextField
//               fullWidth
//               placeholder="ابحث باسم الدواء أو امسح الباركود..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#94a3b8" }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <QrCodeScannerIcon
//                         sx={{ color: "#94a3b8", cursor: "pointer" }}
//                       />
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "26px",
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
//                   px: 2,
//                   "& fieldset": { borderColor: "#e2e8f0" },
//                   "&:hover fieldset": { borderColor: "#cbd5e1" },
//                   "&.Mui-focused fieldset": { borderColor: "primary" },
//                 },
//               }}
//             />
//           </form>
//         </Box>

//         {/* المساحة المركزية */}
//         <Box sx={{ flexGrow: 1, display: "flex", width: "100%", mt: 2 }}>
//           {!hasSearched && (
//             <Box sx={{ textAlign: "center", margin: "auto", py: 6 }}>
//               <PageviewIcon
//                 sx={{ fontSize: "100px", color: "#cbd5e1", mb: 1.5 }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{ color: "#94a3b8", maxWidth: "360px", margin: "0 auto" }}
//               >
//                 أدخل الكلمات المفتاحية في شريط البحث العلوي لبدء فحص السجلات
//                 المركزية.
//               </Typography>
//             </Box>
//           )}

//           {hasSearched && searchResult === "found" && (
//             <Box
//               sx={{
//                 width: "100%",
//                 maxWidth: "380px",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 textAlign: "right",
//               }}
//             >
//               <Card
//                 sx={{
//                   p: 3,
//                   borderRadius: "20px",
//                   boxShadow: "0 12px 30px rgba(0,0,0,0.04)",
//                   border: "1px solid #e2e8f0",
//                   backgroundColor: "#ffffff",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 2,
//                   }}
//                 >
//                   <Chip
//                     label="مسكن"
//                     size="small"
//                     sx={{
//                       backgroundColor: "#e0f2fe",
//                       color: "#0369a1",
//                       fontWeight: "700",
//                       borderRadius: "6px",
//                     }}
//                   />
//                   <Chip
//                     label="RX REQUIRED"
//                     size="small"
//                     sx={{
//                       backgroundColor: "#fee2e2",
//                       color: "#ef4444",
//                       fontWeight: "700",
//                       borderRadius: "6px",
//                       fontSize: "10px",
//                     }}
//                   />
//                 </Box>

//                 <Box sx={{ mb: 3 }}>
//                   <Typography
//                     variant="h6"
//                     sx={{ fontWeight: 800, color: "#1e293b" }}
//                   >
//                     Panadol Advance
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#94a3b8", mb: 2.5 }}
//                   >
//                     Paracetamol 500mg
//                   </Typography>

//                   <Stack
//                     spacing={1.5}
//                     sx={{ borderTop: "1px dashed #e2e8f0", pt: 2 }}
//                   >
//                     <Box
//                       sx={{ display: "flex", justifyContent: "space-between" }}
//                     >
//                       <Typography variant="body2" sx={{ color: "#64748b" }}>
//                         النوع:
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 700, color: "#334155" }}
//                       >
//                         أقراص (60)
//                       </Typography>
//                     </Box>
//                     <Box
//                       sx={{ display: "flex", justifyContent: "space-between" }}
//                     >
//                       <Typography variant="body2" sx={{ color: "#64748b" }}>
//                         سعر الشراء:
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 700, color: "#334155" }}
//                       >
//                         1000 ل.س
//                       </Typography>
//                     </Box>
//                     <Box
//                       sx={{ display: "flex", justifyContent: "space-between" }}
//                     >
//                       <Typography variant="body2" sx={{ color: "#64748b" }}>
//                         سعر المستهلك:
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 700, color: "#334155" }}
//                       >
//                         1500 ل.س
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </Box>

//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => setOpenFoundDialog(true)}
//                   sx={{
//                     backgroundColor: "#0f172a",
//                     "&:hover": { backgroundColor: "#1e293b" },
//                     borderRadius: "12px",
//                     fontWeight: "bold",
//                     py: 1.2,
//                     boxShadow: "none",
//                   }}
//                 >
//                   + إضافة للمخزون
//                 </Button>
//               </Card>
//             </Box>
//           )}

//           {hasSearched && searchResult === "not_found" && (
//             <Box sx={{ textAlign: "center", margin: "auto", py: 4 }}>
//               <Box
//                 sx={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   position: "relative",
//                   mb: 3,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 72,
//                     height: 72,
//                     borderRadius: "20px",
//                     backgroundColor: "#f1f5f9",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <SearchIcon sx={{ fontSize: "36px", color: "#64748b" }} />
//                 </Box>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: -4,
//                     left: -4,
//                     width: 28,
//                     height: 28,
//                     borderRadius: "50%",
//                     backgroundColor: "#ef4444",
//                     color: "#ffffff",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     fontSize: "14px",
//                     fontWeight: "bold",
//                     border: "3px solid #f8fafc",
//                   }}
//                 >
//                   ✕
//                 </Box>
//               </Box>

//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: 800, color: "#1e293b", mb: 1 }}
//               >
//                 الدواء غير موجود
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#64748b",
//                   maxWidth: "420px",
//                   mb: 3,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 لم نتمكن من العثور على أي نتائج مطابقة في السجلات المركزية.
//                 بإمكانك إضافة معلوماته ليتوفر ضمن مخزونك الخاص.
//               </Typography>
//               <Button
//                 variant="contained"
//                 onClick={() => {
//                   setActiveStep(0);
//                   setOpenNotFoundDialog(true);
//                 }}
//                 startIcon={<AddIcon />}
//                 sx={{
//                   backgroundColor: "#0f172a",
//                   "&:hover": { backgroundColor: "#1e293b" },
//                   borderRadius: "12px",
//                   px: 4,
//                   py: 1.4,
//                   fontWeight: "bold",
//                   boxShadow: "none",
//                 }}
//               >
//                 إضافة الدواء للمخزون
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Box>

//       {/* الرندرة الشرطية للنوافذ */}
//       {openFoundDialog && (
//         <FoundMedicineDialog
//           open={openFoundDialog}
//           onClose={handleCloseDialogs}
//           alertLimit={alertLimit}
//           setAlertLimit={setAlertLimit}
//           expiryAlertMonths={expiryAlertMonths}
//           setExpiryAlertMonths={setExpiryAlertMonths}
//           allowRetail={allowRetail}
//           setAllowRetail={setAllowRetail}
//           batches={batches}
//           onAddNewBatch={addNewBatchRow}
//           onDeleteBatch={deleteBatchRow}
//           onUpdateBatchField={updateBatchField}
//           totalQuantity={totalQuantity}
//         />
//       )}

//       {openNotFoundDialog && (
//         <NotFoundMedicineDialog
//           open={openNotFoundDialog}
//           onClose={handleCloseDialogs}
//           activeStep={activeStep}
//           setActiveStep={setActiveStep}
//           alertLimit={alertLimit}
//           setAlertLimit={setAlertLimit}
//           expiryAlertMonths={expiryAlertMonths}
//           setExpiryAlertMonths={setExpiryAlertMonths}
//           allowRetail={allowRetail}
//           setAllowRetail={setAllowRetail}
//           batches={batches}
//           onAddNewBatch={addNewBatchRow}
//           onDeleteBatch={deleteBatchRow}
//           onUpdateBatchField={updateBatchField}
//         />
//       )}
//     </Box>
//   );
// };
// features/inventory/pages/AddMedicinePage.tsx
import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import { NotFoundMedicineDialog } from "../components/AddMedicine/MedicineNotFoundDialog";
import { FoundMedicineDialog } from "../components/AddMedicine/MedicineFoundDialog";
import { AddMedicineSearchBar } from "../components/AddMedicine/TitleAndSearchBar";
import { MedicineSearchResult } from "../components/AddMedicine/MedicineSearchResult";
import { useSearchCentralDrug } from "../components/function/useSearchCentralDrug";
import { useMedicineBatches } from "../components/function/useMedicineBatches";

export const AddMedicinePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // 🟢 استدعاء منطق الربط الديناميكي من الهوك الجديد
  const { searchDrugByBarcode, loading, foundDrug, searchResult } =
    useSearchCentralDrug();

  // التحكم بإعدادات النوافذ المنبثقة
  const [openFoundDialog, setOpenFoundDialog] = useState(false);
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [allowRetail, setAllowRetail] = useState(false);
  const [alertLimit, setAlertLimit] = useState<number>(10);
  const [expiryAlertMonths, setExpiryAlertMonths] = useState<number>(3);

  // استدعاء منطق إدارة الدفعات من الهوك المخصص
  const {
    batches,
    addNewBatchRow,
    deleteBatchRow,
    updateBatchField,
    totalQuantity,
    resetBatches,
  } = useMedicineBatches();

  const handleCloseDialogs = () => {
    setOpenFoundDialog(false);
    setOpenNotFoundDialog(false);
    resetBatches(); // تصفير المصفوفة من الهوك
    setActiveStep(0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    // 🟢 تفعيل دالة البحث الحقيقي عن طريق الباركود
    searchDrugByBarcode(searchQuery);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f8fafc",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* 1. شريط البحث الموحد */}
        <AddMedicineSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={handleSearchSubmit}
        />

        {/* 2. منطقة عرض مخرجات البحث وحالة التحميل */}
        <Box sx={{ flexGrow: 1, display: "flex", width: "100%", mt: 2 }}>
          {loading ? (
            // شاشة انتظار احترافية أثناء جلب البيانات من السيرفر
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
                gap: 2,
              }}
            >
              <CircularProgress size={50} sx={{ color: "primary.main" }} />
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                جاري فحص السجلات المركزية...
              </Typography>
            </Box>
          ) : (
            <MedicineSearchResult
              hasSearched={hasSearched}
              searchResult={searchResult}
              foundDrug={foundDrug} // 🟢 تمرير الدواء الذي تم العثور عليه
              onOpenFound={() => setOpenFoundDialog(true)}
              onOpenNotFound={() => {
                setActiveStep(0);
                setOpenNotFoundDialog(true);
              }}
            />
          )}
        </Box>
      </Box>

      {/* 3. النوافذ المشروطة (Dialogs) */}
      {openFoundDialog && (
        <FoundMedicineDialog
          open={openFoundDialog}
          onClose={handleCloseDialogs}
          alertLimit={alertLimit}
          setAlertLimit={setAlertLimit}
          expiryAlertMonths={expiryAlertMonths}
          setExpiryAlertMonths={setExpiryAlertMonths}
          allowRetail={allowRetail}
          setAllowRetail={setAllowRetail}
          batches={batches}
          onAddNewBatch={addNewBatchRow}
          onDeleteBatch={deleteBatchRow}
          onUpdateBatchField={updateBatchField}
          totalQuantity={totalQuantity}
        />
      )}

      {openNotFoundDialog && (
        <NotFoundMedicineDialog
          open={openNotFoundDialog}
          onClose={handleCloseDialogs}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          alertLimit={alertLimit}
          setAlertLimit={setAlertLimit}
          expiryAlertMonths={expiryAlertMonths}
          setExpiryAlertMonths={setExpiryAlertMonths}
          allowRetail={allowRetail}
          setAllowRetail={setAllowRetail}
          batches={batches}
          onAddNewBatch={addNewBatchRow}
          onDeleteBatch={deleteBatchRow}
          onUpdateBatchField={updateBatchField}
          // barcode={searchQuery} // تمرير الباركود المبحوث عنه ليتم تعبئته تلقائياً كـ Default Value
        />
      )}
    </Box>
  );
};

export default AddMedicinePage;
