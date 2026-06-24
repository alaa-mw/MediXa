import { Grid } from "@mui/material";
import DetailsHeader from "./DetailsHeader";
import SupplierInfo from "./SupplierInfo";
import InvoiceSummary from "./InvoiceSummary";
import InvoiceItems from "./PurchaseInvoiceItems";
import { detailData } from "../detailData";

const PurchaseInvoiceDetails = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid size={{ xs: 12 }}>
        <DetailsHeader />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
       <InvoiceItems items={detailData.data.items} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <SupplierInfo />
        <InvoiceSummary />
      </Grid>
    </Grid>
  );
};

export default PurchaseInvoiceDetails;
