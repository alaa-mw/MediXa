import { Box } from "@mui/material";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";

interface Props {
  data: SaleInvoiceItem[];
  // isLoading: boolean;
  // refetch: () => void;
  // onShowDetails: (pharmacy: Pharmacy) => void;
}

const InvoiceSaleTable = ({ data }: Props) => {
  console.log("InvoiceSaleTable data:", data); // Debugging line to check the data being passed
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <InvoiceTableHeader />

      {/* {isLoading ? (
        <LoadingState />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : ( */}
      {data.map((pharmacy, index) => (
        <InvoiceTableRow item={pharmacy} itemIndex={index} />
      ))}
    </Box>
  );
};

export default InvoiceSaleTable;
