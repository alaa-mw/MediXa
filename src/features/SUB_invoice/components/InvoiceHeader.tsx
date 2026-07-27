import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import InvoiceStatsCards from "./InvoiceStateCard";
import type { Patient } from "../Types/saleInvoiceDetailsTypes";

interface InvoiceHeaderProps {
  invoiceId: number;
  createdAt: string;
  paymentStatus: string;
  saleType: string;
  totalAmount: string;
  subTotal: string;
  discount: string;
  isFive: boolean;
  returnreason? : string;
  patient?: Patient | null;
  isReturnInvoice: boolean;
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
  patient,
  returnreason,
  isReturnInvoice,
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
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#0F172A" }}
          >
            {isReturnInvoice ? " فاتورة مرتجع رقم" : "فاتورة بيع رقم"}{" "}
            {invoiceId}
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
          patient={patient}
          returnreason={returnreason}
          isReturnInvoice={isReturnInvoice}
        />
      </Stack>
    </Stack>
  );
};

export default InvoiceHeader;
