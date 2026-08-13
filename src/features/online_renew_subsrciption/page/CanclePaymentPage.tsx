import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export const PaymentCancelPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <CancelIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            تم إلغاء عملية الدفع
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            لم يتم خصم أي مبلغ مالي. يمكنك المحاولة مرة أخرى في أي وقت.
          </Typography>

          <Button variant="outlined" color="primary" href="/plans" fullWidth>
            العودة إلى الخطط
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
