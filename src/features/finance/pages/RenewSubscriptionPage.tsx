import { useState } from "react";
import { Container, Grid, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../shared/hooks/useGetData";
import { useRenewSubscription } from "../hooks/useRenewSubscription";
import type { SubscriptionPlan } from "../../subscription/types/subscriptionTypes";
import PricingHero from "../../subscription/components/PricingHero";
import RenewPlanCard from "../components/subscriptionSchedule/RenewPlanCard";

export default function RenewSubscriptionPage() {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();

  // حساب وقت البدء (الوقت الحالي + 5 دقائق لضمان عدم وجود تضارب)
  const nowPlusBuffer = new Date(Date.now() + 5 * 60 * 1000);
  const startsAt = nowPlusBuffer.toISOString();

  // جلب الخطط المتاحة
  const { data, isLoading, error } = useGetData<SubscriptionPlan[]>(
    "/subscriptions/plans/public",
  );

  // حالة الاختيار
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  // هوك تجديد الاشتراك
  const { renewSubscription, isSubmitting } = useRenewSubscription(pharmacyId!);

  const plans = data?.data ?? [];
  const selectedPlan = plans.find((p) => p.planId === selectedPlanId);

  // دالة تحديد الخطة والعرض
  const handleSelectPlan = (planId: number, offerId: number | null) => {
    setSelectedPlanId(planId);
    setSelectedOfferId(offerId);
  };

  // تأكيد التجديد وإرسال الطلب للـ API
  const handleConfirmRenew = () => {
    if (!selectedPlanId) return;

    renewSubscription({
      planId: selectedPlanId,
      offerId: selectedOfferId,
      startsAt: startsAt,
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <div>حدث خطأ أثناء تحميل الخطط</div>;

  return (
    <Container maxWidth="xl" sx={{ py: 3, pb: 6 }}>
      {/* هيرو الصفحة الذي سيتغير شكله ويظهر زر التأكيد و اسم الخطة بداخله عند التحديد */}
      <PricingHero
        selectedPlanName={selectedPlan?.name}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmRenew}
      />

      <Grid container spacing={4} sx={{ px: { xs: 0, md: 5 } }}>
        {plans.map((plan) => (
          <Grid key={plan.planId} size={{ xs: 12, md: 4 }}>
            <RenewPlanCard
              plan={plan}
              featured={plan.code === "PROFESSIONAL"}
              isSelectedPlan={selectedPlanId === plan.planId}
              onSelectPlan={handleSelectPlan}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
