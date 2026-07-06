import { useState } from "react";
import APIClient from "../../../shared/api/api-client";

export interface CreatePrivateDrugPayload {
  dosageFormId: number;
  tradeName: string;
  barcode: string;
  unitsPerBox: number;
  isRx: boolean;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: number;
  consumerPrice: number;
  notes: string;
  storageLocation: string;
  categoryIds: number[];
  ingredients: {
    ingredientId: number;
    strengthValue: number;
    unit: string;
  }[];
  batches: {
    initialQuantity: number;
    expiryDate: string;
    receivedDate: string; // 🌟 تحديث الاسم هنا
  }[];
}

export const useCreatePrivateDrug = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPrivateDrug = async (payload: CreatePrivateDrugPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const client = new APIClient<any>("/pharmacy-drugs/add-private-drug");
      const response = await client.post(payload);

      if (response && response.success) {
        setSuccess(true);
        return response.data;
      } else {
        throw new Error(response.message || "فشلت عملية حفظ الدواء الخاص");
      }
    } catch (err: any) {
      console.error("Error creating private drug:", err);
      setError(err?.message || "حدث خطأ أثناء حفظ الدواء الجديد");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPrivateDrug,
    loading,
    success,
    error,
  };
};