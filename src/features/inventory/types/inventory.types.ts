// src/features/inventory/apis/inventory.types.ts

export interface PharmacyDrug {
  pharmacyDrugId: number;
  pharmacyId: number;
  drugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: string;       // تأتي من الباك إند كسلسلة نصية
  consumerPrice: string;  // تأتي من الباك إند كسلسلة نصية
  expiryDateAlarm: number;
  isActive: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  
  // حقول إضافية مضافة محلياً أو يتم عمل Populate لها مستقبلاً
  trade_name?: string; 
  scientific_name?: string;
  category?: string;
  type?: string;
  quantity?: number;
}

export interface PharmacyDrugsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: {
    pharmacyDrugs: PharmacyDrug[];
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}