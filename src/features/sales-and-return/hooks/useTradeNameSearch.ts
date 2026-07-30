import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useGetWithParamsWithoutState from "../../../shared/hooks/useGetWithParamsWithoutState";
import APIClient from "../../../shared/api/api-client";
import type { AlternativesResponse } from "../types/drug";

export interface DrugItem {
  pharmacyDrugId: number | string;
  tradeName: string;
}
// Hook للبحث مع التمرير اللانهائي
export const useTradeDrugSearch = (
  debouncedSearchTerm: string,
  limit: number = 15,
) => {
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<any[]>([]);
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
    "/pharmacy-drugs/search-my-drugs/by-name",
    { name: debouncedSearchTerm, page, limit },
    { enabled: !!debouncedSearchTerm.trim() },
  );

  // تجميع البيانات
  useEffect(() => {
    if (searchResults?.data) {
      if (page === 1) {
        setAllResults(searchResults.data);
      } else {
        setAllResults((prev) => {
          const map = new Map<number, DrugItem>();

          [...prev, ...searchResults.data].forEach((drug) => {
            map.set(drug.pharmacyDrugId, drug);
          });

          return [...map.values()];
        });
      }

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

// Hook لجلب البدائل
export const useDrugAlternatives = (selectedDrugId: number | null) => {
  const fetchAlternativesClient = new APIClient<AlternativesResponse>(
    `/pharmacy-drugs/${selectedDrugId}/alternatives`,
  );

  return useQuery({
    queryKey: ["drug-alternatives", selectedDrugId],
    queryFn: () => fetchAlternativesClient.get(),
    enabled: !!selectedDrugId,
  });
};
