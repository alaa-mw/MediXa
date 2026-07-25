
export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  strengthValue: number;
  unit: string;
}

export interface ActiveIngredient {
  ingredientId: number;
  ingredientName: string;
}

export interface DosageForm {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: string;
}

export interface DrugStock {
  availableBaseQuantity: number;
  availableFullBoxes: number;
  isAvailable: boolean;
}

export interface PharmacyDrug {
  saleUnits: never[];
  pharmacyDrugId: number;
  drugId?: number;           
  barcode?: string;         
  tradeName: string;
  source?: string;
  
  
  matchType?: string;        
  
  dosageForm?: DosageForm;
  ingredients?: Ingredient[];
  unitsPerBox?: number;
  sellPart?: boolean;
  netPrice?: number;
  consumerPrice?: number;
  stock?: DrugStock;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AlternativesResponse {
  targetDrug: PharmacyDrug;
  alternatives: {
    items: PharmacyDrug[];
    meta: PaginationMeta; 
  };
}

export interface IngredientsSearchResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: PharmacyDrug[];
  meta: PaginationMeta;
}