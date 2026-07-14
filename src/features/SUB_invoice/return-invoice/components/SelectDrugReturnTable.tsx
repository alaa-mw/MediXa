// import React from "react";
// import ReturnInvoiceTableHeader from "../../components/ReturnInvoiceTableHeader";
// import ReturnInvoiceTableRow from "../../components/ReturnInvoiceTableRow";
// import { Box } from "@mui/material";
// import type { SaleInvoiceItem } from "../../Types/saleInvoiceDetailsTypes";

// interface Props {
//   items: SaleInvoiceItem[];
//   // onToggleCheck: (id: string) => void;
//   // onUpdateQuantity: (id: string, delta: number) => void;
// }

// const SelectDrugReturnTable = ({
//   items,
//   // onToggleCheck,
//   // onUpdateQuantity,
// }: Props) => {
//   return (
//     <Box
//       sx={{
//         border: "1px solid #E2E8F0",
//         borderRadius: 2,
//         overflow: "hidden",
//       }}
//     >
//       <ReturnInvoiceTableHeader />

//       {/* {isLoading ? (
//         <LoadingState />
//       ) : data.length === 0 ? (
//         <EmptyState />
//       ) : ( */}
//       {items.map((returnItems) =>
//         returnItems.items.map((subItem, index) => (
//           <ReturnInvoiceTableRow
//             key={`${returnItems.returnInvoiceId}-${index}`}
//             item={subItem}
//             itemIndex={index}
//           />
//         )),
//       )}
//     </Box>
//   );
// };

// export default SelectDrugReturnTable;
import { Box } from "@mui/material";
import type { SaleInvoiceItem } from "../../Types/saleInvoiceDetailsTypes";
import CreateReturnInvoiceRow from "./CreateReturnInvoiceRow";
import CreateReturnInvoiceHeder from "./CreateReturnInvoiceHeder";

interface Props {
  items: (SaleInvoiceItem & { checked: boolean })[];
  onToggleCheck: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
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
          key={item.saleInvoiceItemId}
          item={item}
          onToggleCheck={onToggleCheck}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </Box>
  );
};

export default SelectDrugReturnTable;
