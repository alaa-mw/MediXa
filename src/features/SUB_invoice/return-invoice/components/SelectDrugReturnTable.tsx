// import { Box } from "@mui/material";
// import type { SaleInvoiceItem } from "../../Types/saleInvoiceDetailsTypes";
// import CreateReturnInvoiceRow from "./CreateReturnInvoiceRow";
// import CreateReturnInvoiceHeder from "./CreateReturnInvoiceHeder";

// interface Props {
//   items: (SaleInvoiceItem & {
//     checked: boolean;
//     selectedQuantity: number;
//   })[];
//   onToggleCheck: (id: number) => void;
//   onUpdateQuantity: (id: number, delta: number) => void;
//   onSelectBatch: (itemId: number, batchId: number) => void;
//   saleInvoiceDiscount?: number;
// }

// const SelectDrugReturnTable = ({
//   items,
//   onToggleCheck,
//   onUpdateQuantity,
//   onSelectBatch, 
//   saleInvoiceDiscount,
// }: Props) => {
//   return (
//     <Box
//       sx={{
//         border: "1px solid #E2E8F0",
//         borderRadius: 2,
//         overflow: "hidden",
//       }}
//     >
//       <CreateReturnInvoiceHeder />

//       {items.map((item) => (
//         <CreateReturnInvoiceRow
//           key={item.saleInvoiceItemId}
//           item={item}
//           onToggleCheck={onToggleCheck}
//           onUpdateQuantity={onUpdateQuantity}
//           onSelectBatch={onSelectBatch}
//         />
//       ))}
//     </Box>
//   );
// };

// export default SelectDrugReturnTable;

import { Box } from "@mui/material";
import CreateReturnInvoiceRow from "./CreateReturnInvoiceRow";
import CreateReturnInvoiceHeder from "./CreateReturnInvoiceHeder";
import type { ReturnInvoiceItem } from "../CreatReturnInvoicePage";

interface Props {
  items: ReturnInvoiceItem[];
  onToggleCheck: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onSelectBatch: (itemId: number, batchId: number) => void;
  saleInvoiceDiscount?: number;
}

const SelectDrugReturnTable = ({
  items,
  onToggleCheck,
  onUpdateQuantity,
  onSelectBatch,
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
          onSelectBatch={onSelectBatch}
        />
      ))}
    </Box>
  );
};

export default SelectDrugReturnTable;