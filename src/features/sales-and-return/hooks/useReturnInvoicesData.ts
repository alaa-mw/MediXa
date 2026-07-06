import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../shared/hooks/useDebounce"; 
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";
import type { ReturnInvoiceApiResponse, ReturnInvoiceData, ReturnInvoiceFilters } from "../types/returnInvoice";

export const useReturnInvoicesData = (defaultLimit = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. القراءة الحية لجميع معاملات الفلترة والروابط من الـ URL
  const urlParams = useMemo<ReturnInvoiceFilters>(() => {
    return {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || String(defaultLimit),
      invoiceStatus: (searchParams.get("invoiceStatus") as any) || "ALL",
      search: searchParams.get("search") || "",
      saleInvoiceId: searchParams.get("saleInvoiceId") || "",
      pharmacyInvoiceId: searchParams.get("pharmacyInvoiceId") || "",
      pharmacyDrugId: searchParams.get("pharmacyDrugId") || "",
      batchId: searchParams.get("batchId") || "",
      saleInvoiceItemBatchId: searchParams.get("saleInvoiceItemBatchId") || "",
      unitType: searchParams.get("unitType") || "",
      returnReason: searchParams.get("returnReason") || "",
      restockToInventory: searchParams.get("restockToInventory") || "",
      fromDate: searchParams.get("fromDate") || "",
      toDate: searchParams.get("toDate") || "",
      minRefund: searchParams.get("minRefund") || "",
      maxRefund: searchParams.get("maxRefund") || "",
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };
  }, [searchParams, defaultLimit]);

  // 2. الـ State الخاص بالبحث المدعوم بالـ Debounce لمنع تكرار الطلبات
  const [searchInput, setSearchInput] = useState<string>(urlParams.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchInput(urlParams.search);
  }, [urlParams.search]);

  // 3. دالة تنظيف وتحديث الـ URL وحذف المعاملات الفارغة تماماً لقيمة رابط مثالية
  const updateUrlParams = useCallback((newParams: Partial<Record<keyof ReturnInvoiceFilters, string | undefined | null>>) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value === "" || 
          value === null || 
          value === undefined || 
          value === "ALL"
        ) {
          nextParams.delete(key);
        } else {
          nextParams.set(key, value);
        }
      });

      const isPaginationCommand = "page" in newParams || "limit" in newParams;
      if (!isPaginationCommand) {
        if (Array.from(nextParams.keys()).length > 0) {
          nextParams.set("page", "1");
        }
      }

      return nextParams;
    });
  }, [setSearchParams]);

  // مزامنة البحث الدلالي
  useEffect(() => {
    const currentSearchInUrl = urlParams.search.trim();
    const currentDebouncedSearch = debouncedSearch.trim();

    if (currentDebouncedSearch !== currentSearchInUrl) {
      updateUrlParams({ search: currentDebouncedSearch });
    }
  }, [debouncedSearch, urlParams.search, updateUrlParams]);

  // 4. بناء الكائن النظيف الموجه تماماً للباك-إند متضمناً معالجة الـ Numbers والـ Booleans
  const cleanBackendParams = useMemo(() => {
    const params: Record<string, any> = {
      page: Number(urlParams.page) || 1,
      limit: Number(urlParams.limit) || defaultLimit,
    };

    if (urlParams.invoiceStatus !== "ALL") {
      params.status = urlParams.invoiceStatus; // خرائط الحقول حسب صياغة الباك إند
    }

    if (urlParams.search.trim()) params.search = urlParams.search.trim();
    if (urlParams.unitType) params.unitType = urlParams.unitType;
    if (urlParams.returnReason) params.returnReason = urlParams.returnReason;
    if (urlParams.fromDate) params.fromDate = urlParams.fromDate;
    if (urlParams.toDate) params.toDate = urlParams.toDate;

    if (urlParams.restockToInventory !== "") {
      params.restockToInventory = urlParams.restockToInventory === "true";
    }
    
    // تحويل الـ IDs والمبالغ إلى أرقام صريحة عند إرسالها للباك إند
    if (urlParams.saleInvoiceId) params.saleInvoiceId = Number(urlParams.saleInvoiceId);
    if (urlParams.pharmacyInvoiceId) params.pharmacyInvoiceId = Number(urlParams.pharmacyInvoiceId);
    if (urlParams.pharmacyDrugId) params.pharmacyDrugId = Number(urlParams.pharmacyDrugId);
    if (urlParams.batchId) params.batchId = Number(urlParams.batchId);
    if (urlParams.saleInvoiceItemBatchId) params.saleInvoiceItemBatchId = Number(urlParams.saleInvoiceItemBatchId);
    if (urlParams.minRefund) params.minRefund = Number(urlParams.minRefund);
    if (urlParams.maxRefund) params.maxRefund = Number(urlParams.maxRefund);
    
    if (urlParams.sortBy) params.sortBy = urlParams.sortBy;
    if (urlParams.sortOrder) params.sortOrder = urlParams.sortOrder;

    return params;
  }, [urlParams, defaultLimit]);

  // 5. استدعاء الـ API المستقر بدون State داخلي مشتت
  const { data, isLoading, isError, error, refetch } = useGetWithParamsWithoutState(
    "/return-invoice",
    cleanBackendParams
  );

  const apiResponse = data as unknown as ReturnInvoiceApiResponse;
  const returnInvoicesList: ReturnInvoiceData[] = apiResponse?.data || [];
  const totalPages: number = apiResponse?.meta?.totalPages || 1;
  const totalCount: number = apiResponse?.meta?.total || 0;

  // 6. دوال التحكم بالواجهات للمكونات الفرعية والـ UI
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleStatusTabChange = (tabValue: string) => {
    updateUrlParams({ invoiceStatus: tabValue });
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, pageValue: number) => {
    updateUrlParams({ page: String(pageValue) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (limitValue: string) => {
    updateUrlParams({ limit: limitValue });
  };

  const handleAdvancedFiltersApply = (advancedFilters: Partial<Record<keyof ReturnInvoiceFilters, string>>) => {
    // تصفية أية حقول تحوي معرّفات Ids برمجية لمنع دخولها في الـ Dropdowns اليدوية 💡
    const filteredFilters = { ...advancedFilters };
    const idKeys: (keyof ReturnInvoiceFilters)[] = [
      "saleInvoiceId", 
      "pharmacyInvoiceId", 
      "pharmacyDrugId", 
      "batchId", 
      "saleInvoiceItemBatchId"
    ];
    idKeys.forEach(key => delete filteredFilters[key]);

    updateUrlParams(filteredFilters);
  };

  const handleClearAllFilters = () => {
    setSearchParams({});
    setSearchInput("");
  };

  return {
    searchInput,
    activeTab: urlParams.invoiceStatus,
    currentPage: Number(urlParams.page),
    currentLimit: urlParams.limit,
    rawFilters: urlParams,
    returnInvoicesList,
    totalPages,
    totalCount,
    isLoading,
    isError,
    error,
    handleSearch,
    handleStatusTabChange,
    handlePageChange,
    handleLimitChange,
    handleAdvancedFiltersApply,
    handleClearAllFilters,
    refetch,
  };
};