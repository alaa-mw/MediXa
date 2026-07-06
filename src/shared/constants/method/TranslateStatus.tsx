const getStatusArabic = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "نشط";

    case "PENDING":
      return "قيد الانتظار";

    case "SUSPENDED":
      return "معلق";

    case "REJECTED":
      return "مرفوض";

    case "نشط":
      return "ACTIVE";

    case "قيد الانتظار":
      return "PENDING";

    case "معلق":
      return "SUSPENDED";

    case "PAID":
      return "مدفوع";

    case "PARTIAL":
      return "دفع جزئي";

    case "NORMAL":
      return "فاتورة صيدلية";

    case "CUSTOMER_REQUEST":
      return "طلب العميل";

    default:
      // حالة احتياطية إذا جاءت قيمة غير متوقعة من السيرفر
      return "";
  }
};

export default getStatusArabic;
