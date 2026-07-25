// تعريف هيكل الدواء العام الواحد
export interface GeneralDrug {
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
}

// تعريف هيكل بيانات الترقيم (Pagination Data)
export interface PaginatedData<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponseData<T> {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: T;
}

export type GeneralDrugResponse = ApiResponseData<PaginatedData<GeneralDrug>>;
