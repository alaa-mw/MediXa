import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query"; // 🆕 تمت إضافته

import APIClient from "../../../shared/api/api-client"; // 🆕 استيراد عميل الـ API الخاص بك

import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";

import type {
  ActiveIngredient,
  IngredientsSearchResponse,
} from "../types/drug";

// 1. Hook للبحث عن المواد الفعالة مع التمرير اللانهائي (ممتاز ويبقى كما هو)

export const useActiveIngredientSearch = (
  debouncedSearchTerm: string,
  limit: number = 20,
) => {
  const [page, setPage] = useState(1);

  const [allResults, setAllResults] = useState<ActiveIngredient[]>([]);

  const [hasMore, setHasMore] = useState(true);

  // تصفير البيانات عند تغير كلمة البحث المستقرة

  useEffect(() => {
    setPage(1);

    setAllResults([]);

    setHasMore(true);
  }, [debouncedSearchTerm]);

  const {
    data: searchResults,
    isLoading,
    isFetching,
  } = useGetWithParamsWithoutState<any>(
    "/active-ingredients/search",

    { name: debouncedSearchTerm, page, limit },

    { enabled: !!debouncedSearchTerm.trim() },
  );

  // تجميع البيانات

  useEffect(() => {
    if (searchResults?.data) {
      if (page === 1) {
        setAllResults(searchResults.data);
      } else {
        setAllResults((prev) => [...prev, ...searchResults.data]);
      }

      // إذا كان عدد العناصر الراجعة أقل من limit فهذا يعني أننا وصلنا للنهاية

      if (searchResults.data.length < limit) {
        setHasMore(false);
      }
    }
  }, [searchResults?.data, page, limit]);

  const loadMore = () => {
    if (hasMore && !isFetching) setPage((prev) => prev + 1);
  };

  return { allResults, isLoading, isFetching, hasMore, loadMore };
};

// 2. 🌟 Hook لجلب الأدوية بناءً على المواد الفعالة المختارة (بالطريقة المعمارية الصحيحة)

export const useSearchDrugsByIngredients = (ingredientIds: number[]) => {
  return useQuery({
    // مصفوفة الـ IDs هي المفتاح السري، كلما تغيرت سيتم جلب البيانات تلقائياً

    queryKey: ["drugs-by-ingredients", ingredientIds],

    queryFn: async () => {
      // نستخدم APIClient الخاص بك لإرسال طلب POST

      const apiClient = new APIClient<IngredientsSearchResponse>(
        "/pharmacy-drugs/search-by-ingredients",
      );

      // نرسل مصفوفة المواد الفعالة كـ Body

      return apiClient.post({ ingredientIds });
    },

    // هذا السطر يغنيك عن الـ useEffect في المكون! لن يرسل الطلب إذا لم تختر أي مادة

    enabled: ingredientIds.length > 0,

    // الاحتفاظ بالبيانات في الكاش لمدة 5 دقائق لتسريع تجربة المستخدم

    staleTime: 5 * 60 * 1000,
  });
};
