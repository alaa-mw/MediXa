import type { PaginatedResponse } from "../../../shared/api/api-pagination-types";

export interface ActiveIngredientApiResponse {
  ingredientId: number;
  ingredientName: string;
  description: string;
}

export type ActiveIngredientsPaginationData =
  PaginatedResponse<ActiveIngredientApiResponse>;
