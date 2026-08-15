import React from "react";
import { useSearchParams } from "react-router-dom"; // أو مكتبة التوجيه التي تستخدمها
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSubscriptionStatus } from "../hook/useGetPaymentStatus";

export const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  // const {
  //   data: response,
  //   isLoading,
  //   error,
  // } = useSubscriptionStatus(paymentId!);
  // const paymentData = response?.data;

  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (error || !paymentData) {
  //   return (
  //     <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
  //       <Typography variant="h6" color="error">
  //         تعذر التحقق من حالة الدفع. يرجى مراجعة الدعم الفني.
  //       </Typography>
  //     </Container>
  //   );
  // }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            تم الدفع بنجاح!
          </Typography>
          {/* <Typography variant="body1" color="text.secondary" gutterBottom>
            رقم عملية الدفع: {paymentData.subscriptionPaymentId}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            المبلغ المدفوع: {paymentData.amount / 100} {paymentData.currency}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ mt: 2, mb: 4 }}>
            حالة الاشتراك: {paymentData.subscription.status} (يبدأ في:{" "}
            {new Date(paymentData.subscription.startsAt).toLocaleDateString()})
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/dashboard"
            fullWidth
          >
            الذهاب إلى لوحة التحكم
          </Button>
        */}
        </CardContent>
      </Card>
    </Container>
  );
};
