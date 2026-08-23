// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Chip,
//   Grid,
//   Stack,
//   Box,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { CalendarTodayRounded } from "@mui/icons-material";
// import type { PurchaseInvoiceDetails } from "../types/purchaseInvoice";
// import { Edit, Person2Rounded } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import {
//   getInvoiceStatusMap,
//   getPaymentStatusMap,
// } from "../utils/getStatusMap";
// import { formatDate } from "../../damage_invoices/utils/formatDate";

// const PurchaseInvoiceCard: React.FC<{ data: PurchaseInvoiceDetails }> = ({
//   data,
// }) => {
//   const statusMap = getInvoiceStatusMap(data?.status || "");
//   const paymentMap = getPaymentStatusMap(data?.paymentStatus || "");
//   const navigate = useNavigate();
//   return (
//     <Card
//       sx={{
//         width: "100%",
//         borderRadius: 4,
//         transition: "all 0.2s ease-in-out",
//         border: "1px solid #eef2f5",
//         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
//         "&:hover": {
//           transform: "translateY(-4px)",
//           boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
//         },
//         bgcolor: "background.paper",
//         overflow: "hidden",
//       }}
//     >
//       <CardContent sx={{ p: 3 }}>
//         <Stack spacing={3}>
//           {/* ================= Header ================= */}
//           <Stack
//             sx={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//             }}
//           >
//             <Box>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 700,
//                   mt: 0.2,
//                 }}
//               >
//                 {data.invoiceNumber}
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   direction: "row",
//                   gap: 1,
//                   alignItems: "center",
//                 }}
//               >
//                 <CalendarTodayRounded
//                   sx={{ fontSize: 14, color: "text.secondary" }}
//                 />
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "text.secondary", fontWeight: 600 }}
//                 >
//                   {formatDate(data.invoiceDate || data.createdAt)}
//                 </Typography>
//               </Box>
//             </Box>

//             <Chip
//               label={statusMap.label}
//               color={statusMap.color}
//               sx={{
//                 fontWeight: 700,
//                 borderRadius: 10,
//                 color: `${statusMap.color}.dark`,
//               }}
//             />
//           </Stack>

//           {/* ================= Supplier ================= */}
//           <Grid container sx={{ mb: 3, gap: 1, alignItems: "center" }}>
//             {" "}
//             <Box
//               sx={{
//                 width: 54,
//                 height: 54,
//                 borderRadius: "50%",
//                 bgcolor: "#F3F7FA",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {" "}
//               <Person2Rounded sx={{ fontSize: 30, color: "#506680" }} />{" "}
//             </Box>{" "}
//             <Box>
//               {" "}
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: 700, color: "#34495E", mb: 0.5 }}
//               >
//                 {" "}
//                 {data.supplier.supplierName}{" "}
//               </Typography>{" "}
//               {/* <Typography sx={{ color: "#8A94A6", fontSize: "0.9rem", }} > {data.notes} </Typography> */}{" "}
//             </Box>{" "}
//           </Grid>{" "}

//           {/* Divider */}{" "}
//           <Box sx={{ borderTop: "1px solid #EEF2F5", my: 2 }} />

//           {/* ================= Statistics ================= */}
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "repeat(2,1fr)",
//               gap: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 p: 2,
//                 borderRadius: 3,
//                 bgcolor: "grey.100",
//               }}
//             >
//               <Typography variant="caption" color="text.secondary">
//                 إجمالي الفاتورة
//               </Typography>

//               <Typography
//                 variant="h6"
//                 sx={{
//                   mt: 1,
//                   fontWeight: 700,
//                 }}
//               >
//                 {data.totalPrice}

//                 <Typography
//                   component="span"
//                   variant="body2"
//                   color="text.secondary"
//                 >
//                   {" "}
//                  ل.س
//                 </Typography>
//               </Typography>
//             </Box>

//             <Box
//               sx={{
//                 p: 2,
//                 borderRadius: 3,
//                 bgcolor: "grey.100",
//               }}
//             >
//               <Typography variant="caption" color="text.secondary">
//                 حالة الدفع
//               </Typography>

//               <Box sx={{ mt: 1 }}>
//                 <Chip
//                   label={paymentMap.label}
//                   color={paymentMap.color}
//                   size="small"
//                   sx={{
//                     fontWeight: 700,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Box>
//           {/* ================= Action ================= */}
//           {data.status === "PENDING" || data.status === "PARTIALLY_STOCKED" ? (
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               startIcon={<Edit />}
//               onClick={() =>
//                 navigate(
//                   "/pharmacy/invoices/purchase/complete/" +
//                     data.supplierInvoiceId,
//                 )
//               }
//               sx={{
//                 height: 52,
//                 borderRadius: 3,
//                 fontWeight: 700,
//                 textTransform: "none",
//               }}
//             >
//               إكمال الدفعات
//             </Button>
//           ) : (
//             <Button
//               fullWidth
//               variant="contained"
//               color="secondary"
//               startIcon={<VisibilityIcon />}
//               onClick={() => navigate("details/" + data.supplierInvoiceId)}
//               sx={{
//                 height: 52,
//                 borderRadius: 3,
//                 fontWeight: 700,
//                 textTransform: "none",
//               }}
//             >
//               عرض التفاصيل
//             </Button>
//           )}
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };
// export default PurchaseInvoiceCard;
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CalendarTodayRounded } from "@mui/icons-material";
import type { PurchaseInvoiceDetails } from "../types/purchaseInvoice";
import { Edit, Person2Rounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  getInvoiceStatusMap,
  getPaymentStatusMap,
} from "../utils/getStatusMap";
import { formatDate } from "../../damage_invoices/utils/formatDate";
import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../../../shared/hooks/usePostData";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

