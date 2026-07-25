// import { Box } from "@mui/material";

// import { DrugSearchArea } from "../components/create/DrugSearchArea";
// import { AddedDrugsList } from "../components/create/AddedDrugsList";
// import { InvoiceSummary } from "../components/create/InvoiceSummary";

// // 1. استيراد الـ Provider (تأكد من صحة المسار بالنسبة لملفك)
// import { SaleInvoiceProvider } from "../context/SaleInvoiceContext"; 

// export const CreateSaleInvoicePage = () => {
//   return (
//     // 2. تغليف الصفحة بالـ Provider
//     <SaleInvoiceProvider>
//       <Box sx={{ display: "flex", height: "100%", gap: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             overflow: "hidden",
//           }}
//         >
//           <DrugSearchArea />

//           <Box sx={{ flex: 1, overflowY: "auto" }}>
//             <AddedDrugsList />
//           </Box>
//         </Box>

//         <Box sx={{ width: "350px", flexShrink: 0 }}>
//           <InvoiceSummary />
//         </Box>
//       </Box>
//     </SaleInvoiceProvider>
//   );
// };

// export default CreateSaleInvoicePage;

import { Box } from "@mui/material";

import { DrugSearchArea } from "../components/create/DrugSearchArea";
import { AddedDrugsList } from "../components/create/AddedDrugsList";
import { InvoiceSummary } from "../components/create/InvoiceSummary";
import { SaleInvoiceProvider } from "../context/SaleInvoiceContext"; 

export const CreateSaleInvoicePage = () => {
  return (
    <SaleInvoiceProvider>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", lg: "row" }, 
          height: "100%", 
          gap: 2, 
          overflow: { xs: "auto", lg: "hidden" } 
        }}
      >
        {/* قسم البحث وجدول الأدوية */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: { xs: "visible", lg: "hidden" },
            minWidth: 0 
          }}
        >
          <DrugSearchArea />

          <Box sx={{ flex: 1, overflowY: { xs: "visible", lg: "auto" } }}>
            <AddedDrugsList />
          </Box>
        </Box>

        {/* قسم ملخص الفاتورة */}
        <Box 
          sx={{ 
            width: { xs: "100%", lg: "350px" }, 
            flexShrink: 0,
            height: { xs: "auto", lg: "100%" }
          }}
        >
          <InvoiceSummary />
        </Box>
      </Box>
    </SaleInvoiceProvider>
  );
};

export default CreateSaleInvoicePage;