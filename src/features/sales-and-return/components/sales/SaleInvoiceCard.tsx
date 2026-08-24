


// import React from "react";
// import { Box, Typography, Button, Paper, styled, CircularProgress } from "@mui/material";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
// import type { SaleInvoiceData } from "../../types/saleInvoice";
// import { useQueryClient } from "@tanstack/react-query";
// import usePatchData from "../../../../shared/hooks/usePatchData";
// import { useSnackbar } from "../../../../shared/providers/useSnackbar";

// const PremiumCard = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#ffffff",
//   borderRadius: "16px",
//   padding: "24px",
//   boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.01)",
//   border: "1px solid #f2f2f2",
//   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//   display: "flex",
//   flexDirection: "column",
//   gap: "16px",
//   height: "100%",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.03)",
//     borderColor: `${theme.palette.primary.main}25`,
//   },
// }));

// const StatusDot = styled(Box)<{ dotColor: string }>(({ dotColor }) => ({
//   width: "12px",
//   height: "12px",
//   borderRadius: "50%",
//   backgroundColor: dotColor,
//   display: "inline-block",
//   boxShadow: `0 0 0 4px ${dotColor}15`,
// }));

// interface SaleInvoiceCardProps {
//   invoice: SaleInvoiceData;
//   onDetailsClick: (id: number) => void;
// }

// export const SaleInvoiceCard: React.FC<SaleInvoiceCardProps> = ({ invoice, onDetailsClick }) => {
//   const queryClient = useQueryClient();
//   const { showSnackbar } = useSnackbar();

//   // إعداد الـ Mutation للدفع المباشر باستخدام PATCH
//   const { mutate: completePayment, isPending: isPaying } = usePatchData(
//     `/sale-invoice/${invoice.saleInvoiceId}/payment`
//   );

//   const handleCompletePayment = () => {
//     completePayment(
//       { paymentStatus: "PAID" },
//       {
//         onSuccess: () => {
//           // 1. تحديث الكاش محلياً ليتغير الزر فوراً
//           invoice.paymentStatus = "PAID";

//           // 2. إظهار السناك بار للنجاح
//           showSnackbar(`تم إتمام دفع الفاتورة رقم #${invoice.pharmacyInvoiceId} بنجاح!`, "success");

//           // 3. إعادة إجبار الاستعلام على الجلب المباشر من السيرفر
//           queryClient.refetchQueries({
//             queryKey: ["sale-invoices"],
//             exact: false,
//           });
//         },
//         onError: (err: any) => {
//           console.error("فشل إكمال عملية الدفع:", err);
//           const errorMsg =
//             err?.response?.data?.message || "حدث خطأ أثناء إتمام عملية الدفع.";
//           showSnackbar(
//             Array.isArray(errorMsg) ? errorMsg.join(" | ") : errorMsg,
//             "error"
//           );
//         },
//       }
//     );
//   };

//   const getStatusColor = (): string => {
//     switch (invoice.paymentStatus) {
//       case "PENDING":
//         return "#f59e0b";
//       case "PARTIAL":
//         return "#06b6d4";
//       case "PAID":
//         return "#10b981";
//       default:
//         return "#3b82f6";
//     }
//   };

//   const statusColor = getStatusColor();

//   const invoiceDate = new Date(invoice.createdAt);
//   const formattedDate = invoiceDate.toLocaleDateString("ar-SY", { day: "numeric", month: "numeric", year: "numeric" });
//   const formattedTime = invoiceDate.toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" });

//   // const total = parseFloat(invoice.totalAmount);

//   // const getFinancials = () => {
//   //   if (invoice.paymentStatus === "PAID") {
//   //     return { paid: total, remaining: 0 };
//   //   }
//   //   if (invoice.paymentStatus === "PENDING") {
//   //     return { paid: 0, remaining: total };
//   //   }
//   //   const paid = invoice.subtotal ? parseFloat(invoice.subtotal) : 0;
//   //   return { paid: paid, remaining: Math.max(0, total - paid) };
//   // };
//   // const { paid: paidAmount, remaining: remainingAmount } = getFinancials();
//   const total = Number(invoice.totalAmount);
// const paidAmount = invoice.paidAmount;
// const remainingAmount = invoice.remainingAmount;

//   const hasPatient = !!invoice.pharmacyInvoice.patient?.fullName;
//   const isPartialOrPending = invoice.paymentStatus === "PARTIAL" || invoice.paymentStatus === "PENDING";

//   return (
//     <PremiumCard elevation={0}>
//       {/* 1. الرأس: رقم الفاتورة والتاريخ */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6, width: "100%" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <StatusDot dotColor={statusColor} />
//           <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1f1f1f", fontSize: "1.05rem" }}>
//             #INV-{invoice.pharmacyInvoiceId}
//           </Typography>
//         </Box>
//         <Typography variant="caption" sx={{ color: "#595959", fontSize: "0.82rem", fontWeight: 600, pr: 3.5 }}>
//           {formattedDate} • {formattedTime}
//         </Typography>
//       </Box>

