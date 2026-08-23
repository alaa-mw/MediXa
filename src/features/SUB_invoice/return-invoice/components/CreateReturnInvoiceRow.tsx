// import {
//   Box,
//   Checkbox,
//   IconButton,
//   Typography,
//   TextField,
//   MenuItem,
//   CircularProgress,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import { format } from "date-fns";
// import { useEffect } from "react";
// import type { SaleInvoiceBatchesResponse } from "../../Types/saleInvoiceItemBatches";
// import useGetData from "../../../../shared/hooks/useGetData";

// interface Props {
//   item: any;
//   onToggleCheck: (id: number) => void;
//   onUpdateQuantity: (id: number, delta: number) => void;
//   onSelectBatch: (itemId: number, batchId: number) => void;
// }

// const CreateReturnInvoiceRow = ({
//   item,
//   onToggleCheck,
//   onUpdateQuantity,
//   onSelectBatch,
// }: Props) => {
//   const invoiceId = item.saleInvoiceId;

//   // جلب الدفعات من الـ API الجديد المستقل
//   const {
//     data: apiResponse,
//     isLoading,
//     error,
//   } = useGetData<SaleInvoiceBatchesResponse>(
//     invoiceId ? `/sale-invoice/${invoiceId}/batches` : "",
//   );

//   // استخراج الداتا بناءً على هيكلة FetchResponse
//   const invoiceData = apiResponse?.data;
//   const currentItem = invoiceData?.items?.find(
//     (i) => i.saleInvoiceItemId === item.saleInvoiceItemId,
//   );

//   const batchesList = currentItem?.batches || [];

//   // تعيين الدفعة الافتراضية الأولى تلقائياً عند توفرها وعدم اختيار دفعة مسبقاً
//   useEffect(() => {
//     if (batchesList.length > 0 && !item.selectedBatchId) {
//       const defaultBatchId = batchesList[0].saleInvoiceItemBatchId;
//       onSelectBatch(item.saleInvoiceItemId, defaultBatchId);
//     }
//   }, [
//     batchesList,
//     item.selectedBatchId,
//     item.saleInvoiceItemId,
//     onSelectBatch,
//   ]);

//   if (isLoading) {
//     return (
//       <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
//         <CircularProgress size={24} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 2, color: "error.main", fontSize: "13px" }}>
//         خطأ في تحميل الدفعات
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr 2fr 3fr 4fr",
//         p: 1.2,
//         borderBottom: "1px solid #F1F5F9",
//         alignItems: "center",
//         direction: "rtl",
//       }}
//     >
//       {/* Checkbox */}
//       <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
//         <Checkbox
//           checked={item.checked}
//           onChange={() => onToggleCheck(item.saleInvoiceItemId)}
//           sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#e11d48" } }}
//         />
//       </Box>

//       {/* اسم الدواء */}
//       <Box
//         sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
//       >
//         {item.tradeName ||
//           item.pharmacyDrug?.drug.generalDrug?.tradeName ||
//           currentItem?.tradeName ||
//           "دواء"}
//       </Box>

//       {/* نوع الوحدة */}
//       <Box sx={{ textAlign: "center", color: "#64748B", fontSize: 13 }}>
//         <Box
//           sx={{
//             display: "inline-block",
//             px: 1.5,
//             py: 0.5,
//             borderRadius: "4px",
//             backgroundColor: "#ebebeb",
//             color: "primary.main",
//           }}
//         >
//           {item.unitType || currentItem?.unitType}
//         </Box>
//       </Box>

//       {/* السعر الفردي */}
//       <Box sx={{ textAlign: "center", fontWeight: 600 }}>
//         {Number(item.finalUnitPrice || 0).toLocaleString()}
//       </Box>

//       {/* الكمية (Counter) */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.8,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         <IconButton
//           size="small"
//           onClick={() => onUpdateQuantity(item.saleInvoiceItemId, 1)}
//           disabled={item.selectedQuantity >= item.displayQuantity}
//           sx={{
//             border: "1px solid #fca5a5",
//             color: "#ef4444",
//             borderRadius: 1,
//             p: 0.5,
//           }}
//         >
//           <Add fontSize="small" />
//         </IconButton>
//         <Typography
//           sx={{ mx: 1, fontWeight: "bold", minWidth: 20, textAlign: "center" }}
//         >
//           {item.selectedQuantity?.toString().padStart(2, "0") || "01"}
//         </Typography>
//         <IconButton
//           size="small"
//           onClick={() => onUpdateQuantity(item.saleInvoiceItemId, -1)}
//           disabled={item.selectedQuantity <= 1}
//           sx={{
//             border: "1px solid #fca5a5",
//             color: "#ef4444",
//             borderRadius: 1,
//             p: 0.5,
//           }}
//         >
//           <Remove fontSize="small" />
//         </IconButton>
//       </Box>

//       {/* السعر الإجمالي */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.5,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
//           {item.totalPrice || currentItem?.totalPrice}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ fontSize: 12, color: "text.secondary" }}
//         >
//           ل.س
//         </Typography>
//       </Box>

//       {/* السعر بعد الخصم */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 0.5,
//           fontWeight: 700,
//           color: "#0F172A",
//         }}
//       >
//         <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
//           {item.netTotalPrice || currentItem?.netTotalPrice}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ fontSize: 12, color: "text.secondary" }}
//         >
//           ل.س
//         </Typography>
//       </Box>

