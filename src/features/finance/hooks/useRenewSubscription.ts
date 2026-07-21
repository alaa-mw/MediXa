import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIClient from "../../../shared/api/api-client";
import { useSnackbar } from "../../../shared/providers/useSnackbar";

interface RenewPayload {
  planId: number;
  offerId?: number | null;
  startsAt: string;
}

export const useRenewSubscription = (pharmacyId: string | number) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const renewSubscription = async (payload: RenewPayload) => {
    setIsSubmitting(true);
    try {
      const apiClient = new APIClient<any>(
        `/subscriptions/admin/pharmacies/${pharmacyId}/subscribe`,
      );

      // تجهيز الـ Body بالاعتماد على وجود العرض أم لا
      const body: Record<string, any> = {
        planId: payload.planId,
        startsAt: payload.startsAt,
      };

      if (payload.offerId) {
        body.offerId = payload.offerId;
      }

      await apiClient.post(body);

      showSnackbar("تم تجديد الاشتراك بنجاح", "success");
      navigate(-1); // العودة للصفحة السابقة
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "حدث خطأ أثناء تجديد الاشتراك، يرجى المحاولة مرة أخرى";
      showSnackbar(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { renewSubscription, isSubmitting };
};
