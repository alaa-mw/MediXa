export interface DrugIngredient {
  ingredientId: number;
  strengthValue: number;
  unit: string;
}

export interface DrugFormData {
  dosageFormId: string | number;
  tradeName: string;
  barcode: string;
  unitsPerBox: string | number;
  netPrice: string | number;
  consumerPrice: string | number;
  isRx: boolean;
  isActive: boolean;
  ingredients: DrugIngredient[];
  categoryIds: number[];
}
