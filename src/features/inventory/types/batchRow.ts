// features/inventory/types/inventory.types.ts
export interface BatchRow {
  id: string;
  quantity: number | string;
  receivingDate: string; // تم الاستبدال هنا
  expiryDate: string;
}