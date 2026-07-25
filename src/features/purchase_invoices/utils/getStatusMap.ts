export const getPaymentStatusMap = (
  status: string,
): {
  label: string;
  color: "warning" | "success" | "error" | "info" | "default";
} => {
  switch (status) {
    // Payment Statuses
    case "PENDING":
      return {
        label: "قيد الانتظار",
        color: "warning",
      };
    case "PAID":
      return {
        label: "مدفوع",
        color: "success",
      };
    case "PARTIAL":
      return {
        label: "جزئي",
        color: "info",
      };
    case "EXPIRED":
      return {
        label: "منتهي",
        color: "error",
      };
    default:
      return {
        label: status,
        color: "default",
      };
  }
};

export const getInvoiceStatusMap = (
  status: string,
): {
  label: string;
  color: "warning" | "success" | "error" | "info" | "default";
} => {
  switch (status) {
    case "PENDING":
      return {
        label: "قيد الانتظار",
        color: "warning",
      };
    case "PARTIALLY_STOCKED":
      return {
        label: "جزئي",
        color: "info",
      };
    case "STOCKED":
      return {
        label: "مخزنة",
        color: "success",
      };
    case "CANCELLED":
      return {
        label: "ملغاة",
        color: "error",
      };
    default:
      return {
        label: status,
        color: "default",
      };
  }
};