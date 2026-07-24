// import React from "react";
// import {
//   Box,
//   Card,
//   Chip,
//   IconButton,
//   MenuItem,
//   Pagination as MuiPagination,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import type {
//   PharmacySubscription,
//   Pagination,
// } from "../../types/subscriptionDetailes";

// interface SubscriptionHistoryTableProps {
//   subscriptions: PharmacySubscription[];
//   pagination?: Pagination;
//   onPageChange?: (page: number) => void;
//   onLimitChange?: (limit: number) => void;
// }

// const SubscriptionHistoryTable: React.FC<SubscriptionHistoryTableProps> = ({
//   subscriptions,
//   pagination,
//   onPageChange,
//   onLimitChange,
// }) => {
//   // تنسيق التاريخ والوقت
// const formatDate = (dateString: string) => {
//   if (!dateString) return "-";
//   return dateString.split("T")[0].replace(/-/g, "/");
// };

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     const dateFormatted = dateString.split("T")[0].replace(/-/g, "/");
//     const timeFormatted = date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//     return { dateFormatted, timeFormatted };
//   };

//   // تنسيق الأسعار
//   const formatPrice = (price: number) => {
//     return price.toLocaleString();
//   };

//   // النسخ إلى الحافظة
//   const handleCopy = (text: string) => {
//     navigator.clipboard.writeText(text);
//   };

//   // شارة الحالة (Status Badge)
// const renderStatusChip = (status: PharmacySubscription["status"]) => {
//   switch (status) {
//     case "ACTIVE":
//       return (
//         <Chip
//           label="نشط"
//           size="small"
//           sx={{
//             bgcolor: "#E6F4EA",
//             color: "#137333",
//             fontWeight: 600,
//             fontSize: "12px",
//             px: 1,
//             height: "28px",
//             "& .MuiChip-label": {
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//               "&::before": {
//                 content: '""',
//                 width: "7px",
//                 height: "7px",
//                 borderRadius: "50%",
//                 backgroundColor: "#137333",
//               },
//             },
//           }}
//         />
//       );
//     case "SCHEDULED":
//       return (
//         <Chip
//           icon={
//             <AccessTimeIcon
//               sx={{ fontSize: "15px !important", color: "#B06000" }}
//             />
//           }
//           label="مجدول"
//           size="small"
//           sx={{
//             bgcolor: "#FEF7E0",
//             color: "#B06000",
//             fontWeight: 600,
//             fontSize: "12px",
//             px: 0.5,
//             height: "28px",
//           }}
//         />
//       );
//     default:
//       return (
//         <Chip
//           label="منتهي"
//           size="small"
//           sx={{
//             bgcolor: "#FCE8E6",
//             color: "#C5221F",
//             fontWeight: 600,
//             fontSize: "12px",
//             px: 1,
//             height: "28px",
//           }}
//         />
//       );
//   }
// };

//   return (
//     <Box sx={{ width: "100%", direction: "rtl", mt: 1 }}>
//       {/* عنوان الجدول */}
//       <Typography
//         variant="h6"
//         sx={{
//           fontSize: "18px",
//           fontWeight: 700,
//           color: "#1E293B",
//           mb: 2,
//         }}
//       >
//         سجل الاشتراكات
//       </Typography>

