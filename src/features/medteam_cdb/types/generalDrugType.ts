import type { PaginatedResponse } from "../../../shared/api/api-pagination-types";
import type { ActiveIngredientApiResponse } from "./activeIngrediantType";
import type { DosageForm } from "./dosageFormType";
import type { DrugCategoryForm } from "./drugCategoryType";

export interface ActiveIngredientItem {
  ingredientId: number;
  ingredientName: string;
  strength: string;
  unit: string;
}

export interface Drug {
  generalDrugId: number;
  drugId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  activeIngredient: ActiveIngredientItem[];
  dosageForm: DosageForm;
  drugCategory: DrugCategoryForm[];
  netPrice: string;
  consumerPrice: string;
  isRx: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: PaginatedResponse<T>;
}

export type GeneralDrugsResponse = ApiResponse<Drug>;
