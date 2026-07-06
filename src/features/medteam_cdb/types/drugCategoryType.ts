export interface DrugCategoryForm {
  categoryId: number;
  categoryName: string;
  description: string;
}

export interface DrugCategoriesPaginationData {
  data: DrugCategoryForm[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
