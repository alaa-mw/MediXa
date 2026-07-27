import useGetWithParams from "../../../../shared/hooks/useGetWithParams";
import type { ReturnInvoiceBySale } from "../Types/returnInvoiceList";

export const useReturnInvoicesBySale = (saleInvoiceId: number) => {
  const endpoint = `/return-invoice/by-sale/${saleInvoiceId}`;

  const { data, isLoading, isError, error, refetch } = useGetWithParams<
    ReturnInvoiceBySale[]
  >(
    endpoint,
    {}, // إذا لم تكن بحاجة لبارامترات إضافية مثل page/limit مبدئياً
    {
      shouldFetch: () => !!saleInvoiceId, // للتأكد من عدم الجلب إلا إذا وجد رقم الفاتورة
    },
  );

  return {
    returnInvoices: data?.data, // مصفوفة فواتير المرتجع جاهزة للاستخدام
    meta: data?.meta, // معلومات الـ Pagination إن وجدت
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useReturnInvoicesBySale;
