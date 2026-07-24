import { useMemo } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type { PharmacyItemData, PharmacyResponse } from "../types/pharmacyItem";

// مرجع ثابت للمصفوفة الفارغة خارج الـ Hook لمنع حلقة الريندر اللانهائية
const EMPTY_ARRAY: PharmacyItemData[] = [];

export const useGetPharmacies = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    setQueryParams,
    queryParams,
  } = useGetWithParams<PharmacyResponse>("/subscriptions/admin/pharmacies", {
    page: 1,
    limit: 10,
    search: "",
  });

  const searchPharmacies = (searchTerm: string) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      search: searchTerm.trim(),
    }));
  };

  const changePage = (pageNumber: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };

  // استخدام useMemo لضمان ثبات المرجع عند إعادة الريندر
  const pharmaciesList = useMemo(() => {
    return data?.data ?? EMPTY_ARRAY;
  }, [data?.data]);

  const totalPages = data?.meta?.totalPages ?? 1;

  return {
    pharmaciesList,
    totalPages,
    isLoading: isLoading || isFetching,
    isError,
    error,
    queryParams,
    searchPharmacies,
    changePage,
    currentSearch: queryParams.search || "",
  };
};
