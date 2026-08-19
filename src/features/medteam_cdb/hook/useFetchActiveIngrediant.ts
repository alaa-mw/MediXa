import { useState } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  ActiveIngredientApiResponse,
  ActiveIngredientsPaginationData,
} from "../types/activeIngrediantType";

const useActiveIngredients = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const PAGE_SIZE = 10;

  const query = useGetWithParams<ActiveIngredientsPaginationData>(
    "/active-ingredients",
    { page: 1, limit: PAGE_SIZE, search: "" },
  );
  const [selected, setSelected] = useState<ActiveIngredientApiResponse | null>(
    null,
  );
  const select = (value: string) => {
    const item =
      query?.data?.data?.data.find((x) => x.ingredientName === value) ?? null;

    setSelected(item);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    query.setQueryParams((previous) => ({
      ...previous,
      page: nextPage,
    }));
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    query.setQueryParams((previous) => ({
      ...previous,
      page: 1,
      search: value,
    }));
  };

  return {
    activeIngredients: query.data?.data?.data ?? [],

    page: query.data?.data?.page ?? page,

    totalPages: query.data?.data?.pages ?? 1,

    totalItems: query.data?.data?.total ?? 0,

    itemsPerPage: query.data?.data?.limit ?? 10,

    setPage: handlePageChange,

    search,

    setSearch: handleSearch,

    isLoading: query.isLoading,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
    selected,
    select,
  };
};

export default useActiveIngredients;
