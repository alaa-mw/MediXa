import { useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import useGetData from "../../../shared/hooks/useGetData";
import type { SubscriptionPlan } from "../../subscription/types/subscriptionTypes";
import RenewPlanCard from "../../finance/components/subscriptionSchedule/RenewPlanCard";
import OwnerPricingHero from "../components/OwnerPricingHero";
import { useSubscriptionCheckout } from "../hook/useSubscriptionCheckout";

export default function OwnerRenewSubscriptionPage() {
  const { data, isLoading, error } = useGetData<SubscriptionPlan[]>(
    "/subscriptions/plans/public",
  );

  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const {
    checkout,
    isLoading: isSubmitting,
    error: checkoutError,
  } = useSubscriptionCheckout();

  const plans = data?.data ?? [];
  const selectedPlan = plans.find((plan) => plan.planId === selectedPlanId);

  const handleSelectPlan = (planId: number, offerId: number | null) => {
    setSelectedPlanId(planId);

    const plan = plans.find((currentPlan) => currentPlan.planId === planId);
    const fallbackOfferId =
      plan?.bestOfferId ?? plan?.publicOffers?.[0]?.offerId ?? null;

    setSelectedOfferId(offerId ?? fallbackOfferId);
  };

  const handleConfirmRenew = () => {
    if (!selectedPlanId) return;

    const offerId =
      selectedOfferId ??
      selectedPlan?.bestOfferId ??
      selectedPlan?.publicOffers?.[0]?.offerId;

    if (!offerId) return;

    checkout(selectedPlanId, offerId);
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
      <OwnerPricingHero
        selectedPlanName={selectedPlan?.name}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmRenew}
      />

      {checkoutError ? (
        <Box sx={{ mb: 3, color: "error.main", textAlign: "center" }}>
          حدث خطأ أثناء إنشاء عملية الدفع، يرجى المحاولة لاحقاً.
        </Box>
      ) : null}

      <Grid container spacing={4} sx={{ px: { xs: 0, md: 5 } }}>
        {plans.map((plan) => (
          <Grid key={plan.planId} size={{ xs: 12, md: 4 }}>
            <RenewPlanCard
              plan={plan}
              featured={plan.code === "PROFESSIONAL"}
              isSelectedPlan={selectedPlanId === plan.planId}
              onSelectPlan={handleSelectPlan}
              pharmacyId={parseInt(localStorage.getItem("pharmacyId") || "0")}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
