import { Save } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";

interface CreatReturnInvoiceProps {
  items: SaleInvoiceItem[];
  saleInvoiceDiscount: number;
}

const CreatReturnInvoice = ({
  items,
  saleInvoiceDiscount,
}: CreatReturnInvoiceProps) => {
  console.log("before navigate ", saleInvoiceDiscount);
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      startIcon={<Save />}
      sx={{
        position: "fixed",
        bottom: "24px",
        left: "34px",
        zIndex: 9999,
        backgroundColor: "#634A7B",
        "&:hover": {
          backgroundColor: "#4A355E",
        },
        borderRadius: "8px",
        padding: "12px 24px",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }}
      onClick={() => {
        navigate("/pharmacy/sales-details/create-return", {
          state: { items, saleInvoiceDiscount },
        });
      }}
    >
      إضافة فاتورة إرجاع
    </Button>
  );
};

export default CreatReturnInvoice;

// import React from "react";
// import { Box, Stack, Typography, Divider, Button } from "@mui/material";
// import { AssignmentReturn } from "@mui/icons-material";

// interface SummaryBarProps {
//   subtotal: string;
//   discount: string;
//   totalAmount: string;
// }

// const InvoiceSummaryBar: React.FC<SummaryBarProps> = ({
//   subtotal,
//   discount,
//   totalAmount,
// }) => {
//   return (
//     <Box sx={{ mb: 4, mt: 2 }}>
//       {/* الحاوية الرئيسية المستطيلة */}
//       <Box
//         sx={{
//           width: "100%",
//           backgroundColor: "transparent",
//           border: "1px solid #e2e2e2",
//           borderRadius: "12px",
//           p: 2,
//           boxShadow: "none",
//         }}
//       >
//         <Stack
//           direction="row-reverse" // تحويل اتجاه الشريط بالكامل ليبدأ من اليمين إلى اليسار
//           spacing={2}
//           sx={{
//             alignItems: "center",
//             justifyContent: "space-around",
//           }}
//           divider={
//             <Divider
//               orientation="vertical"
//               flexItem
//               sx={{ borderColor: "#e0e0e0" }}
//             />
//           }
//         >
//           {/* 1. السعر الإجمالي (يظهر في أقصى اليمين الآن) */}
//           <Stack
//             sx={{
//               flex: 1,
//               justifyContent: "center",
//               px: 2,
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<AssignmentReturn />}
//               sx={{
//                 backgroundColor: "main.primary",
//                 "&:hover": { backgroundColor: "#815485" },
//               }}
//             >
//               إنشاء مرتجع
//             </Button>
//           </Stack>
//           <Stack
//             direction="row" // اتجاه أفقي طبيعي لترتيب النص ثم الرقم
//             sx={{
//               flex: 1,
//               justifyContent: "center",
//               px: 2,
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 500,
//               }}
//             >
//               السعر الإجمالي:
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{ fontWeight: 700, color: "#1E293B" }}
//             >
//               {totalAmount}
//             </Typography>
//           </Stack>

//           {/* 2. الخصم (في المنتصف) */}
//           <Stack
//             direction="row"
//             sx={{
//               flex: 1,
//               justifyContent: "center",
//               px: 2,
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 500,
//               }}
//             >
//               الخصم:
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{ fontWeight: 700, color: "#EF4444" }}
//             >
//               {discount}
//             </Typography>
//           </Stack>

//           {/* 3. المدفوع جزئياً / المجموع الفرعي (في أقصى اليسار) */}
//           <Stack
//             direction="row"
//             sx={{
//               flex: 1,
//               justifyContent: "center",
//               px: 2,
//               gap: 1,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "text.secondary",
//                 fontWeight: 500,
//               }}
//             >
//               المدفوع جزئياً:
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{ fontWeight: 700, color: "#1E293B" }}
//             >
//               {subtotal}
//             </Typography>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// };

// export default InvoiceSummaryBar;
