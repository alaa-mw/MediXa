export interface SearchDrugResponse {
  pharmacyDrugs: PaginatedDrugs<PharmacyDrug>;
  generalDrugs: PaginatedDrugs<GeneralDrug>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Generic paginated response wrapper
interface PaginatedDrugs<T> extends Pagination {
  items: T[];
}

export interface PharmacyDrug {
  pharmacyDrugId: string;
  drugId: string;
  source: string;
  sourceDrugId: string;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  availableQuantity: number;
  availableBoxCount: number;
}

interface GeneralDrug {
  generalDrugId: string;
  drugId: string;
  tradeName: string;
  barcode: string;
}