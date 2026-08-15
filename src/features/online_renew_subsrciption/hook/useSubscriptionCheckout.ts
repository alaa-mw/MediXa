import { useIdempotency } from "../../../shared/hooks/useIdempotency";
import usePostData from "../../../shared/hooks/usePostData";
import type {
  CheckoutResponseData,
  CreateCheckoutBody,
} from "../types/pharmaSub";

export const useSubscriptionCheckout = () => {
  const { getKey, clearKey } = useIdempotency();
  const pharmacyId = localStorage.getItem("pharmacyId");
  // نحدد الـ endpoint الخاص بالباك اند
  const mutation = usePostData<CheckoutResponseData>(
    `/subscription-payments/pharmacies/${pharmacyId}/checkout`,
  );

  const handleCheckout = (planId: number, offerId: number) => {
    const idempotencyKey = getKey();

    const body: CreateCheckoutBody = {
      planId,
      offerId,
      idempotencyKey,
    };

    mutation.mutate(body, {
      onSuccess: (response) => {
        // تفريغ المفتاح بعد نجاح العملية لإنشاء مفتاح جديد في المرة القادمة
        clearKey();

        // التحقق من وجود رابط الدفع وإعادة التوجيه إليه
        const checkoutUrl = response.data?.checkoutUrl;
        if (checkoutUrl) {
          window.location.href = checkoutUrl; // الانتقال لصفحة Stripe الخارجية
        }
      },
      onError: (error) => {
        console.error("Payment checkout failed:", error);
      },
    });
  };

  return {
    checkout: handleCheckout,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
