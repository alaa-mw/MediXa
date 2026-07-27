import React from "react";
import type { ReturnInvoiceBySale } from "../return-invoice/Types/returnInvoiceList";
import ReturnInvoiceTableHeader from "./ReturnInvoiceTableHeader";
import ReturnInvoiceTableRow from "./ReturnInvoiceTableRow";
import { Box } from "@mui/material";

interface ReturnsProps {
  returns: ReturnInvoiceBySale[];
}

const InvoiceReturnsTable: React.FC<ReturnsProps> = ({ returns }) => {
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ReturnInvoiceTableHeader />

      {returns.map((returnInvoice) =>
        returnInvoice.items.map((subItem, index) => (
          <ReturnInvoiceTableRow
            key={`${returnInvoice.returnInvoiceId}-${index}`}
            item={subItem}
            itemIndex={index}
            discount={parseInt(returnInvoice.referenceSaleInvoice?.discount!)} // Assuming discount is a string, convert it to number
          />
        )),
      )}
    </Box>
  );
};

export default InvoiceReturnsTable;
