import { useState } from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import DiscountCorner from "../../../subscription/components/DiscountRibbon";
import IconHelper from "../../../subscription/components/IconHelper";
import OfferBanner from "../../../subscription/components/OfferBanner";
import PriceSection from "../../../subscription/components/PriceSection";
import type { SubscriptionPlan } from "../../../subscription/types/subscriptionTypes";

interface Props {
  plan: SubscriptionPlan;
  featured?: boolean;
  isSelectedPlan: boolean;
  onSelectPlan: (planId: number, offerId: number | null) => void;
}

const colors = {
  STARTER: "secondary",
  PROFESSIONAL: "primary",
  ENTERPRISE: "secondary",
} as const;

const lightColors = {
  STARTER: "#EBF7EE",
  PROFESSIONAL: "#F5EEFC",
  ENTERPRISE: "#EBF7EE",
} as const;

export default function RenewPlanCard({
  plan,
  featured,
  isSelectedPlan,
  onSelectPlan,
}: Props) {
  const color = colors[plan.code as keyof typeof colors] ?? "primary";
  const lightColor =
    lightColors[plan.code as keyof typeof lightColors] ?? "#EBF7EE";

  const defaultOffer = plan.publicOffers?.[0];

  // حالة العرض المختار داخل الخطة
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(
    defaultOffer ? defaultOffer.offerId : null,
  );

  const currentAppliedOffer = plan.publicOffers?.find(
    (o) => o.offerId === selectedOfferId,
  );

  const displayPrice = currentAppliedOffer
    ? currentAppliedOffer.finalPrice
    : plan.basePrice;

  const handleToggleOffer = (offerId: number) => {
    const nextOfferId = selectedOfferId === offerId ? null : offerId;
    setSelectedOfferId(nextOfferId);
    if (isSelectedPlan) {
      onSelectPlan(plan.planId, nextOfferId);
    }
  };

  const handleCardSelection = () => {
    onSelectPlan(plan.planId, selectedOfferId);
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 5,
        height: "100%",
        borderWidth: isSelectedPlan ? 3 : featured ? 2 : 1,
        borderStyle: "solid",
        borderColor: isSelectedPlan
          ? "primary.main"
          : featured
            ? `${color}.main`
            : "divider",
        boxShadow: isSelectedPlan ? "0px 8px 25px rgba(0,0,0,0.12)" : "none",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        justify: "space-between",
      }}
    >
      {currentAppliedOffer && (
        <DiscountCorner
          discount={currentAppliedOffer.discountValue}
          color={color}
          lightColor={lightColor}
        />
      )}

      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <IconHelper code={plan.code} lightColor={lightColor} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: `${color}.main`,
                textAlign: "center",
              }}
            >
              {plan.name}
            </Typography>

            <Stack
              spacing={1.5}
              sx={{ width: "100%", alignSelf: "flex-start", px: 1 }}
            >
              {plan.description
                .split(/[.،,]/)
                .map((feature) => feature.trim())
                .filter((feature) => feature.length > 0)
                .map((feature, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Check
                      sx={{
                        color: "grey",
                        fontSize: "1.2rem",
                        mt: 0.3,
                        pl: 0.5,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        textAlign: "right",
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Stack>
                ))}
            </Stack>
          </Stack>

          <PriceSection
            basePrice={plan.basePrice}
            currentPrice={displayPrice}
            color={color}
          />

          {defaultOffer && (
            <OfferBanner
              offerId={defaultOffer.offerId}
              title={defaultOffer.title}
              description={defaultOffer.description}
              endsAt={defaultOffer.endsAt}
              color={color}
              isSelected={selectedOfferId === defaultOffer.offerId}
              onSelectOffer={handleToggleOffer}
            />
          )}

          <Button
            fullWidth
            size="large"
            variant={isSelectedPlan ? "contained" : "outlined"}
            color={color as any}
            onClick={handleCardSelection}
            sx={{ fontWeight: 700, borderRadius: "10px" }}
          >
            {isSelectedPlan ? "الخطة محددة" : "تحديد هذه الخطة"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
