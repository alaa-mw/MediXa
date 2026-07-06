import { useState } from "react";
import type { CentralDrugData } from "../types/centralDrug";
import APIClient from "../../../shared/api/api-client";

export const useSearchCentralDrug = () => {
  const [loading, setLoading] = useState(false);
  const [foundDrug, setFoundDrug] = useState<CentralDrugData | null>(null);
  const [searchResult, setSearchResult] = useState<"found" | "not_found" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchDrugByBarcode = async (barcode: string) => {
    const trimmedBarcode = barcode.trim();
    if (!trimmedBarcode) return;

    // 1. إعادة تهيئة الحالات قبل بدء البحث الجديد
    setLoading(true);
    setError(null);
    setFoundDrug(null);
    setSearchResult(null);

    try {
      const client = new APIClient<CentralDrugData>(`/general-drugs/barcode/${trimmedBarcode}`);
      const response = await client.get(); 

      // [حالة الـ 200]: الدواء موجود في السجلات المركزية
      if (response && response.success && response.data) {
        setFoundDrug(response.data);
        setSearchResult("found");
        setError(null);
      } 
    } catch (err: any) {
      setFoundDrug(null);

      const statusCode = err?.statusCode || err?.response?.status;

      if (statusCode === 404) {
        setSearchResult("not_found"); 
        setError(null); 
      } else {
        setSearchResult(null);
        setError(err?.message || "حدث خطأ غير متوقع أثناء الاتصال بالقاعدة المركزية");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setFoundDrug(null);
    setSearchResult(null);
    setError(null);
  };

  return {
    searchDrugByBarcode,
    loading,
    foundDrug,
    searchResult,
    error, 
    resetSearch
  };
};