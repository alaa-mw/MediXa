// import React from "react";
// import { Box, Paper, Typography, Button, IconButton, Tooltip, useTheme, alpha } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useAppDispatch, useAppSelector } from "../../../../shared/store/hooks";
// import { addBatch, removeBatch, selectGeneralDrugState, selectTotalQuantity, updateBatch } from "../../store/generalDrugSlice";
// import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
// import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
// import { DeleteIcon } from "lucide-react";

// export const Step2Batches: React.FC = () => {
//   const theme = useTheme();
//   const dispatch = useAppDispatch();
//   const { batches } = useAppSelector(selectGeneralDrugState);
//   const totalQuantity = useAppSelector(selectTotalQuantity);

//   return (
//     <Box sx={{ maxWidth: "1050px", width: "100%", mx: "auto" }}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3.5,
//           borderRadius: 3.5,
//           bgcolor: "#FFFFFF",
//           border: "1px solid #E2E8F0",
//           borderRight: `5px solid ${theme.palette.primary.main}`,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//             pb: 2,
//             borderBottom: "1px solid #F1F5F9",
//           }}
//         >
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
//               دفعات الدواء  
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
//               أدخل تواريخ الصلاحية والكميات الخاصة بكل دفعة يتم إدخالها للمخزن.
//             </Typography>
//           </Box>

//           <Paper
//             elevation={0}
//             sx={{
//               p: 1.2,
//               px: 2.5,
//               bgcolor: "#F0FDF4",
//               border: "1px solid #BBF7D0",
//               borderRadius: 3,
//               textAlign: "center",
//             }}
//           >
//             <Typography variant="caption" sx={{ color: "#166534", fontWeight: 600 }}>
//               مجموع الكمية الكلية
//             </Typography>
//             <Typography variant="h6" sx={{ color: "#15803D", fontWeight: 800 }}>
//               {totalQuantity} علبة
//             </Typography>
//           </Paper>
//         </Box>

//         {/* Table Header */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "1.8fr 2fr 2fr 1.5fr",
//             gap: 2,
//             alignItems: "center",
//             bgcolor: alpha(theme.palette.primary.main, 0.2),
//             p: 1.5,
//             px: 2,
//             borderRadius: 2.5,
//             fontWeight: 700,
//             fontSize: 14, // تم تكبير حجم الخط في هيدر الجدول
//             color: theme.palette.primary.dark || "#1E3A8A",
//             mb: 2,
//           }}
//         >
//           <Box>الكمية (علبة)</Box>
//           <Box>تاريخ الاستلام</Box>
//           <Box>تاريخ انتهاء الصلاحية</Box>
//           <Box sx={{ textAlign: "center" }}>
//             <Button
//               variant="contained"
//               size="small"
//               startIcon={<AddIcon sx={{ fontSize: "18px !important" }} />}
//               onClick={() => dispatch(addBatch())}
//               sx={{
//                 fontWeight: 700,
//                 fontSize: "12px",
//                 whiteSpace: "nowrap",
//                 minWidth: "fit-content",
//                 bgcolor: theme.palette.primary.main,
//                 color: "#FFFFFF",
//                 borderRadius: 2,
//                 textTransform: "none",
//                 px: 2,
//                 py: 0.6,
//                 boxShadow: "none",
//                 "&:hover": {
//                   bgcolor: theme.palette.primary.dark,
//                   boxShadow: "none",
//                 },
//               }}
//             >
//               إضافة دفعة
//             </Button>
//           </Box>
//         </Box>

//         {/* Rows */}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//           {batches.map((batch, idx) => (
//             <Box
//               key={idx}
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: "1.8fr 2fr 2fr 1.5fr",
//                 gap: 2,
//                 alignItems: "center",
//                 p: 1.5,
//                 px: 2,
//                 borderRadius: 2.5,
//                 border: "1px solid #E2E8F0",
//                 bgcolor: "#FFFFFF",
//               }}
//             >
//               <CustomCounterField
//                 value={batch.initialQuantity}
//                 onChange={(val) =>
//                   dispatch(
//                     updateBatch({ index: idx, field: "initialQuantity", value: val })
//                   )
//                 }
//                 height="40px"
//               />

//               <RTLDatePicker
//                 value={batch.receivedDate}
//                 onChange={(date) =>
//                   dispatch(
//                     updateBatch({ index: idx, field: "receivedDate", value: date })
//                   )
//                 }
//               />

//               <RTLDatePicker
//                 value={batch.expiryDate}
//                 onChange={(date) =>
//                   dispatch(
//                     updateBatch({ index: idx, field: "expiryDate", value: date })
//                   )
//                 }
//               />

//               <Box sx={{ textAlign: "center" }}>
//                 <Tooltip
//                   title={
//                     batches.length <= 1
//                       ? "يلزم وجود دفعة واحدة على الأقل"
//                       : "حذف هذه الدفعة"
//                   }
//                 >
//                   <span>
//                     <IconButton
//                       color="error"
//                       disabled={batches.length <= 1}
//                       onClick={() => dispatch(removeBatch(idx))}
//                       size="small"
//                       sx={{ bgcolor: "#FEF2F2", "&:hover": { bgcolor: "#FEE2E2" } }}
//                     >
//                       <DeleteIcon size={18} />
//                     </IconButton>
//                   </span>
//                 </Tooltip>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Paper>
//     </Box>
//   );
// };
import React from "react";
import { Box, Paper, Typography, Button, IconButton, Tooltip, useTheme, alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomCounterField } from "../../../../shared/layout/CustomCounterField";
import { RTLDatePicker } from "../../../../shared/layout/RTLDatePicker";
import { DeleteIcon } from "lucide-react";
import { useDrugForm } from "../../hooks/useDrugForm";

interface StepBatchesProps {
  isPrivate?: boolean;
}

export const StepBatches: React.FC<StepBatchesProps> = ({ isPrivate = false }) => {
  const theme = useTheme();

  // جلب البيانات والدوال المناسبة تلقائياً حسب نوع الدواء (عام/خاص)
  const {
    batches,
    totalQuantity,
    handleAddBatch,
    handleRemoveBatch,
    handleUpdateBatch,
  } = useDrugForm(isPrivate);

  return (
    <Box sx={{ maxWidth: "1050px", width: "100%", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: 3.5,
          bgcolor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRight: `5px solid ${theme.palette.primary.main}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
              دفعات الدواء  
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
              أدخل تواريخ الصلاحية والكميات الخاصة بكل دفعة يتم إدخالها للمخزن.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 1.2,
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
            bgcolor: alpha(theme.palette.primary.main, 0.2),
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
          {batches.map((batch: any, idx: number) => (
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
                onChange={(val) => handleUpdateBatch(idx, "initialQuantity", val)}
                height="40px"
              />

              <RTLDatePicker
                value={batch.receivedDate}
                onChange={(date) => handleUpdateBatch(idx, "receivedDate", date)}
              />

              <RTLDatePicker
                value={batch.expiryDate}
                onChange={(date) => handleUpdateBatch(idx, "expiryDate", date)}
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
                      sx={{ bgcolor: "#FEF2F2", "&:hover": { bgcolor: "#FEE2E2" } }}
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
  );
};