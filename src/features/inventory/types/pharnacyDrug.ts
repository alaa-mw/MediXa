// // src/features/inventory/apis/inventory.types.ts

// export interface DosageForm {
//   dosageFormId: number;
//   dosageFormName: string;
//   formCategory: string; // e.g., "SOLID"
//   displayText: string;  // e.g., "Capsule10 (4)"
// }

// export interface Category {
//   uniqueId: number;
//   categoryId: number;
//   categoryName: string;
// }

// // 🌟 الإضافة الجديدة: تعريف بنية المادة الفعالة بدقة بناءً على الريسبونس
// export interface DrugIngredient {
//   ingredientAssignmentId: number;
//   ingredientId: number;
//   ingredientName: string;
//   strengthValue: number;
//   unit: string; // e.g., "mg", "g", "mcg"
// }

// export interface PharmacyDrugDetails {
//   minStockAlert: number;
//   sellPart: boolean;
//   netPrice: number;
//   consumerPrice: number;
//   formattedNetPrice: string;
//   formattedConsumerPrice: string;
//   expiryDateAlarm: number;
//   isActive: boolean;
//   notes: string | null;
// }

// export interface DrugStock {
//   availableQuantity: number;
//   availableQuantityText: string;
//   minStockAlert: number;
//   isLowStock: boolean;
//   isOutOfStock: boolean;
//   status: "AVAILABLE" | "LOW_STOCK" | "OUT_OF_STOCK";
//   batchesCount: number;
// }

// export interface DrugLocation {
//   drugLocationId: number;
//   storageLocation: string;
// }

// export interface PharmacyDrug {
//   pharmacyDrugId: number;
//   drugId: number;
//   source: "PRIVATE" | "GENERAL";
//   sourceText: string; // دواء خاص أو عام
//   tradeName: string;
//   subtitle: string | null; // المادة الفعالة أو الوصف الفرعي
//   barcode: string;
//   categories: Category[];
//   dosageForm: DosageForm;
//   unitsPerBox: number;
//   isRx: boolean;
//   isDrugActive: boolean;
//   pharmacyDrugDetails: PharmacyDrugDetails;
//   stock: DrugStock;
//   locations: DrugLocation[];
//   createdAt: string;
//   updatedAt: string;
//   ingredients: DrugIngredient[]; // 👈 تم تحديثها هنا لتصبح مصفوفة من النوع الجديد بدلاً من مصفوفة فارغة
// }

// export interface PharmacyDrugsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   timestamp: string;
//   path: string;
//   data: {
//     pharmacyDrugs: PharmacyDrug[];
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//     hasNextPage: boolean;
//     hasPreviousPage: boolean;
//   };
// }
// 1. الأشكال الصيدلانية
export interface DosageForm {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: string; // e.g. "SOLID"
  displayText: string;  // e.g. "Capsule10 (24)"
}

// 2. التصنيفات
export interface Category {
  uniqueId: number;
  categoryId: number;
  categoryName: string;
}

// 3. المواد الفعالة (قد تكون موجودة أو اختيارية حسب الـ Endpoint)
export interface DrugIngredient {
  ingredientAssignmentId: number;
  ingredientId: number;
  ingredientName: string;
  strengthValue: number;
  unit: string;
}

// 4. التفاصيل المالية والإنذارات
export interface PharmacyDrugDetails {
  minStockAlert: number;
  sellPart: boolean;
  netPrice: number;
  consumerPrice: number;
  formattedNetPrice: string;
  formattedConsumerPrice: string;
  expiryDateAlarm: number;
  isActive: boolean;
  notes: string | null;
}

// 5. حالة المخزون
export interface DrugStock {
  availableQuantity: number;
  availableQuantityText: string;
  minStockAlert: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
  status: "AVAILABLE" | "LOW_STOCK" | "OUT_OF_STOCK";
  batchesCount: number;
}

// 6. أماكن التخزين
export interface DrugLocation {
  drugLocationId: number;
  storageLocation: string;
}

// 7. عنصر الدواء الواحدة داخل الصيدلية (PharmacyDrug)
export interface PharmacyDrug {
  pharmacyDrugId: number;
  drugId: number;
  source: "GENERAL" | "PRIVATE";
  sourceText: string;
  tradeName: string;
  subtitle: string | null;
  barcode: string;
  categories: Category[];
  dosageForm: DosageForm;
  unitsPerBox: number;
  isRx: boolean;
  isDrugActive: boolean;
  pharmacyDrugDetails: PharmacyDrugDetails;
  stock: DrugStock;
  locations: DrugLocation[];
  createdAt: string;
  updatedAt: string;
  ingredients?: DrugIngredient[]; // جعلها اختيارية لعدم ورودها في الـ payload دائماً
}

// 8. الـ Payload الموجود داخل حقل "data" في الـ Response
export interface PharmacyDrugsDataPayload {
  pharmacyDrugs: PharmacyDrug[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}