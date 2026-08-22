import InvoiceHeader from "./components/InvoiceHeader";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import InvoiceSaleTable from "./components/InvoiceTableItem";
import ReturnTableWithHeader from "./components/ReturnTableWithHeader";
import CreatReturnInvoice from "./components/InvoiceSummaryBar";
import useSaleInvoiceDetails from "./hooks/useSaleInvoiceDetails";
import useReturnInvoicesBySale from "./return-invoice/hooks/useAllReturnInvoice";
import type { ReturnInvoiceBySale } from "./return-invoice/Types/returnInvoiceList";
import { useParams } from "react-router-dom";

const SalesInvoiceDetailsSkeleton = () => {
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={{ xs: "column-reverse", lg: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", lg: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flexWrap: "wrap", gap: 1.5 }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width={140}
              height={68}
              sx={{ borderRadius: "12px" }}
            />
          ))}
        </Stack>

        <Box
          sx={{ textAlign: "right", alignSelf: { xs: "flex-end", lg: "auto" } }}
        >
          <Skeleton
            variant="text"
            animation="wave"
            width={250}
            height={60}
            sx={{ ml: "auto" }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={210}
            height={28}
            sx={{ ml: "auto" }}
          />
        </Box>
      </Stack>

      <Box sx={{ width: "100%", minWidth: 0, mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            width: "100%",
            minWidth: 0,
            overflow: "hidden",
            mb: 4,
            p: 2,
          }}
        >
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between" }}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  animation="wave"
                  width={90}
                  height={24}
                />
              ))}
            </Stack>

            {Array.from({ length: 2 }).map((_, rowIndex) => (
              <Stack
                key={rowIndex}
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between", py: 0.75 }}
              >
                {Array.from({ length: 8 }).map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    variant="text"
                    animation="wave"
                    width={90}
                    height={30}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            width: "100%",
            mb: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 3, py: 1.5, bgcolor: "#fae6e6" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={220}
                height={30}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={140}
                height={30}
              />
            </Stack>
          </Box>

          <Box sx={{ p: 2 }}>
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between" }}
              >
                {Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="text"
                    animation="wave"
                    width={95}
                    height={24}
                  />
                ))}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "space-between", py: 0.5 }}
              >
                {Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="text"
                    animation="wave"
                    width={95}
                    height={28}
                  />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Skeleton
        variant="rounded"
        animation="wave"
        width={160}
        height={44}
        sx={{
          position: "fixed",
          bottom: "24px",
          left: "34px",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
};

const SaleInvoiceDetails = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const parsedId = invoiceId ? parseInt(invoiceId) : 1;

  const {
    data: response,
    isLoading: isSaleLoading,
    error,
  } = useSaleInvoiceDetails(parsedId);

  const { returnInvoices, isLoading: isReturnsLoading } =
    useReturnInvoicesBySale(parsedId);

  if (isSaleLoading || isReturnsLoading) return <SalesInvoiceDetailsSkeleton />;
  if (error)
    return <Typography color="error">حدث خطأ أثناء تحميل الفاتورة</Typography>;

  const invoice = response?.data;
  const patient = invoice?.pharmacyInvoice?.patient;

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
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
        patient={patient}
        isReturnInvoice={false}
      />

      {/* 3. تفاصيل محتوى الفاتورة والمرتجع */}
      <Box sx={{ width: "100%", minWidth: 0, mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            width: "100%",
            minWidth: 0,
            overflow: "hidden",
            mb: 4,
          }}
        >
          <InvoiceSaleTable data={invoice?.items!} isReturnInvoice={false} />
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
      </Box>

      {/* 2. شريط انشاء الفاتورة السفلي */}
      <CreatReturnInvoice
        items={invoice?.items ?? []}
        saleInvoiceDiscount={parseFloat(invoice?.discount!)}
      />
    </Box>
  );
};

export default SaleInvoiceDetails;
