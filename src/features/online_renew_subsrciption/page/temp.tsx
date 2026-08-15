import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { CreditCardIcon } from "lucide-react";
import { useSubscriptionCheckout } from "../hook/useSubscriptionCheckout";

function Test() {
   const { checkout, isLoading, error } = useSubscriptionCheckout();

  const handleSubscribeClick = () => {
    checkout(1, 1);
  };

  const name = localStorage.getItem("pharmacyName");
  console.log("pharmacyName from localStorage:", name);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* <Typography variant="h4" align="center" gutterBottom>
        اختر خطة الاشتراك المناسبة yte
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {name}
      </Typography> */}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Card sx={{ maxWidth: 345, m: 2, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              plane Name
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              250 USD
            </Typography>

            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                حدث خطأ أثناء إنشاء عملية الدفع، يرجى المحاولة لاحقاً.
              </Typography>
            )}

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CreditCardIcon />
                  )
                }
                onClick={handleSubscribeClick}
                disabled={isLoading}
              >
                {isLoading ? "جاري تحويلك لـ Stripe..." : "الاشتراك والدفع"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Test;
