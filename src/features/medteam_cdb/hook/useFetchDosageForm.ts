import { useMemo, useState } from "react";
import type {
  DosageForm,
  DosageFormsPaginationData,
} from "../types/dosageFormType";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";

const PAGE_SIZE = 5;

export const useDosageForms = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<DosageForm | null>(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    setQueryParams,
  } = useGetWithParams<DosageFormsPaginationData>("/dosage-forms", {
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

  const select = (value: string) => {
    const item =
      data?.data?.data.find((x) => x.dosageFormName === value) ?? null;

    setSelected(item);
  };

  const options = useMemo(() => data?.data?.data ?? [], [data]);

  return {
    options,

    selected,

    select,

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

    refetch,

    error,
  };
};

export default useDosageForms;
