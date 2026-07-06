import { alpha, Box, Container, Typography } from "@mui/material";
import type { PurchaseInvoiceDetails } from "../../types/purchaseInvoiceDetails";
import theme from "../../../../shared/styles/mainTheme";

const InvoiceSummary = ({
  detailData,
}: {
  detailData: PurchaseInvoiceDetails;
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: alpha(theme.palette.secondary.main, 1),
        color: "white",
        p: 4,
        borderRadius: 2,
      }}
    >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            رقم الفاتورة
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.invoiceNumber}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            تاريخ الفاتورة{" "}
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.invoiceDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            ملاحظة{" "}
          </Typography>
          <Typography variant="body1" color="inherit">
            {detailData.notes}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default InvoiceSummary;
