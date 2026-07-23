import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import DiscountCorner from "../../../subscription/components/DiscountRibbon";
import IconHelper from "../../../subscription/components/IconHelper";
import PriceSection from "../../../subscription/components/PriceSection";
import type { SubscriptionPlan } from "../../../subscription/types/subscriptionTypes";
import PlanOffersDialog from "./PlaneOffersDialog";

interface Props {
  plan: SubscriptionPlan;
  featured?: boolean;
  isSelectedPlan: boolean;
  pharmacyId?: number;
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
  pharmacyId,
  onSelectPlan,
}: Props) {
  const color = colors[plan.code as keyof typeof colors] ?? "primary";
  const lightColor =
    lightColors[plan.code as keyof typeof lightColors] ?? "#EBF7EE";

  const publicOffers = plan.publicOffers || [];

  // الحالة لتخزين العرض المختار
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(
    publicOffers.length > 0 ? publicOffers[0].offerId : null,
  );

  const [appliedOfferDetails, setAppliedOfferDetails] = useState<any>(
    publicOffers.length > 0 ? publicOffers[0] : null,
  );

  // دالة لتحديث تفاصيل العرض بناءً على الـ ID المختار (تشمل العروض العامة والخاصة التي سيجلبها الدايلوج)
  const handleOfferSelection = (
    offerId: number | null,
    allOffersList: any[] = [],
  ) => {
    setSelectedOfferId(offerId);

    if (offerId === null) {
      setAppliedOfferDetails(null);
    } else {
      const found = allOffersList.find((o) => o.offerId === offerId);
      if (found) {
        setAppliedOfferDetails(found);
      }
    }

    if (isSelectedPlan) {
      onSelectPlan(plan.planId, offerId);
    }
  };

  const displayPrice = appliedOfferDetails
    ? appliedOfferDetails.finalPrice
    : plan.basePrice;

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
        justifyContent: "space-between",
      }}
    >
      {appliedOfferDetails && (
        <DiscountCorner
          discount={appliedOfferDetails.discountValue}
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
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Stack>
                ))}
            </Stack>
          </Stack>

          {/* قسم السعر */}
          <PriceSection
            basePrice={plan.basePrice}
            currentPrice={displayPrice}
            color={color}
          />

          {/* إظهار تفاصيل العرض المختار حالياً للمستخدم */}
          {selectedOfferId && (
            <Box
              sx={{
                p: 1.5,
                bgcolor: lightColor,
                borderRadius: 2,
                border: `1px dashed ${color}.main`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: `${color}.main`,
                  display: "block",
                }}
              >
                العرض المطبق حالياً:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {appliedOfferDetails?.title ||
                  `عرض برقم ID: ${selectedOfferId}`}
              </Typography>
            </Box>
          )}

          {/* زر استعراض العروض (العامة والخاصة) */}
          <PlanOffersDialog
            pharmacyId={pharmacyId!}
            planId={plan.planId}
            planCode={plan.code}
            publicOffers={publicOffers}
            selectedOfferId={selectedOfferId}
            onSelectOffer={handleOfferSelection}
          />

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
