// PricingPage.tsx

import { Container, Grid } from "@mui/material";
import type { SubscriptionPlan } from "../types/subscriptionTypes";
import PricingHero from "../components/PricingHero";
import PlanCard from "../components/PlanCard";
import { useLocation } from "react-router-dom";
import { useGetData } from "../../../shared/hooks/useGetData";
import PlanCardSkeleton from "../../finance/components/subscriptionSchedule/SkeltonPlanCard";

export default function PricingPage() {
  const location = useLocation();

  const returnTo = location.state?.returnTo ?? "/";
  const savedForm = location.state?.savedForm ?? null; // استخراج الفورم المحفوظ إن وجد

  const { data, isLoading, error } = useGetData<SubscriptionPlan[]>(
    "/subscriptions/plans/public",
  );

  if (error) return <div>Error</div>;

  const plans = data?.data ?? [];

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <PricingHero
        isSubmitting={false}
        startsAt={""}
        onDateChange={function (date: string): void {
          throw new Error("Function not implemented.");
        }}
        onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Grid container spacing={4} sx={{ px: 5 }}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <PlanCardSkeleton />
              </Grid>
            ))
          : plans.map((plan) => (
              <Grid
                key={plan.planId}
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <PlanCard
                  plan={plan}
                  featured={plan.code === "PROFESSIONAL"}
                  returnTo={returnTo}
                  savedForm={savedForm}
                />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}
