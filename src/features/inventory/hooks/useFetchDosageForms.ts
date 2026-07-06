import { useState, useCallback } from "react";
import APIClient from "../../../shared/api/api-client";

export interface DosageFormOption {
  dosageFormId: number;
  dosageFormName: string;
  formCategory: string;
}

export const useFetchDosageForms = () => {
  const [dosageForms, setDosageForms] = useState<DosageFormOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDosageForms = useCallback(async () => {
    if (dosageForms.length > 0) return; 
 
    setLoading(true);
    setError(null);
    try {
      const client = new APIClient<any>("/dosage-forms?page=1&limit=5");
      const response = await client.get();
      
      if (response && response.success) {
        setDosageForms(response.data.data); 
      } else {
        throw new Error(response.message || "فشل جلب الأشكال الصيدلانية");
      }
    } catch (err: any) {
      console.error("Fetch Dosage Forms Error:", err);
      setError(err?.message || "حدث خطأ أثناء جلب الأشكال الصيدلانية");
    } finally {
      setLoading(false);
    }
  }, [dosageForms.length]);

  return { dosageForms, loading, error, fetchDosageForms };
};