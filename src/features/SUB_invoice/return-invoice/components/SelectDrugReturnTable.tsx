import { Box } from "@mui/material";
import type { SaleInvoiceItem } from "../../Types/saleInvoiceDetailsTypes";
import CreateReturnInvoiceRow from "./CreateReturnInvoiceRow";
import CreateReturnInvoiceHeder from "./CreateReturnInvoiceHeder";

interface Props {
  items: (SaleInvoiceItem & {
    checked: boolean;
    selectedQuantity: number;
  })[];
  onToggleCheck: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onSelectBatch: (itemId: number, batchId: number) => void; // 1. أضفناها هنا في الـ Props
  saleInvoiceDiscount?: number;
}

const SelectDrugReturnTable = ({
  items,
  onToggleCheck,
  onUpdateQuantity,
  onSelectBatch, // 2. استقبلناها كمقدار
  saleInvoiceDiscount,
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
          key={item.saleInvoiceItemId}
          item={item}
          onToggleCheck={onToggleCheck}
          onUpdateQuantity={onUpdateQuantity}
          onSelectBatch={onSelectBatch} // 3. مررناها حصرياً لـ CreateReturnInvoiceRow
        />
      ))}
    </Box>
  );
};

export default SelectDrugReturnTable;
