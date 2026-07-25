import { useState } from "react";
import useGetData from "../../../shared/hooks/useGetData";
import type { ActiveIngredientApiResponse } from "../types/activeIngrediantType";

const useActiveIngredients = () => {
  const query = useGetData<ActiveIngredientApiResponse[]>(
    "/active-ingredients",
  );
  const [selected, setSelected] = useState<ActiveIngredientApiResponse | null>(
    null,
  );
  const select = (value: string) => {
    const item =
      query?.data?.data.find((x) => x.ingredientName === value) ?? null;

    setSelected(item);
  };

  return {
    activeIngredients: query.data?.data ?? [],

    isLoading: query.isLoading,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
    selected,
    select,
  };
};

export default useActiveIngredients;
