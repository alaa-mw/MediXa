import { Grid } from "@mui/material";
import DetailsHeader from "./details/DetailsHeader";
import SupplierInfo from "./details/SupplierInfo";
import InvoiceSummary from "./details/InvoiceSummary";
import { useParams } from "react-router-dom";
import useGetData from "../../../shared/hooks/useGetData";
// import type { PurchaseInvoiceDetails } from "../types/purchaseInvoice";
import type {
  PurchaseInvoiceDetails as PurchaseInvoiceDetailsDto,
} from "../types/purchaseInvoice";
import PurchaseInvoiceItems from "./details/PurchaseInvoiceItems";

const PurchaseInvoiceDetails = () => {
  const { invoiceId } = useParams();
  // const { data } = useGetData<PurchaseInvoiceDetails>(
  const { data } = useGetData<PurchaseInvoiceDetailsDto>(
    `/supplier-invoice/${invoiceId}`,
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        {data?.data && <DetailsHeader detailData={data.data} />}
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <PurchaseInvoiceItems items={data?.data.items || []} />
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        {data?.data && (
          <>
            <SupplierInfo supplier={data.data.supplier} />
            <InvoiceSummary detailData={data.data} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default PurchaseInvoiceDetails;
