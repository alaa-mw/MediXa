import { useState, useCallback } from "react";
import APIClient from "../../../shared/api/api-client";

export interface IngredientOption {
  ingredientId: number;
  ingredientName: string;
  description?: string;
}

export const useFetchIngredients = () => {
  const [ingredients, setIngredients] = useState<IngredientOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredients = useCallback(async () => {
    if (ingredients.length > 0) return; // كاش ميموري مصغر لحماية الأداء

    setLoading(true);
    setError(null);
    try {
      const client = new APIClient<any>("/active-ingredients");
      const response = await client.get();

      if (response && response.success) {
        setIngredients(response.data); 
      } else {
        throw new Error(response.message || "فشل جلب التراكيب الطبية");
      }
    } catch (err: any) {
      console.error("Fetch Ingredients Error:", err);
      setError(err?.message || "حدث خطأ أثناء جلب التراكيب الطبية");
    } finally {
      setLoading(false);
    }
  }, [ingredients.length]);

  return { ingredients, loading, error, fetchIngredients };
};