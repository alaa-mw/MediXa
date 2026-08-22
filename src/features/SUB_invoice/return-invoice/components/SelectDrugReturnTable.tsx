import { Box } from "@mui/material";
import CreateReturnInvoiceRow from "./CreateReturnInvoiceRow";
import CreateReturnInvoiceHeder from "./CreateReturnInvoiceHeder";
import type { ReturnInvoiceItem } from "../CreatReturnInvoicePage";

interface Props {
  items: ReturnInvoiceItem[];
  onToggleCheck: (rowId: string) => void;
  onUpdateQuantity: (rowId: string, delta: number) => void;
  saleInvoiceDiscount?: number;
}

const SelectDrugReturnTable = ({
  items,
  onToggleCheck,
  onUpdateQuantity,
}: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CreateReturnInvoiceHeder />

      {items.map((item) => (
        <CreateReturnInvoiceRow
          key={item.rowId}
          item={item}
          onToggleCheck={onToggleCheck}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </Box>
  );
};

export default SelectDrugReturnTable;
