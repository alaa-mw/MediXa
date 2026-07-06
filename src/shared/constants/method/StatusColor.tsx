const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACTIVE":
    case "نشط":
      return {
        bgcolor: "#E6F4EA",
        color: "#137333",
      };

    case "PENDING":
    case "قيد الانتظار":
      return {
        bgcolor: "#FEF7E0",
        color: "#B06000",
      };

    case "SUSPENDED":
    case "معلق":
      return {
        bgcolor: "#FEF3F2",
        color: "#B42318",
      };

    case "REJECTED":
    case "مرفوض":
      return {
        bgcolor: "#FCE8E6",
        color: "#C5221F",
      };

    default:
      // حالة احتياطية إذا جاءت قيمة غير متوقعة من السيرفر
      return {
        bgcolor: "#F1F5F9",
        color: "#475569",
      };
  }
};

export default getStatusStyles;
