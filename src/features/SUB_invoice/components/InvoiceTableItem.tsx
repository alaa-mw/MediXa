import { Box } from "@mui/material";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";
import type { ReturnInvoiceItem } from "../return-invoice/Types/returnInvoiceDetailsType";

interface Props {
  data?: SaleInvoiceItem[];
  returnInvoiceData?: ReturnInvoiceItem[];
  isReturnInvoice: boolean;
}

const InvoiceSaleTable = ({
  data,
  returnInvoiceData,
  isReturnInvoice,
}: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: "1200px", // لضمان عدم تداخل الأعمدة بشكل سيء على الشاشات الصغيرة مع إمكانية التمرير الأفقي السلس
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflowX: "auto",
        boxSizing: "border-box",
      }}
    >
      <InvoiceTableHeader isReturn={isReturnInvoice} />

      {isReturnInvoice
        ? returnInvoiceData?.map((pharmacy, index) => (
            <InvoiceTableRow
              key={pharmacy.returnInvoiceItemId}
              returnItem={pharmacy}
              itemIndex={index}
              isReturnInvoice={true}
            />
          ))
        : data?.map((pharmacy, index) => (
            <InvoiceTableRow
              key={pharmacy.saleInvoiceItemId}
              saleItem={pharmacy}
              itemIndex={index}
              isReturnInvoice={false}
            />
          ))}
    </Box>
  );
};

export default InvoiceSaleTable;
