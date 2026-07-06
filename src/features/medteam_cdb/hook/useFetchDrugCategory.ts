// features/inventory/hook/useFetchDrugCategory.ts
import { useMemo, useState } from "react";
import type { DrugCategoriesPaginationData } from "../types/drugCategoryType";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";

const PAGE_SIZE = 10;

export const useDrugCategories = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    setQueryParams,
  } = useGetWithParams<DrugCategoriesPaginationData>("/drug-categories", {
    page: 1,
    limit: PAGE_SIZE,
    search: "",
  });

  const updateQuery = (nextPage = page, nextSearch = search) => {
    setQueryParams({
      page: nextPage,
      limit: PAGE_SIZE,
      search: nextSearch,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQuery(newPage, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    updateQuery(1, value);
  };

  const options = useMemo(() => data?.data?.data ?? [], [data]);

  return {
    options,
    page,
    totalPages: data?.data?.pages ?? 1,
    totalItems: data?.data?.total ?? 0,
    itemsPerPage: data?.data?.limit ?? PAGE_SIZE,
    setPage: handlePageChange,
    search,
    setSearch: handleSearch,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export default useDrugCategories;

// import { useState, useCallback } from "react";
// import APIClient from "../../../shared/api/api-client";

// // تعريف دقيق للبيانات القادمة من الباك إند بناءً على الـ JSON الخاص بكِ
// export interface CategoryOption {
//   categoryId: number;
//   categoryName: string;
// }

// export const useFetchDrugCategories = () => {
//   const [categories, setCategories] = useState<CategoryOption[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // استخدام useCallback لمنع إعادة إنشاء الدالة مع كل رندر للواجهة
//   const fetchCategories = useCallback(async () => {
//     // إذا كانت البيانات مجلوبة مسبقاً، لا داعي لضرب السيرفر مرة أخرى (كاش ميموري مصغر)
//     if (categories.length > 0) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const client = new APIClient<any>("/drug-categories?page=1&limit=10");
//       const response = await client.get();

//       if (response && response.success) {
//         setCategories(response.data.data);
//       } else {
//         throw new Error(response.message || "فشل جلب التصنيفات");
//       }
//     } catch (err: any) {
//       console.error("Fetch Categories Error:", err);
//       setError(err?.message || "حدث خطأ أثناء جلب التصنيفات");
//     } finally {
//       setLoading(false);
//     }
//   }, [categories.length]);

//   return { categories, loading, error, fetchCategories };
// };
