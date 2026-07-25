import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import InvoiceStatsCards from "./InvoiceStateCard";

interface InvoiceHeaderProps {
  invoiceId: number;
  createdAt: string;
  paymentStatus: string;
  saleType: string;
  totalAmount: string;
  subTotal: string;
  discount: string;
  isFive: boolean;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoiceId,
  createdAt,
  paymentStatus,
  saleType,
  totalAmount,
  subTotal,
  discount,
  isFive,
}) => {
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy, hh:mm a");

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        direction: "rtl",
      }}
    >
      {/* قسم العنوان والتاريخ */}
      <Box sx={{ textAlign: "right" }}>
        {/* تم تعديل الخطأ المطبعي هنا من irection إلى direction */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#0F172A" }}
          >
            فاتورة بيع رقم {invoiceId}
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: "0.9rem" }}>
          Created on {formattedDate}
        </Typography>
      </Box>

      {/* قسم الكروت */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", gap: 1.5 }}
      >
        <InvoiceStatsCards
          invoiceId={invoiceId}
          paymentStatus={paymentStatus}
          saleType={saleType}
          totalAmount={totalAmount}
          subTotal={subTotal}
          discount={discount}
          isFive={isFive}
        />
      </Stack>
    </Stack>
  );
};

export default InvoiceHeader;
