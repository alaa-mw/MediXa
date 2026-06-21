// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Typography,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   Stack,
// } from "@mui/material";
// import { NumberSpinner } from "../AddMedicine/NumberSpinner";
// import { CloseButton } from "../CloseButton";
// import { CustomTextField } from "../CustomTextField";

// interface EditMedicineDialogProps {
//   open: boolean;
//   onClose: () => void;
//   medicine: Medicine;
//   onSave: (updatedFields: Partial<Medicine>) => void;
// }

// export const EditMedicineDialog: React.FC<EditMedicineDialogProps> = ({
//   open,
//   onClose,
//   medicine,
//   onSave,
// }) => {
//   // حالات الحقول التي طلبتم تعديلها
//   const [purchasePrice, setPurchasePrice] = useState(medicine.purchase_price);
//   const [consumerPrice, setConsumerPrice] = useState(medicine.consumer_price);
//   const [alertLimit, setAlertLimit] = useState(medicine.alert_limit);
//   const [expiryAlertMonths, setExpiryAlertMonths] = useState(6); // قيمة افتراضية لأشهر تنبيه الصلاحية
//   const [allowRetail, setAllowRetail] = useState(true); // قيمة افتراضية للسماح بالتجزئة

//   // تحديث الحالات داخلياً عندما يتغير الدواء الممرر
//   useEffect(() => {
//     if (medicine) {
//       setPurchasePrice(medicine.purchase_price);
//       setConsumerPrice(medicine.consumer_price);
//       setAlertLimit(medicine.alert_limit);
//     }
//   }, [medicine]);

//   const handleConfirm = () => {
//     onSave({
//       purchase_price: purchasePrice,
//       consumer_price: consumerPrice,
//       alert_limit: alertLimit,
//     });
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       slotProps={{
//         paper: {
//           sx: {
//             borderRadius: "28px",
//             p: 1,
//             position: "relative",
//             boxShadow: "0 30px 60px rgba(0,0,0,.08)",
//           },
//         },
//       }}
//     >
//       {/* زر الإغلاق الأنيق في الزاوية */}
//       <CloseButton onClick={onClose} />

//       <DialogContent sx={{ p: 4 }}>
//         <Box sx={{ mb: 4, textAlign: "center" }}>
//           <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
//             تعديل بيانات المنتج
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
//             {medicine.trade_name} ({medicine.scientific_name})
//           </Typography>
//         </Box>

//         <Stack spacing={3}>
//           {/* أسعار الشراء والمستهلك في سطر واحد */}
//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            
//             {/* 👈 تعديل حقل سعر الشراء للاستماع للقيمة المباشرة وحذف الباركود القديم من الـ Label */}
//             <CustomTextField
//               label="سعر الشراء"
//               value={purchasePrice}
//               type="number"
//               onChange={(value) => setPurchasePrice(Number(value))}
//             />

//             <CustomTextField
//               label="سعر المستهلك"
//               value={consumerPrice}
//               type="number"
//               onChange={(value) => setConsumerPrice(Number(value))}
//             />

//           </Box>

//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
//             <NumberSpinner
//               label="حد التنبيه (صفر المادة)"
//               value={alertLimit}
//               onChange={setAlertLimit}
//             />

//             <NumberSpinner
//               label="تنبيه انتهاء الصلاحية قبل (أشهر)"
//               value={expiryAlertMonths}
//               onChange={setExpiryAlertMonths}
//             />
//           </Box>

//           <Box sx={{ pt: 1 }}>
//             <FormControlLabel
//               sx={{ mr: 0 }}
//               control={
//                 <Checkbox
//                   checked={allowRetail}
//                   onChange={(e) => setAllowRetail(e.target.checked)}
//                   sx={{
//                     color: "#cbd5e1",
//                     "&.Mui-checked": { color: "#14b8a6" },
//                   }}
//                 />
//               }
//               label={
//                 <Typography sx={{ fontWeight: 600, color: "#334155" }}>
//                   هل يمكن البيع بالتجزئة؟
//                 </Typography>
//               }
//             />
//           </Box>
//         </Stack>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 5,
//           }}
//         >
//           <Button onClick={onClose} sx={{ color: "#64748b", fontWeight: 700 }}>
//             إلغاء
//           </Button>

//           <Button
//             variant="contained"
//             onClick={handleConfirm}
//             sx={{
//               backgroundColor: "secondary.dark",
//               "&:hover": { backgroundColor: "#1e293b" },
//               borderRadius: "12px",
//               px: 4,
//               py: 1.2,
//               fontWeight: "bold",
//               boxShadow: "none",
//             }}
//           >
//             حفظ التغييرات
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };