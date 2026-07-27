import React from "react";
import { Box, Typography } from "@mui/material";
import type { SaleInvoiceItem } from "../Types/saleInvoiceDetailsTypes";
import BatchAllocationButton from "./BatchAllocationButton";
import type { ReturnInvoiceItem } from "../return-invoice/Types/returnInvoiceDetailsType";
import { format, isValid } from "date-fns";
import { CheckIcon } from "lucide-react";

interface ItemProps {
  saleItem?: SaleInvoiceItem;
  returnItem?: ReturnInvoiceItem;
  isReturnInvoice: boolean;
  itemIndex: number;
}

const InvoiceTableRow: React.FC<ItemProps> = ({
  saleItem,
  returnItem,
  isReturnInvoice,
  itemIndex,
}) => {
  const drugName =
    saleItem?.pharmacyDrug?.drug?.generalDrug?.tradeName || "دواء غير معروف";
  const drugBarcode =
    saleItem?.pharmacyDrug?.drug?.generalDrug?.barcode || "دواء غير معروف";

  const getFormattedDate = () => {
    if (!returnItem?.batch?.receivedDate) return "-";
    const date = new Date(returnItem.batch.receivedDate);
    return isValid(date) ? format(date, "yyyy / MM / dd") : "/";
  };

  const formattedLong = getFormattedDate();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 3fr 2fr 2fr 2fr 2fr 3fr 3fr",
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
        {isReturnInvoice ? returnItem?.drug?.barcode : drugBarcode}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-start", fontWeight: 500 }}
      >
        {isReturnInvoice ? returnItem?.drug?.tradeName : drugName}
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
          {isReturnInvoice ? returnItem?.unitType : saleItem?.unitType}
        </Box>
      </Box>

      {/* الكمية */}
      <Box sx={{ textAlign: "center", fontWeight: 600 }}>
        {isReturnInvoice
          ? returnItem?.displayQuantity
          : saleItem?.displayQuantity}
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
          {isReturnInvoice ? returnItem?.unitPrice : saleItem?.finalUnitPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>
      {/*restock*/}
      <Box sx={{ textAlign: "center", color: "#334155" }}>
        {isReturnInvoice ? (
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
                bgcolor: returnItem?.restockToInventory ? "#E6F4EA" : "#F1F5F9",
                border: `2px solid ${returnItem?.restockToInventory ? "#34A853" : "#CBD5E1"}`,
                transition: "all 0.3s ease",
              }}
            >
              <CheckIcon
                size={15}
                color={returnItem?.restockToInventory ? "#34A853" : "#94A3B8"}
              />
            </Box>
          </Box>
        ) : (
          saleItem?.extraPercentage
        )}
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
          {isReturnInvoice ? returnItem?.totalPrice : saleItem?.totalPrice}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontWeight: "400", color: "text.secondary" }}
        >
          ل.س
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", fontWeight: 700, color: "#0F172A" }}>
        {!isReturnInvoice ? (
          <BatchAllocationButton
            invoiceId={saleItem?.saleInvoiceId!}
            saleInvoiceItemId={saleItem?.saleInvoiceItemId!}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              variant="body2"
              sx={{ fontSize: 13, fontWeight: "600", color: "primary.main" }}
            >
              دفعة رقم: {returnItem?.batch?.batchId}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: 11, color: "text.secondary" }}
            >
              الصلاحية: {formattedLong}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InvoiceTableRow;
