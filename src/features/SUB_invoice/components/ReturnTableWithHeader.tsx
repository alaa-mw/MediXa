import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns/format";
import InvoiceReturnsTable from "./InvoicReturnsTable";
import type { ReturnInvoiceBySale } from "../return-invoice/Types/returnInvoiceList";

interface Props {
  returnInvoice: ReturnInvoiceBySale;
}

const ReturnTableWithHeader = ({ returnInvoice }: Props) => {
  return (
    <Paper
      key={returnInvoice.returnInvoiceId}
      elevation={0}
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        width: "100%",
        mb: 3,
        overflow: "hidden",
      }}
    >
      {/* الهيدر العلوي لجدول المرتجع */}
      <Box
        sx={{
          width: "100%",
          px: 3,
          py: 1,
          bgcolor: "#fae6e6",
          color: "error.contrastText",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            فاتورة مرتجعة رقم {returnInvoice.returnInvoiceId} :
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyItems: "start",
              alignItems: "start",
              direction: "ltr",
              opacity: 0.8,
              fontSize: 13,
              fontWeight: 400,
              mt: 0.5,
            }}
          >
            {format(
              new Date(returnInvoice.pharmacyInvoice.invoiceDate),
              "dd MMM yyyy, hh:mm a",
            )}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 15 }}>
          العائد : {returnInvoice.subtotalRefund} ل.س
        </Typography>
      </Box>
      <InvoiceReturnsTable returns={[returnInvoice]} />
    </Paper>
  );
};

export default ReturnTableWithHeader;