const PurchaseInvoiceCard: React.FC<{ data: PurchaseInvoiceDetails }> = ({
  data,
}) => {
  const statusMap = getInvoiceStatusMap(data?.status || "");
  const paymentMap = getPaymentStatusMap(data?.paymentStatus || "");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  // إعداد طلب إتمام الدفع للمورد
  const { mutate: completePayment, isPending: isPaying } = usePostData(
    `/supplier-invoice/${data.supplierInvoiceId}/payment`
  );

  const handleCompletePayment = () => {
    completePayment(
      { paymentStatus: "PAID" },
      {
        onSuccess: () => {
          // 1. تحديث الحالة محلياً ليتغير الزر وحالة الدفع فوراً
          data.paymentStatus = "PAID";

          // 2. إظهار السناك بار
          showSnackbar(
            `تم إتمام الدفع للفاتورة رقم ${data.invoiceNumber} بنجاح!`,
            "success"
          );

          // 3. إعادة جلب الكاش مع إلغاء التخصيص الدقيق للـ keys لضمان المزامنة
          queryClient.invalidateQueries({
            queryKey: ["purchase-invoices"],
            exact: false,
          });
        },
        onError: (err: any) => {
          console.error("فشل إتمام الدفع للمورد:", err);
          const errorMsg =
            err?.response?.data?.message || "حدث خطأ أثناء إتمام عملية الدفع.";
          showSnackbar(
            Array.isArray(errorMsg) ? errorMsg.join(" | ") : errorMsg,
            "error"
          );
        },
      }
    );
  };

  // التحقق مما إذا كانت الفاتورة تتطلب دفعاً
  const isPartialOrPendingPayment = data.paymentStatus !== "PAID";

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        transition: "all 0.2s ease-in-out",
        border: "1px solid #eef2f5",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
        },
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* ================= Header ================= */}
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mt: 0.2,
                }}
              >
                {data.invoiceNumber}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  direction: "row",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <CalendarTodayRounded
                  sx={{ fontSize: 14, color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  {formatDate(data.invoiceDate || data.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={statusMap.label}
              color={statusMap.color}
              sx={{
                fontWeight: 700,
                borderRadius: 10,
                color: `${statusMap.color}.dark`,
              }}
            />
          </Stack>

          {/* ================= Supplier ================= */}
          <Grid container sx={{ mb: 3, gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                bgcolor: "#F3F7FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Person2Rounded sx={{ fontSize: 30, color: "#506680" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#34495E", mb: 0.5 }}
              >
                {data.supplier.supplierName}
              </Typography>
            </Box>
          </Grid>

          {/* Divider */}
          <Box sx={{ borderTop: "1px solid #EEF2F5", my: 2 }} />

          {/* ================= Statistics ================= */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "grey.100",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                إجمالي الفاتورة
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                }}
              >
                {data.totalPrice}

                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {" "}
                  ل.س
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "grey.100",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                حالة الدفع
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Chip
                  label={paymentMap.label}
                  color={paymentMap.color}
                  size="small"
                  sx={{
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* ================= Action ================= */}
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            {data.status === "PENDING" || data.status === "PARTIALLY_STOCKED" ? (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<Edit sx={{ fontSize: "1.1rem !important" }} />}
                onClick={() =>
                  navigate(
                    "/pharmacy/invoices/purchase/complete/" +
                      data.supplierInvoiceId
                  )
                }
                sx={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  textTransform: "none",
                  py: "8px",
                  px: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                إكمال الدفعات
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<VisibilityIcon sx={{ fontSize: "1.1rem !important" }} />}
                onClick={() => navigate("details/" + data.supplierInvoiceId)}
                sx={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  textTransform: "none",
                  py: "8px",
                  px: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                عرض التفاصيل
              </Button>
            )}

            {/* عرض زر إتمام الدفع فقط إذا كانت حالة الدفع غير مكتملة */}
            {isPartialOrPendingPayment && (
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
                  fontSize: "0.82rem",
                  borderRadius: "10px",
                  py: "8px",
                  px: "6px",
                  whiteSpace: "nowrap",
                  "&:hover": { borderColor: "#1f1f1f", backgroundColor: "#fff" },
                }}
              >
                {isPaying ? (
                  <CircularProgress size={16} sx={{ color: "#10b981" }} />
                ) : (
                  <>
                    <Box
                      component="span"
                      sx={{ color: "#10b981", ml: 0.5, mr: 0.5, fontWeight: 900 }}
                    >
                      ✓
                    </Box>
                    إتمام الدفع
                  </>
                )}
              </Button>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PurchaseInvoiceCard;