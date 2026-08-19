export default function getOrderStatusLabel(status: string): string {
  switch (status) {
    case "PENDING":
      return "قيد الانتظار";
    case "PARTIALLY_FULFILLED":
      return "جزئي الجاهزية";
    case "READY_FOR_PICKUP":
      return "جاهز للاستلام";
    case "COMPLETED":
      return "مكتمل";
    case "CANCELLED":
      return "ملغى";
    default:
      return status;
  }
}


export const getAtLabel = {
  requestedAt: "تم الطلب ",
  cancelledAt: "تم الإلغاء ",
  completedAt: "تم الانتهاء ",
};