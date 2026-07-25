export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface PharmacyOwner {
  pharmacyOwnerId: number;
  user: User;
}

export interface Pharmacy {
  pharmacyId: number;
  pharmacyName: string;
  pharmacistLicenseNo :string;
  contactPhone: string;
  governorate: string;
  healthDirectorate: string;
  areaName: string;
  addressText: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "REJECTED" | "SUSPENDED";  
  openingDate: string;
  pharmacyOwner: PharmacyOwner;
  hasActiveSubscription: boolean;
}


export interface PaginationMeta 
 {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AllPharmaciesResponse {
  data: Pharmacy[];
  meta: PaginationMeta;
}