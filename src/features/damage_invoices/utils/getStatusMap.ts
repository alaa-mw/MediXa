export const getStatusMap = (
  status: string,
): {
  label: string;
  color: "warning" | "success" | "error" | "info" | "default";
} => {
  switch (status) {
    case "POSTED":
      return {
        label: "مكتملة",
        color: "success",
      };
    case "DRAFT":
      return {
        label: "مسودة",
        color: "info",
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