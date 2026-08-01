import { Box, CircularProgress, Paper, Typography } from "@mui/material";
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
    <Box sx={{ p: 2, width: "100%", boxSizing: "border-box" }}>
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

      {/* كارد الملاحظات */}
      {invoiceNotes && (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            mb: 2,
            width: "100%",
            boxSizing: "border-box",
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

      {/* 3. تفاصيل محتوى الفاتورة والمرتجع (باستخدام Box مباشرة لملء العرض 100%) */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          width: "100%",
          overflow: "hidden",
          mb: 3,
          boxSizing: "border-box",
        }}
      >
        <InvoiceSaleTable
          returnInvoiceData={invoice?.items}
          isReturnInvoice={true}
        />
      </Paper>
    </Box>
  );
};

export default ReturnInvoiceDetailsPage;
