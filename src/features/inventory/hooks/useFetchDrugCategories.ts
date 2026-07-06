import { useState, useCallback } from "react";
import APIClient from "../../../shared/api/api-client";

// تعريف دقيق للبيانات القادمة من الباك إند بناءً على الـ JSON الخاص بكِ
export interface CategoryOption {
  categoryId: number;
  categoryName: string;
}

export const useFetchDrugCategories = () => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // استخدام useCallback لمنع إعادة إنشاء الدالة مع كل رندر للواجهة
  const fetchCategories = useCallback(async () => {
    // إذا كانت البيانات مجلوبة مسبقاً، لا داعي لضرب السيرفر مرة أخرى (كاش ميموري مصغر)
    if (categories.length > 0) return;
 
    setLoading(true);
    setError(null);
    try {
      const client = new APIClient<any>("/drug-categories?page=1&limit=10");
      const response = await client.get();
      
      if (response && response.success) {
        setCategories(response.data.data); 
      } else {
        throw new Error(response.message || "فشل جلب التصنيفات");
      }
    } catch (err: any) {
      console.error("Fetch Categories Error:", err);
      setError(err?.message || "حدث خطأ أثناء جلب التصنيفات");
    } finally {
      setLoading(false);
    }
  }, [categories.length]);

  return { categories, loading, error, fetchCategories };
};