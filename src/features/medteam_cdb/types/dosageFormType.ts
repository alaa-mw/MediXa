export interface DosageForm {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: "SOLID" | "LIQUID" | string;
}

export interface DosageFormsPaginationData {
  data: DosageForm[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
