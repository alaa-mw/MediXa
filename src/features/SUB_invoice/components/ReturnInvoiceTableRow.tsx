import { Box, Typography } from "@mui/material";
import { CheckIcon } from "lucide-react";
import ReturnBatchAllocationButton from "./ReturnBatchAllocationButton";
import type { ReturnInvoiceItem } from "../return-invoice/Types/returnInvoiceList";

interface Props {
  item: ReturnInvoiceItem;
  discount: number;
  itemIndex: number;
}

const ReturnInvoiceTableRow = ({ item, itemIndex, discount }: Props) => {
  // باقي الكود يبقى كما هو دون أي تغيير
  const qty = item.baseQuantity / item.unitFactorToBase;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "0.7fr 2fr 1fr 1fr 2fr 2fr 3fr 1fr 2fr",
        p: 1.2,
        borderBottom: "1px solid #F1F5F9",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* اسم الدواء وباقي العناصر */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {itemIndex + 1}
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {item.pharmacyDrug?.drug?.generalDrug?.tradeName || "دواء غير معروف"}
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
      <Box sx={{ textAlign: "center", fontWeight: 600 }}>{qty}</Box>

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
          {item.unitPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "400", color: "text.primary" }}
        >
          {item.returnReason}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: item.restockToInventory ? "#E6F4EA" : "#F1F5F9",
            border: `2px solid ${item.restockToInventory ? "#34A853" : "#CBD5E1"}`,
            transition: "all 0.3s ease",
          }}
        >
          <CheckIcon
            size={15}
            color={item.restockToInventory ? "#34A853" : "#94A3B8"}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", fontWeight: 700, color: "#0F172A" }}>
        <ReturnBatchAllocationButton item={item.saleInvoiceItemBatch} />
      </Box>
    </Box>
  );
};

export default ReturnInvoiceTableRow;
