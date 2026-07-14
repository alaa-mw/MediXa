import React from "react";
import type { ReturnInvoice } from "../Types/saleInvoiceDetailsTypes";
import ReturnInvoiceTableHeader from "./ReturnInvoiceTableHeader";
import ReturnInvoiceTableRow from "./ReturnInvoiceTableRow";
import { Box } from "@mui/material";

interface ReturnsProps {
  returns: ReturnInvoice[];
}

const InvoiceReturnsTable: React.FC<ReturnsProps> = ({ returns }) => {
  console.log("returns", returns);
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <ReturnInvoiceTableHeader />

      {/* {isLoading ? (
        <LoadingState />
      ) : data.length === 0 ? (
        <EmptyState />
      ) : ( */}
      {returns.map((returnInvoice) =>
        returnInvoice.items.map((subItem, index) => (
          <ReturnInvoiceTableRow
            key={`${returnInvoice.returnInvoiceId}-${index}`}
            item={subItem}
            itemIndex={index}
          />
        )),
      )}
    </Box>
  );
};

export default InvoiceReturnsTable;
