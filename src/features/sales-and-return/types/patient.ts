// types/patient.ts

export interface Patient {
  patientId: number;
  fullName: string;
  phone: string;
  nationalId: string;
  invoicesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// الكائن الفعلي القادم من الـ API بداخل الـ FetchResponse
export interface PatientsApiResponse {
  data: Patient[];       // مصفوفة المرضى الفعليّة
  meta: PaginationMeta;  // بيانات الصفحات والسكرول
}