//       {/* الجدول */}
//       <TableContainer
//         component={Box}
//         sx={{
//           boxShadow: "none",
//           bgcolor: "transparent",
//         }}
//       >
//         <Table
//           sx={{
//             minWidth: 650,
//             borderCollapse: "separate",
//             borderSpacing: "0 10px",
//           }}
//         >
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#F8FAFC" }}>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 رقم الاشتراك
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 الخطة
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 الحالة
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 مدة الاشتراك
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 الأسعار
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 العرض المطبق
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ fontWeight: 600, color: "#475569", py: 1.5 }}
//               >
//                 تاريخ الإنشاء
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {subscriptions.map((sub) => {
//               const createdInfo = formatDateTime(sub.createdAt);
//               const hasDiscount =
//                 sub.appliedOffer && sub.appliedOffer.discountValue > 0;

//               return (
//                 <TableRow
//                   key={sub.pharmacySubscriptionId}
//                   sx={{
//                     bgcolor: "#FFFFFF",
//                     borderRadius: "12px",
//                     boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
//                     "& td": {
//                       borderTop: "1px solid #E2E8F0",
//                       borderBottom: "1px solid #E2E8F0",
//                       py: 2,
//                     },
//                     "& td:first-of-type": {
//                       borderRight: "1px solid #E2E8F0",
//                       borderTopRightRadius: "12px",
//                       borderBottomRightRadius: "12px",
//                     },
//                     "& td:last-of-type": {
//                       borderLeft: "1px solid #E2E8F0",
//                       borderTopLeftRadius: "12px",
//                       borderBottomLeftRadius: "12px",
//                     },
//                   }}
//                 >
//                   {/* رقم الاشتراك */}
//                   <TableCell align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 0.5,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: 700,
//                           fontSize: "14px",
//                           color: "#1E293B",
//                         }}
//                       >
//                         #{sub.pharmacySubscriptionId}
//                       </Typography>
//                       <IconButton
//                         size="small"
//                         onClick={() =>
//                           handleCopy(`#${sub.pharmacySubscriptionId}`)
//                         }
//                         sx={{ color: "#94A3B8", p: 0.5 }}
//                       >
//                         <ContentCopyIcon sx={{ fontSize: 16 }} />
//                       </IconButton>
//                     </Box>
//                   </TableCell>

//                   {/* الخطة */}
//                   <TableCell align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: 0.5,
//                       }}
//                     >
// <Typography
//   sx={{
//     fontWeight: 600,
//     fontSize: "14px",
//     color: "#1E293B",
//   }}
// >
//   {sub.plan.name}
// </Typography>
// <Chip
//   label={sub.plan.code}
//   size="small"
//   sx={{
//     bgcolor: "#E6F4EA",
//     color: "#137333",
//     fontSize: "11px",
//     fontWeight: 600,
//     height: "20px",
//   }}
// />
//                       <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
//                         {sub.plan.durationMonths} شهر
//                       </Typography>
//                     </Box>
//                   </TableCell>

//                   {/* الحالة */}
//                   <TableCell align="center">
//                     {renderStatusChip(sub.status)}
//                   </TableCell>

//                   {/* مدة الاشتراك */}
//                   <TableCell align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 1,
//                       }}
//                     >
// <Box
//   sx={{
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     gap: 0.3,
//   }}
// >
//   <Typography
//     sx={{
//       fontSize: "13px",
//       fontWeight: 600,
//       color: "#334155",
//     }}
//   >
//     {formatDate(sub.startsAt)}
//   </Typography>
//   <Typography
//     sx={{
//       fontSize: "13px",
//       fontWeight: 600,
//       color: "#334155",
//     }}
//   >
//     {formatDate(sub.endsAt)}
//   </Typography>
// </Box>
//                       <CalendarTodayOutlinedIcon
//                         sx={{ fontSize: 18, color: "#94A3B8" }}
//                       />
//                     </Box>
//                   </TableCell>

//                   {/* الأسعار */}
//                   <TableCell align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: 0.3,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: "13px",
//                           color: hasDiscount ? "#64748B" : "#1E293B",
//                           textDecoration: hasDiscount ? "line-through" : "none",
//                           fontWeight: hasDiscount ? 400 : 600,
//                         }}
//                       >
//                         {formatPrice(sub.basePrice)} {sub.currency}
//                       </Typography>

//                       <Typography
//                         sx={{
//                           fontSize: "14px",
//                           fontWeight: 700,
//                           color: "#137333",
//                         }}
//                       >
//                         {formatPrice(sub.finalPrice)} {sub.currency}
//                       </Typography>

//                       <Typography
//                         sx={{
//                           fontSize: "12px",
//                           color: hasDiscount ? "#137333" : "#64748B",
//                           fontWeight: 500,
//                         }}
//                       >
//                         {hasDiscount
//                           ? `خصم ${sub.appliedOffer?.discountValue}%`
//                           : "لا يوجد خصم"}
//                       </Typography>
//                     </Box>
//                   </TableCell>

//                   {/* العرض المطبق */}
//                   <TableCell align="center">
// {sub.appliedOffer ? (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: 0.5,
//     }}
//   >
//     <Typography
//       sx={{
//         fontSize: "13px",
//         fontWeight: 600,
//         color: "#1E293B",
//       }}
//     >
//       {sub.appliedOffer.title}
//     </Typography>
//     <Chip
//       label={sub.appliedOffer.code}
//       size="small"
//       sx={{
//         bgcolor: "#E6F4EA",
//         color: "#137333",
//         fontSize: "11px",
//         fontWeight: 600,
//         height: "20px",
//       }}
//     />
//     <Typography
//       sx={{
//         fontSize: "12px",
//         color: "#137333",
//         fontWeight: 600,
//       }}
//     >
//       خصم {sub.appliedOffer.discountValue}%
//     </Typography>
//   </Box>
// ) : (
//   <Typography sx={{ fontSize: "14px", color: "#64748B" }}>
//     -
//   </Typography>
// )}
//                   </TableCell>

//                   {/* تاريخ الإنشاء */}
//                   <TableCell align="center">
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontSize: "13px",
//                           fontWeight: 500,
//                           color: "#334155",
//                         }}
//                       >
//                         {createdInfo.dateFormatted}
//                       </Typography>
//                       <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
//                         {createdInfo.timeFormatted}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Footer */}
//       {pagination && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 3,
//             px: 1,
//           }}
//         >
//           {/* محدد عدد العناصر في الصفحة */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Select
//               value={pagination.limit || 20}
//               onChange={(e) => onLimitChange?.(Number(e.target.value))}
//               size="small"
//               sx={{
//                 height: "32px",
//                 borderRadius: "8px",
//                 fontSize: "13px",
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#E2E8F0",
//                 },
//               }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={20}>20</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography sx={{ fontSize: "13px", color: "#64748B" }}>
//               عدد العناصر في الصفحة
//             </Typography>
//           </Box>

//           {/* معلومات وأزرار التنقل */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Typography sx={{ fontSize: "13px", color: "#64748B" }}>
//               من {(pagination.page - 1) * pagination.limit + 1} إلى{" "}
//               {Math.min(
//                 pagination.page * pagination.limit,
//                 pagination.totalItems,
//               )}{" "}
//               من {pagination.totalItems} عنصر
//             </Typography>

//             <MuiPagination
//               count={pagination.totalPages || 1}
//               page={pagination.page || 1}
//               onChange={(_, page) => onPageChange?.(page)}
//               shape="rounded"
//               renderItem={(item) => (
//                 <Box
//                   component="button"
//                   onClick={item.onClick}
//                   disabled={item.disabled}
//                   sx={{
//                     border: item.selected
//                       ? "1px solid #1B6B50"
//                       : "1px solid #E2E8F0",
//                     bgcolor: item.selected ? "#FFFFFF" : "#FFFFFF",
//                     color: item.selected ? "#1B6B50" : "#64748B",
//                     fontWeight: item.selected ? 700 : 500,
//                     borderRadius: "8px",
//                     width: "32px",
//                     height: "32px",
//                     mx: 0.3,
//                     cursor: item.disabled ? "default" : "pointer",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     opacity: item.disabled ? 0.5 : 1,
//                   }}
//                 >
//                   {item.type === "page" && item.page}
//                   {item.type === "next" && (
//                     <ChevronLeftIcon sx={{ fontSize: 18 }} />
//                   )}
//                   {item.type === "previous" && (
//                     <ChevronRightIcon sx={{ fontSize: 18 }} />
//                   )}
//                 </Box>
//               )}
//             />
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SubscriptionHistoryTable;
import React from "react";
import type {
  Pagination,
  PharmacySubscription,
} from "../../types/subscriptionDetailes";
import { Box, CircularProgress } from "@mui/material";
import PharamSubsTableHeader from "./PharamSubsTableHeader";
import EmptyState from "../privateOffer/AssignOffer/EmptyState";
import PharamSubsTableRow from "./PharamSubsTableRow";

interface SubscriptionHistoryTableProps {
  subscriptions: PharmacySubscription[];
  pagination?: Pagination;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const SubscriptionHistoryTable = ({
  subscriptions,
  pagination,
  isLoading = false,
  onPageChange,
  onLimitChange,
}: SubscriptionHistoryTableProps) => {
  return (
    <Box
      sx={{
        width: "100%", // ضمان أخذ العرض الكامل
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#ffffff",
      }}
    >
      <PharamSubsTableHeader />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : subscriptions.length === 0 ? (
        <EmptyState />
      ) : (
        subscriptions.map((subscribe, index) => (
          <PharamSubsTableRow
            key={subscribe.pharmacySubscriptionId}
            subscriptions={subscribe}
            itemIndex={index}
          />
        ))
      )}
    </Box>
  );
};

export default SubscriptionHistoryTable;
