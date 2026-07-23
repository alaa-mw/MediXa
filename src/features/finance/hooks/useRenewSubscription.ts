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

      console.log("Renew subscription payload:", body);

      await apiClient.post(body);

      showSnackbar("تم تجديد الاشتراك بنجاح", "success");
      navigate(-1);
    } catch (error: any) {
      console.error("❌ رسالة الخطأ:", error?.message || error);
      const errorMessage = error?.message;
      if (
        errorMessage ===
        "Subscription period overlaps with an existing subscription."
      ) {
        showSnackbar("فترة الاشتراك تتداخل مع اشتراك موجو مسبقاً", "error");
      } else {
        showSnackbar(errorMessage, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { renewSubscription, isSubmitting };
};
