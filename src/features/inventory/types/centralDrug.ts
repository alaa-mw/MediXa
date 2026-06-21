export interface DosageForm {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DrugIngredient {
  drugIngredientId: number;
  ingredientId: number;
  generalDrugId: number;
  strengthValue: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
  ingredient: Ingredient;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DrugCategory {
  uniqueId: number;
  generalDrugId: number;
  categoryId: number;
  createdAt: string;
  category: Category;
}

export interface CentralDrugData {
  generalDrugId: number;
  drugId: number;
  dosageFormId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  netPrice: string; 
  consumerPrice: string;
  isRx: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  dosageForm: DosageForm;
  ingredients: DrugIngredient[];
  categories: DrugCategory[];
}