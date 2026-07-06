

export interface SaleInvoiceFilters {
  page: string;
  limit: string;
  paymentStatus: PaymentStatus | "ALL"; 
  search: string;
  saleInvoiceId: string;
  pharmacyInvoiceId: string;
  patientId: string;
  pharmacyDrugId: string;
  unitType: string;
  saleType: SaleType | "";
  invoiceStatus: InvoiceStatus | "";
  fromDate: string;
  toDate: string;
  minTotal: string;
  maxTotal: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

// src/hooks/useSaleInvoicesData.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks/useDebounce"; 
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";
import type { SaleInvoiceApiResponse, SaleInvoiceData } from "../types/saleInvoice";
import type { InvoiceStatus, PaymentStatus, SaleType } from "../types/enums";

export const useSaleInvoicesData = (defaultLimit = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. القراءة الحية من الـ URL (إذا كان فارغاً، تعود القيم افتراضية ونظيفة)
  const urlParams = useMemo<SaleInvoiceFilters>(() => {
    return {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || String(defaultLimit),
      paymentStatus: (searchParams.get("paymentStatus") as any) || "ALL",
      search: searchParams.get("search") || "",
      saleInvoiceId: searchParams.get("saleInvoiceId") || "",
      pharmacyInvoiceId: searchParams.get("pharmacyInvoiceId") || "",
      patientId: searchParams.get("patientId") || "",
      pharmacyDrugId: searchParams.get("pharmacyDrugId") || "",
      unitType: searchParams.get("unitType") || "",
      saleType: (searchParams.get("saleType") as any) || "",
      invoiceStatus: (searchParams.get("invoiceStatus") as any) || "",
      fromDate: searchParams.get("fromDate") || "",
      toDate: searchParams.get("toDate") || "",
      minTotal: searchParams.get("minTotal") || "",
      maxTotal: searchParams.get("maxTotal") || "",
      sortBy: searchParams.get("sortBy") || "invoiceDate",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };
  }, [searchParams, defaultLimit]);

  // 2. الـ State المحلي الوحيد للبحث السلس
  const [searchInput, setSearchInput] = useState<string>(urlParams.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchInput(urlParams.search);
  }, [urlParams.search]);

  // 3. دالة تنظيف الـ URL وحذف الـ Keys تماماً إذا كانت فارغة أو "ALL" ليبقى الرابط صافياً
  const updateUrlParams = useCallback((newParams: Partial<Record<keyof SaleInvoiceFilters, string | undefined | null>>) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value === "" || 
          value === null || 
          value === undefined || 
          value === "ALL"
        ) {
          nextParams.delete(key); // 💡 تحذف المفتاح تماماً من الـ URL ليبقى صافياً
        } else {
          nextParams.set(key, value);
        }
      });

      // ضبط الترقيم التلقائي
      const isPaginationCommand = "page" in newParams || "limit" in newParams;
      if (!isPaginationCommand) {
        // إذا حُذفت كل الفلاتر، نترك التحكم الافتراضي بالصفحات
        if (Array.from(nextParams.keys()).length > 0) {
          nextParams.set("page", "1");
        }
      }

      return nextParams;
    });
  }, [setSearchParams]);

  // مزامنة البحث
  useEffect(() => {
    const currentSearchInUrl = urlParams.search.trim();
    const currentDebouncedSearch = debouncedSearch.trim();

    if (currentDebouncedSearch !== currentSearchInUrl) {
      updateUrlParams({ search: currentDebouncedSearch });
    }
  }, [debouncedSearch, urlParams.search, updateUrlParams]);

  // 4. بناء كائن الباك-إند النظيف والـ Type-Safe
  const cleanBackendParams = useMemo(() => {
    const params: Record<string, any> = {
      page: Number(urlParams.page) || 1,
      limit: Number(urlParams.limit) || defaultLimit,
    };

    // 💡 تم إلغاء فحص الـ RETURN القديم وتبسيط الشرط
    if (urlParams.paymentStatus !== "ALL") {
      params.paymentStatus = urlParams.paymentStatus;
    }

    // إرسال الحقول فقط إذا كانت تحتوي على قيم فعلية
    if (urlParams.search.trim()) params.search = urlParams.search.trim();
    if (urlParams.unitType) params.unitType = urlParams.unitType;
    if (urlParams.saleType) params.saleType = urlParams.saleType;
    if (urlParams.invoiceStatus) params.invoiceStatus = urlParams.invoiceStatus;
    if (urlParams.fromDate) params.fromDate = urlParams.fromDate;
    if (urlParams.toDate) params.toDate = urlParams.toDate;
    
    if (urlParams.saleInvoiceId) params.saleInvoiceId = Number(urlParams.saleInvoiceId);
    if (urlParams.pharmacyInvoiceId) params.pharmacyInvoiceId = Number(urlParams.pharmacyInvoiceId);
    if (urlParams.patientId) params.patientId = Number(urlParams.patientId);
    if (urlParams.pharmacyDrugId) params.pharmacyDrugId = Number(urlParams.pharmacyDrugId);
    if (urlParams.minTotal) params.minTotal = Number(urlParams.minTotal);
    if (urlParams.maxTotal) params.maxTotal = Number(urlParams.maxTotal);
    
    if (urlParams.sortBy) params.sortBy = urlParams.sortBy;
    if (urlParams.sortOrder) params.sortOrder = urlParams.sortOrder;

    return params;
  }, [urlParams, defaultLimit]);

  // 5. طلب الـ API المستقر
  const { data, isLoading, isError, error, refetch } = useGetWithParamsWithoutState(
    "/sale-invoice",
    cleanBackendParams
  );

  const apiResponse = data as unknown as SaleInvoiceApiResponse;
  const invoicesList: SaleInvoiceData[] = apiResponse?.data || [];
  const totalPages: number = apiResponse?.meta?.totalPages || 1;
  const totalCount: number = apiResponse?.meta?.total || 0;

  // 6. الدوال التنفيذية الممررة للـ UI
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleTabChange = (tabValue: string) => {
    updateUrlParams({ paymentStatus: tabValue });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageValue: number) => {
    updateUrlParams({ page: String(pageValue) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (limitValue: string) => {
    updateUrlParams({ limit: limitValue });
  };

  const handleAdvancedFiltersApply = (advancedFilters: Partial<Record<keyof SaleInvoiceFilters, string>>) => {
    updateUrlParams(advancedFilters);
  };

  // 💡 دالة تصفير كاملة تعيد الرابط لحالته الخام الصافية تماماً
  const handleClearAllFilters = () => {
    setSearchParams({}); // يمسح كل الـ Params من الـ URL دفعة واحدة
    setSearchInput("");
  };

  return {
    searchInput,
    activeTab: urlParams.paymentStatus,
    currentPage: Number(urlParams.page),
    currentLimit: urlParams.limit,
    rawFilters: urlParams,
    invoicesList,
    totalPages,
    totalCount,
    isLoading,
    isError,
    error,
    handleSearch,
    handleTabChange,
    handlePageChange,
    handleLimitChange,
    handleAdvancedFiltersApply,
    handleClearAllFilters,
    refetch,
  };
};