//       {/* إدارة اختيار الدفعة */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           px: 1,
//         }}
//       >
//         {batchesList.length <= 1 ? (
//           <Typography
//             variant="body2"
//             sx={{ fontWeight: 500, color: "#0F172A", fontSize: "13px" }}
//           >
//             {batchesList[0] ? (
//               <>
//                 {batchesList[0].batch?.expiryDate
//                   ? format(
//                       new Date(batchesList[0].batch.expiryDate),
//                       "yyyy MMM dd   ",
//                     )
//                   : "غير متوفر"}{" "}
//                 ( مباع: {batchesList[0].soldDisplayQuantity} )
//               </>
//             ) : (
//               "لا توجد دفعات"
//             )}
//           </Typography>
//         ) : (
//           <TextField
//             select
//             size="small"
//             fullWidth
//             value={item.selectedBatchId || ""}
//             onChange={(e) =>
//               onSelectBatch(item.saleInvoiceItemId, Number(e.target.value))
//             }
//             sx={{
//               bgcolor: "#fff",
//               borderRadius: "6px",
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "6px",
//                 fontSize: "13px",
//               },
//             }}
//           >
//             {batchesList.map((b: any) => {
//               const bId = b.saleInvoiceItemBatchId;
//               const batchNum = b.batchId;
//               const expiryStr = b.batch?.expiryDate
//                 ? format(new Date(b.batch.expiryDate), "dd MMM yyyy")
//                 : "بدون تاريخ";
//               const soldQty = b.soldDisplayQuantity;
//               return (
//                 <MenuItem
//                   key={bId}
//                   value={bId}
//                   sx={{ fontSize: "12px", py: 1 }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 0.3,
//                       width: "100%",
//                     }}
//                   >
//                     {/* السطر الأول: رقم الدفعة وتاريخ الانتهاء بشكل مختصر */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "between",
//                         gap: 1,
//                         fontWeight: 600,
//                       }}
//                     >
//                       <span>#{batchNum}</span>
//                       <span style={{ color: "#64748B" }}>{expiryStr}</span>
//                     </Box>
//                     {/* السطر الثاني: الكمية المباعة */}
//                     <Box sx={{ fontSize: "11px", color: "text.secondary" }}>
//                       المباع: {soldQty}
//                     </Box>
//                   </Box>
//                 </MenuItem>
//               );
//             })}
//           </TextField>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default CreateReturnInvoiceRow;
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { format } from "date-fns";

interface Props {
  item: any;
  onToggleCheck: (rowId: string) => void;
  onUpdateQuantity: (rowId: string, delta: number) => void;
}

const CreateReturnInvoiceRow = ({
  item,
  onToggleCheck,
  onUpdateQuantity,
}: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr 2fr 3fr 4fr",
        p: 1.2,
        borderBottom: "1px solid #F1F5F9",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* Checkbox */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Checkbox
          checked={item.checked}
          onChange={() => onToggleCheck(item.rowId)}
          sx={{ color: "#cbd5e1", "&.Mui-checked": { color: "#e11d48" } }}
        />
      </Box>

      {/* اسم الدواء */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {item.tradeName || "دواء"}
      </Box>

      {/* نوع الوحدة */}
      <Box sx={{ textAlign: "center", color: "#64748B", fontSize: 13 }}>
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            borderRadius: "4px",
            backgroundColor: "#ebebeb",
            color: "primary.main",
          }}
        >
          {item.unitType}
        </Box>
      </Box>

      {/* السعر الفردي */}
      <Box sx={{ textAlign: "center", fontWeight: 600 }}>
        {Number(item.finalUnitPrice || 0).toLocaleString()}
      </Box>

      {/* الكمية (Counter) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.rowId, 1)}
          disabled={item.selectedQuantity >= item.displayQuantity}
          sx={{
            border: "1px solid #fca5a5",
            color: "#ef4444",
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Add fontSize="small" />
        </IconButton>
        <Typography
          sx={{ mx: 1, fontWeight: "bold", minWidth: 20, textAlign: "center" }}
        >
          {item.selectedQuantity?.toString().padStart(2, "0") || "01"}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(item.rowId, -1)}
          disabled={item.selectedQuantity <= 1}
          sx={{
            border: "1px solid #fca5a5",
            color: "#ef4444",
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Remove fontSize="small" />
        </IconButton>
      </Box>

      {/* السعر الإجمالي */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
          {item.totalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* السعر بعد الخصم */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 15, fontWeight: "500" }}>
          {item.netTotalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      {/* عرض تفاصيل الدفعة والتاريخ لكل سطر مستقلاً */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
        }}
      >
        {item.batchId || item.expiryDate ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#0F172A", fontSize: "13px" }}
            >
              دفعة #{item.batchId}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B" }}>
              انتهاء:{" "}
              {item.expiryDate
                ? format(new Date(item.expiryDate), "dd MMM yyyy")
                : "غير متوفر"}{" "}
              (مباع: {item.displayQuantity})
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "#94a3b8", fontSize: "13px" }}
          >
            بدون دفعة
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CreateReturnInvoiceRow;