//       {/* 2. المنتصف: اسم المريض والأيقونة */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "50px",
//             height: "50px",
//             borderRadius: "50%",
//             backgroundColor: hasPatient ? "#b8e0fa40" : "#f5f5f5",
//             color: hasPatient ? "#506680" : "#bfbfbf",
//           }}
//         >
//           <PersonOutlineIcon sx={{ fontSize: 24 }} />
//         </Box>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             fontWeight: 700, 
//             color: hasPatient ? "#262626" : "#bfbfbf", 
//             fontSize: "1.15rem",
//             fontStyle: "normal"
//           }}
//         >
//           {hasPatient ? invoice.pharmacyInvoice.patient?.fullName : "غير محدد"}
//         </Typography>
//       </Box>

//       {/* 3. الأسفل: المبالغ المالية */}
//       <Box sx={{ mt: "auto", pt: 2, borderTop: "1px dashed #f0f0f0" }}>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
//             <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
//               إجمالي الفاتورة
//             </Typography>
//             <Typography variant="body2" sx={{ fontSize: "1.12rem", fontWeight: 600, color: "#1f1f1f" }}>
//               {total.toLocaleString()}{" "}
//               <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 500, color: "#8c8c8c", mr: 0.5 }}>
//                 ل.س
//               </Box>
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
//             <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
//               المدفوع
//             </Typography>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: "#434343", fontSize: "1rem" }}>
//               {paidAmount.toLocaleString()}{" "}
//               <Box component="span" sx={{ fontSize: "0.72rem", fontWeight: 400, color: "#8c8c8c", mr: 0.3 }}>
//                 ل.س
//               </Box>
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
//             <Typography variant="caption" sx={{ color: "#8c8c8c", fontSize: "0.82rem", fontWeight: 500 }}>
//               المتبقي
//             </Typography>
//             <Typography variant="body2" sx={{ fontWeight: 700, color: statusColor, fontSize: "1rem" }}>
//               {remainingAmount.toLocaleString()}{" "}
//               <Box component="span" sx={{ fontSize: "0.72rem", fontWeight: 400, color: "#8c8c8c", mr: 0.3 }}>
//                 ل.س
//               </Box>
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* 4. زر العمليات */}
//       <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
//         <Button
//           variant="contained"
//           disableElevation
//           onClick={() => onDetailsClick(invoice.saleInvoiceId)}
//           fullWidth
//           sx={{
//             backgroundColor: "secondary.main",
//             color: "#ffffff",
//             fontWeight: 700,
//             fontSize: "0.88rem",
//             textTransform: "none",
//             borderRadius: "10px",
//             py: "10px",
//             transition: "all 0.2s ease",
//           }}
//         >
//           عرض التفاصيل
//         </Button>

//         {/* عرض زر "إكمال الدفع" فقط عند وجود مبلغ غير مدفوع بالكامل */}
//         {isPartialOrPending && (
//           <Button
//             variant="outlined"
//             onClick={handleCompletePayment}
//             disabled={isPaying}
//             fullWidth
//             sx={{
//               backgroundColor: "#fff",
//               color: "#1f1f1f",
//               borderColor: "#d9d9d9",
//               fontWeight: 700,
//               borderRadius: "10px",
//               py: "10px",
//               "&:hover": { borderColor: "#1f1f1f", backgroundColor: "#fff" },
//             }}
//           >
//             {isPaying ? (
//               <CircularProgress size={18} sx={{ color: "#10b981" }} />
//             ) : (
//               <>
//                 <Box component="span" sx={{ color: "#10b981", ml: 0.8, mr: 0.8, fontWeight: 900 }}>
//                   ✓
//                 </Box>
//                 إتمام الدفع
//               </>
//             )}
//           </Button>
//         )}
//       </Box>
//     </PremiumCard>
//   );
// };


import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  styled,
  CircularProgress,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";

import type { SaleInvoiceData } from "../../types/saleInvoice";
import usePatchData from "../../../../shared/hooks/usePatchData";
import { useSnackbar } from "../../../../shared/providers/useSnackbar";

const PremiumCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.01)",
  border: "1px solid #f2f2f2",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "100%",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.03)",
    borderColor: `${theme.palette.primary.main}25`,
  },
}));

const StatusDot = styled(Box)<{ dotColor: string }>(({ dotColor }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: dotColor,
  display: "inline-block",
  boxShadow: `0 0 0 4px ${dotColor}15`,
}));

interface SaleInvoiceCardProps {
  invoice: SaleInvoiceData;
  onDetailsClick: (id: number) => void;
  onPaymentSuccess: () => void;
}

