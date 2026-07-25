// features/saleInvoice/hooks/useSaleInvoice.ts

import { useContext } from "react";
import { SaleInvoiceContext } from "../context/SaleInvoiceContext";

export const useSaleInvoice = () => {
  const context = useContext(SaleInvoiceContext);
  if (!context) {
    throw new Error("useSaleInvoice must be used within a SaleInvoiceProvider");
  }
  return context;
};