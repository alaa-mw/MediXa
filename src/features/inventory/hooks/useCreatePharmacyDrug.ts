import { useState } from "react";
import APIClient from "../../../shared/api/api-client";

export interface CreatePharmacyDrugPayload {
  generalDrugId: number;
  minStockAlert: number;
  sellPart: boolean;
  netPrice: number;
  consumerPrice: number;
  expiryDateAlarm: number;
  notes: string;
  storageLocation: string;
  batches: {
    initialQuantity: number;
    expiryDate: string;
    receivedDate: string;
  }[];
}

export const useCreatePharmacyDrug = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPharmacyDrug = async (payload: CreatePharmacyDrugPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const client = new APIClient<any>("/pharmacy-drugs/from-general");
      
      const response = await client.post(payload);

      if (response && response.success) {
        setSuccess(true);
        return response.data;
      } else {
        throw new Error(response.message || "فشلت عملية حفظ الدواء");
      }
    } catch (err: any) {
      setError(err?.message || "حدث خطأ أثناء حفظ الدواء بالمخزون");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPharmacyDrug,
    loading,
    success,
    error,
  };
};