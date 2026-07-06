// src/interfaces/sale-invoice.interface.ts

import type { UnitType } from "dayjs";
import type { BatchStatus, InvoiceStatus, InvoiceType, PaymentStatus, SaleType } from "./enums";



// واجهة بيانات المريض داخل الفاتورة
export interface Patient {
  patientId: number;
  pharmacyId: number;
  fullName: string;
  nationalId: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

// واجهة الفاتورة الصيدلانية المرتبطة
export interface PharmacyInvoice {
  pharmacyInvoiceId: number;
  pharmacyId: number;
  patientId: number | null;
  invoiceType: InvoiceType;
  invoiceDate: string;
  status: InvoiceStatus;
  notes: string | null;
  idempotencyKey: string | null;
  createdAt: string;
  updatedAt: string;
  patient: Patient | null;
}

// واجهة تفاصيل الدواء في المستودع الخاص بالصيدلية
export interface PharmacyDrug {
  pharmacyDrugId: number;
  pharmacyId: number;
  drugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: string;
  consumerPrice: string;
  expiryDateAlarm: number;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// واجهة بيانات الطبخة/الدفعة الدوائية الصريحة
export interface BatchInfo {
  batchId: number;
  pharmacyDrugId: number;
  supplierInvoiceItemId: number | null;
  expiryDate: string;
  initialQuantity: number;
  soldQuantity: number;
  receivedDate: string;
  status: BatchStatus;
  createdAt: string;
  updatedAt: string;
}

// واجهة توزيع الحصص على الدفعات أثناء البيع
export interface BatchAllocation {
  saleInvoiceItemBatchId: number;
  saleInvoiceItemId: number;
  batchId: number;
  baseQuantity: number;
  unitCostAtSale: string | null;
  createdAt: string;
  batch: BatchInfo;
}

// واجهة المادة المنفردة داخل الفاتورة
export interface SaleInvoiceItem {
  saleInvoiceItemId: number;
  saleInvoiceId: number;
  pharmacyDrugId: number;
  unitType: UnitType | string;
  baseQuantity: number;
  unitFactorToBase: number;
  baseUnitPrice: string;
  extraPercentage: string;
  finalUnitPrice: string;
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
  pharmacyDrug: PharmacyDrug;
  batchAllocations: BatchAllocation[];
  displayQuantity: number;
}

// الكائن الأساسي للفاتورة داخل مصفوفة الـ data
export interface SaleInvoiceData {
  saleInvoiceId: number;
  pharmacyInvoiceId: number;
  paymentStatus: PaymentStatus;
  saleType: SaleType;
  subtotal: string;
  discount: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  pharmacyInvoice: PharmacyInvoice;
  items: SaleInvoiceItem[];
}

// واجهة بيانات الترقيم والصفحات (Pagination)
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// الواجهة الكبرى الممثلة للـ Response الكامل الراجع من الـ API
export interface SaleInvoiceApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  data: SaleInvoiceData[];
  meta: PaginationMeta;
}