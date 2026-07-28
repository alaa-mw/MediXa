import React from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Container,
} from "@mui/material";
// import type PurchaseInvoiceDetails from "../PurchaseInvoiceDetails";
import type {
  PurchaseInvoiceDetails,
} from "../../types/purchaseInvoice";

type Props = {
  detailData: PurchaseInvoiceDetails;
};

const PurchaseInvoiceInfo = ({ detailData }: Props) => {
  const supplier = detailData.supplier;

  return (
    <Container
      sx={{
        backgroundColor: "background.paper",
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            السعر الكلي
          </Typography>
          <Typography
            variant="h5"
            color="secondary"
            sx={{ fontWeight: "bold" }}
          >
            {detailData.totalPrice}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            الحالة
          </Typography>
          <Chip label={detailData.status} color="info" variant="filled" />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            حالة الدفع
          </Typography>
          <Chip
            label={detailData.paymentStatus}
            color="info"
            variant="filled"
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        معلومات المورد
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            اسم المورد
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier?.supplierName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            رقم الموبايل
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier?.phone}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            العنوان
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier?.address}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ملاحظات
          </Typography>
          <Typography variant="body1" color="inherit">
            {supplier?.notes}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        معلومات الفاتورة
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            رقم الفاتورة
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.invoiceNumber}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            تاريخ الفاتورة
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.invoiceDate}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ملاحظة
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.notes}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            الحسم
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.discount} ل.س
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            السعر الاجمالي
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.totalPrice} ل.س
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PurchaseInvoiceInfo;
