import React from "react";
import { Box, Typography } from "@mui/material";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";
import BatchAllocationButton from "./BatchAllocationButton";

interface ItemProps {
  item: SaleInvoiceItem;
  itemIndex: number; // إضافة هذا السطر لتحديد itemIndex كخيار
}

const InvoiceTableRow: React.FC<ItemProps> = ({ item, itemIndex }) => {
  // جلب اسم الدواء مع قيمة احتياطية في حال لم يتوفر الاسم العام
  const drugName =
    item.pharmacyDrug?.drug?.generalDrug?.tradeName || "دواء غير معروف";
  const drugBarcode =
    item.pharmacyDrug?.drug?.generalDrug?.barcode || "دواء غير معروف";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 2fr 2fr 2fr 2fr 2fr 3fr 3fr",
        p: 1.2,
        borderBottom: "1px solid #F1F5F9",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* اسم الدواء */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {itemIndex + 1}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          fontWeight: 400,
          fontSize: 14,
          pl: 5,
        }}
      >
        {drugBarcode}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {drugName}
      </Box>

      {/* نوع الوحدة */}
      <Box sx={{ textAlign: "center", color: "#64748B", fontSize: 13 }}>
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.5,
            borderRadius: "4px",
            backgroundColor: "#ebebeb",
            color: "primary.main",
          }}
        >
          {item.unitType}
        </Box>
      </Box>

      {/* الكمية */}
      <Box sx={{ textAlign: "center", fontWeight: 600 }}>
        {item.displayQuantity}
      </Box>

      {/* سعر المفرد */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 15, fontWeight: "500", color: "text.primary" }}
        >
          {item.finalUnitPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", color: "#334155" }}>
        {item.extraPercentage}%
      </Box>

      {/* السعر الإجمالي للمادة */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 15, fontWeight: "500", color: "text.primary" }}
        >
          {item.totalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", fontWeight: 700, color: "#0F172A" }}>
        <BatchAllocationButton item={item} />
      </Box>
    </Box>
  );
};

export default InvoiceTableRow;
