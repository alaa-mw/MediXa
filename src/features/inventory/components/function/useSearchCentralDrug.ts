import { useState } from "react";
import type { CentralDrugData } from "../../types/centralDrug";
import APIClient from "../../../../shared/api/api-client";

export const useSearchCentralDrug = () => {
  const [loading, setLoading] = useState(false);
  const [foundDrug, setFoundDrug] = useState<CentralDrugData | null>(null);
  const [searchResult, setSearchResult] = useState<"found" | "not_found" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchDrugByBarcode = async (barcode: string) => {
    const trimmedBarcode = barcode.trim();
    if (!trimmedBarcode) return;

    setLoading(true);
    setError(null);
    setFoundDrug(null);

    try {
      // 1. إنشاء نسخة من الـ APIClient وتمرير الرابط الديناميكي
      const client = new APIClient<CentralDrugData>(`/general-drugs/barcode/${trimmedBarcode}`);
      
      // 2. استدعاء دالة الـ get (التي ترجع التغليف الموحد FetchResponse<CentralDrugData>)
      const response = await client.get();

      // 3. التحقق من نجاح العملية ووجود البيانات داخل المغلف التابع للـ APIClient
      if (response && response.success && response.data) {
        setFoundDrug(response.data);
        setSearchResult("found");
      } else {
        setFoundDrug(null);
        setSearchResult("not_found");
      }
    } catch (err: any) {
      console.error("Error fetching drug from CDB:", err);
      // الباك إند يرجع خطأ أو 404 في حال لم يعثر على الباركود
      setFoundDrug(null);
      setSearchResult("not_found");
      setError(err?.message || "حدث خطأ أثناء الاتصال بالقاعدة المركزية");
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