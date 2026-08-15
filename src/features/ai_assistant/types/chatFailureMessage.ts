const getFailureMessage = (code: string): string => {
  switch (code) {
    case "RAG_SERVICE_TIMEOUT":
      return "انتهت مهلة الاتصال بخدمة الذكاء الاصطناعي، يجدر بك المحاولة لاحقاً.";
    case "RAG_SERVICE_UNAVAILABLE":
      return "خدمة الذكاء الاصطناعي غير متاحة حالياً، يرجى المحاولة بعد قليل.";
    case "RAG_SERVICE_UNAUTHORIZED":
      return "فشل التحقق من الهوية والصلاحيات للخدمة.";
    case "RAG_SERVICE_BAD_REQUEST":
      return "طلب غير صالح تم إرساله إلى خدمة المعالجة.";
    case "INVALID_RAG_RESPONSE":
      return "استلام بيانات غير صالحة أو غير متوقعة من خدمة الذكاء الاصطناعي.";
    case "RAG_PROCESSING_FAILED":
      return "حدث خطأ أثناء معالجة الطلب داخل نظام الذكاء الاصطناعي.";
    case "QUEUE_PUBLISH_FAILED":
      return "فشل إرسال الطلب إلى قائمة الانتظار، يرجى إعادة المحاولة.";
    default:
      return "حدث خطأ غير معروف أثناء معالجة الطلب.";
  }
};

export default getFailureMessage;
