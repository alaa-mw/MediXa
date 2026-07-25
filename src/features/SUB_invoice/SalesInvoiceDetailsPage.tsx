import InvoiceHeader from "./components/InvoiceHeader";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import InvoiceSaleTable from "./components/InvoiceTableItem";
import ReturnTableWithHeader from "./components/ReturnTableWithHeader";
import CreatReturnInvoice from "./components/InvoiceSummaryBar";
import useSaleInvoiceDetails from "./hooks/useSaleInvoiceDetails";
import useReturnInvoicesBySale from "./return-invoice/hooks/useAllReturnInvoice";
import type { ReturnInvoiceBySale } from "./return-invoice/Types/returnInvoiceList";

const SaleInvoiceDetails = () => {
  // 1. استدعاء الـ Hooks في المستوى الأعلى ودون أي شروط تسبقها
  const {
    data: response,
    isLoading: isSaleLoading,
    error,
  } = useSaleInvoiceDetails(1);
  const { returnInvoices, isLoading: isReturnsLoading } =
    useReturnInvoicesBySale(1);

  // 2. شروط التحميل والإرجاع تكون *بعد* استدعاء جميع الـ Hooks
  if (isSaleLoading || isReturnsLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">حدث خطأ أثناء تحميل الفاتورة</Typography>;

  const invoice = response?.data;

  return (
    <Box sx={{ p: 1, width: "100%" }}>
      {/* 1. الهيدر العلوي */}
      <InvoiceHeader
        invoiceId={invoice?.saleInvoiceId!}
        createdAt={invoice?.createdAt!}
        paymentStatus={invoice?.paymentStatus!}
        saleType={invoice?.saleType!}
        totalAmount={invoice?.totalAmount!}
        subTotal={invoice?.subtotal!}
        discount={invoice?.discount!}
        isFive={invoice?.paymentStatus == "PARTIAL" ? true : false}
      />

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
            <InvoiceSaleTable data={invoice?.items!} />
          </Paper>

          {/* جدول المرتجعات */}
          {returnInvoices &&
            returnInvoices.length > 0 &&
            returnInvoices.map((singleReturnInvoice: ReturnInvoiceBySale) => (
              <ReturnTableWithHeader
                key={singleReturnInvoice.returnInvoiceId}
                returnInvoice={singleReturnInvoice}
              />
            ))}
        </Grid>
      </Grid>

      {/* 2. شريط انشاء الفاتورة السفلي */}
      <CreatReturnInvoice
        items={invoice?.items ?? []}
        saleInvoiceDiscount={parseFloat(invoice?.discount!)}
      />
    </Box>
  );
};

export default SaleInvoiceDetails;
