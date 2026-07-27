import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useReturnInvoiceDetails from "./hooks/useReturnInvoiceDetails";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceSaleTable from "../components/InvoiceTableItem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ReturnInvoiceDetailsPage = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const {
    data: response,
    isLoading: isSaleLoading,
    error,
  } = useReturnInvoiceDetails(parseInt(invoiceId!));

  if (isSaleLoading) return <CircularProgress />;

  if (error)
    return <Typography color="error">حدث خطأ أثناء تحميل الفاتورة</Typography>;

  const invoice = response?.data;
  const patient = invoice?.pharmacyInvoice?.patient;
  const invoiceNotes = invoice?.pharmacyInvoice?.notes;

  return (
    <Box sx={{ p: 1, width: "100%" }}>
      {/* 1. الهيدر العلوي */}
      <InvoiceHeader
        invoiceId={invoice?.returnInvoiceId!}
        createdAt={invoice?.createdAt!}
        paymentStatus={invoice?.referenceSaleInvoice!.paymentStatus!}
        saleType={invoice?.referenceSaleInvoice!.saleType!}
        totalAmount={invoice?.subtotalRefund!.toString()!}
        subTotal={invoice?.subtotalRefund!.toString()!}
        discount={invoice?.referenceSaleInvoice!.discount!.toString()!}
        isFive={
          invoice?.referenceSaleInvoice!.paymentStatus == "PARTIAL"
            ? true
            : false
        }
        returnreason={invoice?.items[0].returnReason}
        patient={patient}
        isReturnInvoice={true}
      />

      {/* كارد الملاحظات الصغير فوق الجدول */}
      {/* كارد الملاحظات الصغير فوق الجدول في سطر واحد */}
      {invoiceNotes && (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1, // مسافة بسيطة بين الأيقونة والعنوان والنص
            p: 1.5,
            mb: 2,
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            direction: "rtl",
          }}
        >
          <InfoOutlinedIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            ملاحظات الفاتورة:
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {invoiceNotes}
          </Typography>
        </Paper>
      )}

      {/* 3. تفاصيل محتوى الفاتورة والمرتجع */}
      <Grid container spacing={3} sx={{ width: "100%", m: 0 }}>
        <Grid sx={{ p: "0px !important", xs: 12, md: 12 }}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              width: "100%",
              mb: 3,
            }}
          >
            <InvoiceSaleTable
              returnInvoiceData={invoice?.items}
              isReturnInvoice={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReturnInvoiceDetailsPage;
