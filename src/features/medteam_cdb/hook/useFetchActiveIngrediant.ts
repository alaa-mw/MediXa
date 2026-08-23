// import { useState } from "react";
// import useGetWithParams from "../../../shared/hooks/useGetWithParams";
// import type {
//   ActiveIngredientApiResponse,
//   ActiveIngredientsPaginationData,
// } from "../types/activeIngrediantType";

// const useActiveIngredients = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const PAGE_SIZE = 10;

//   const query = useGetWithParams<ActiveIngredientsPaginationData>(
//     "/active-ingredients",
//     { page: 1, limit: PAGE_SIZE, search: "" },
//   );
//   const [selected, setSelected] = useState<ActiveIngredientApiResponse | null>(
//     null,
//   );
//   const select = (value: string) => {
//     const item =
//       query?.data?.data?.data.find((x) => x.ingredientName === value) ?? null;

//     setSelected(item);
//   };

//   const handlePageChange = (nextPage: number) => {
//     setPage(nextPage);
//     query.setQueryParams((previous) => ({
//       ...previous,
//       page: nextPage,
//     }));
//   };

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     setPage(1);
//     query.setQueryParams((previous) => ({
//       ...previous,
//       page: 1,
//       search: value,
//     }));
//   };

//   return {
//     activeIngredients: query.data?.data?.data ?? [],

//     page: query.data?.data?.page ?? page,

//     totalPages: query.data?.data?.pages ?? 1,

//     totalItems: query.data?.data?.total ?? 0,

//     itemsPerPage: query.data?.data?.limit ?? 10,

//     setPage: handlePageChange,

//     search,

//     setSearch: handleSearch,

//     isLoading: query.isLoading,

//     isError: query.isError,

//     error: query.error,

//     refetch: query.refetch,
//     selected,
//     select,
//   };
// };

// export default useActiveIngredients;
import { useState } from "react";
import useGetWithParams from "../../../shared/hooks/useGetWithParams";
import type {
  ActiveIngredientApiResponse,
  ActiveIngredientsPaginationData,
} from "../types/activeIngrediantType";

const PAGE_SIZE = 10;

const useActiveIngredients = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const query = useGetWithParams<ActiveIngredientsPaginationData>(
    "/active-ingredients",
    {
      page: 1,
      limit: PAGE_SIZE,
      search: "",
    },
  );

  const [selected, setSelected] = useState<ActiveIngredientApiResponse | null>(
    null,
  );

  /*
   * نحصل على الـ payload القادم من الـ API.
   */
  const payload = query.data?.data;

  /*
   * تأكد دائمًا أن activeIngredients عبارة عن Array.
   *
   * ندعم الشكلين:
   *
   * 1)
   * data: {
   *   data: [...]
   * }
   *
   * 2)
   * data: [...]
   */
  const activeIngredients: ActiveIngredientApiResponse[] = Array.isArray(
    payload,
  )
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  const select = (ingredientId: number) => {
    const item =
      activeIngredients.find(
        (ingredient) => ingredient.ingredientId === ingredientId,
      ) ?? null;

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
    activeIngredients,

    page:
      !Array.isArray(payload) && payload?.page
        ? payload.page
        : (query.data?.meta?.page ?? page),

    totalPages:
      !Array.isArray(payload) && payload?.pages
        ? payload.pages
        : (query.data?.meta?.totalPages ?? 1),

    totalItems:
      !Array.isArray(payload) && payload?.total
        ? payload.total
        : (query.data?.meta?.total ?? 0),

    itemsPerPage:
      !Array.isArray(payload) && payload?.limit
        ? payload.limit
        : (query.data?.meta?.limit ?? PAGE_SIZE),

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
