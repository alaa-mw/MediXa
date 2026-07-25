import type { Pagination } from "../../../shared/api/api-pagination-types";

export interface SearchDrugResponse {
  pharmacyDrugs: PaginatedDrugs<PharmacyDrug>;
  generalDrugs: PaginatedDrugs<GeneralDrug>;
}

// Generic paginated response wrapper
interface PaginatedDrugs<T> {
  items: T[];
}

export interface PharmacyDrug extends Pagination {
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

interface GeneralDrug extends Pagination {
  generalDrugId: string;
  drugId: string;
  tradeName: string;
  barcode: string;
}