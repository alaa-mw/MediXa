export interface User {
    userId : number;
    fullName : string;
    email : string;
    phone : string;
    accountType : string;
    nationalId : string;
    status : 'ACTIVE' |
  'INACTIVE' |
  'SUSPENDED' |
  'PENDING' 
}


export interface PharmacyOwner {
    pharmacyOwnerId : number;
    user : User
}

export interface PharmacyOwnersPaginationData {
  data: PharmacyOwner[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AllOwnersResponse {
  message: string;
  data: PharmacyOwnersPaginationData
}