export const SaleInvoiceCard: React.FC<SaleInvoiceCardProps> = ({
  invoice,
  onDetailsClick,
  onPaymentSuccess,
}) => {
  const { showSnackbar } = useSnackbar();

  const { mutate: completePayment, isPending: isPaying } = usePatchData(
    `/sale-invoice/${invoice.saleInvoiceId}/payment`
  );

  const handleCompletePayment = () => {
    completePayment(
      {
        paymentStatus: "PAID",
      },
      {
        onSuccess: () => {
          showSnackbar(
            `تم إتمام دفع الفاتورة رقم #${invoice.pharmacyInvoiceId} بنجاح!`,
            "success"
          );

          // إعادة جلب البيانات من الـ hook الأب
          onPaymentSuccess();
        },

        onError: (err: any) => {
          console.error("فشل إكمال عملية الدفع:", err);

          const errorMsg =
            err?.response?.data?.message ||
            "حدث خطأ أثناء إتمام عملية الدفع.";

          showSnackbar(
            Array.isArray(errorMsg)
              ? errorMsg.join(" | ")
              : errorMsg,
            "error"
          );
        },
      }
    );
  };

  const getStatusColor = (): string => {
    switch (invoice.paymentStatus) {
      case "PENDING":
        return "#f59e0b";

      case "PARTIAL":
        return "#06b6d4";

      case "PAID":
        return "#10b981";

      default:
        return "#3b82f6";
    }
  };

  const statusColor = getStatusColor();

  const invoiceDate = new Date(invoice.createdAt);

  const formattedDate = invoiceDate.toLocaleDateString("ar-SY", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const formattedTime = invoiceDate.toLocaleTimeString("ar-SY", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const total = Number(invoice.totalAmount);
  const paidAmount = invoice.paidAmount;
  const remainingAmount = invoice.remainingAmount;

  const hasPatient = !!invoice.pharmacyInvoice.patient?.fullName;

  const isPartialOrPending =
    invoice.paymentStatus === "PARTIAL" ||
    invoice.paymentStatus === "PENDING";

  return (
    <PremiumCard elevation={0}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.6,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <StatusDot dotColor={statusColor} />

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#1f1f1f",
              fontSize: "1.05rem",
            }}
          >
            #INV-{invoice.pharmacyInvoiceId}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: "#595959",
            fontSize: "0.82rem",
            fontWeight: 600,
            pr: 3.5,
          }}
        >
          {formattedDate} • {formattedTime}
        </Typography>
      </Box>

      {/* Patient */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: hasPatient
              ? "#b8e0fa40"
              : "#f5f5f5",
            color: hasPatient
              ? "#506680"
              : "#bfbfbf",
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: 24 }} />
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: hasPatient
              ? "#262626"
              : "#bfbfbf",
            fontSize: "1.15rem",
          }}
        >
          {hasPatient
            ? invoice.pharmacyInvoice.patient?.fullName
            : "غير محدد"}
        </Typography>
      </Box>

      {/* Financials */}
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: "1px dashed #f0f0f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
          }}
        >
          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#8c8c8c",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              إجمالي الفاتورة
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "1.12rem",
                fontWeight: 600,
                color: "#1f1f1f",
              }}
            >
              {total.toLocaleString()}{" "}
              <Box
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#8c8c8c",
                }}
              >
                ل.س
              </Box>
            </Typography>
          </Box>

          {/* Paid */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#8c8c8c",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              المدفوع
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#434343",
                fontSize: "1rem",
              }}
            >
              {paidAmount.toLocaleString()}{" "}
              <Box
                component="span"
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  color: "#8c8c8c",
                }}
              >
                ل.س
              </Box>
            </Typography>
          </Box>

          {/* Remaining */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#8c8c8c",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              المتبقي
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: statusColor,
                fontSize: "1rem",
              }}
            >
              {remainingAmount.toLocaleString()}{" "}
              <Box
                component="span"
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  color: "#8c8c8c",
                }}
              >
                ل.س
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          disableElevation
          onClick={() =>
            onDetailsClick(invoice.saleInvoiceId)
          }
          fullWidth
          sx={{
            backgroundColor: "secondary.main",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.88rem",
            textTransform: "none",
            borderRadius: "10px",
            py: "10px",
          }}
        >
          عرض التفاصيل
        </Button>

        {/* يظهر فقط إذا لم تكن الفاتورة PAID */}
        {isPartialOrPending && (
          <Button
            variant="outlined"
            onClick={handleCompletePayment}
            disabled={isPaying}
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#1f1f1f",
              borderColor: "#d9d9d9",
              fontWeight: 700,
              borderRadius: "10px",
              py: "10px",

              "&:hover": {
                borderColor: "#1f1f1f",
                backgroundColor: "#fff",
              },
            }}
          >
            {isPaying ? (
              <CircularProgress
                size={18}
                sx={{
                  color: "#10b981",
                }}
              />
            ) : (
              <>
                <Box
                  component="span"
                  sx={{
                    color: "#10b981",
                    ml: 0.8,
                    mr: 0.8,
                    fontWeight: 900,
                  }}
                >
                  ✓
                </Box>

                إتمام الدفع
              </>
            )}
          </Button>
        )}
      </Box>
    </PremiumCard>
  );
};