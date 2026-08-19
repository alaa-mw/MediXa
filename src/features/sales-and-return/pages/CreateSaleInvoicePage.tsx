

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { DrugSearchArea } from "../components/create/DrugSearchArea";
import { AddedDrugsList } from "../components/create/AddedDrugsList";
import { InvoiceSummary } from "../components/create/InvoiceSummary";
import { useSaleInvoice } from "../hooks/useSaleInvoice";
import { CustomerRequestsDialog } from "../components/create/CustomerRequestsDialog";

export const CreateSaleInvoicePage = () => {
  const {
    selectors: { isCustomerRequest },
  } = useSaleInvoice();

  const [openRequestsDialog, setOpenRequestsDialog] = useState(false);

  return (
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
        {/* الهيدر العلوي: العنوان وزر فتح الطلبات */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 0.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E293B" }}>
            {isCustomerRequest ? "فاتورة طلب زبون" : "إنشاء فاتورة مبيعات"}
          </Typography>

          {/* زر فتح النافذة مباشرة */}
  <Button
    variant="text"
    onClick={() => setOpenRequestsDialog(true)}
    sx={{
      bgcolor: "primary.main",
      color: "#EEF2FF",
      fontWeight: 700,
      fontSize: "0.875rem",
      borderRadius: "10px",
      px: 2,
      py: 0.8,
      boxShadow: "none",
      textTransform: "none",
      
    }}
  >
   طلبات الزبائن
  </Button>
        </Box>

        {!isCustomerRequest && <DrugSearchArea />}

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

      {/* نافذة عرض طلبات الزبائن */}
      <CustomerRequestsDialog
        open={openRequestsDialog}
        onClose={() => setOpenRequestsDialog(false)}
        
      />
    </Box>
  );
};

export default CreateSaleInvoicePage;