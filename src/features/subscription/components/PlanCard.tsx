// PlanCard.tsx (الملف المحدث بالكامل)

import { useState } from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import PriceSection from "./PriceSection";
import OfferBanner from "./OfferBanner";
import type { SubscriptionPlan } from "../types/subscriptionTypes";
import IconHelper from "./IconHelper";
import DiscountCorner from "./DiscountRibbon";
import { Check } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
  plan: SubscriptionPlan;
  featured?: boolean;
  returnTo?: string;
  savedForm?: any;
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

export default function PlanCard({ plan, featured, returnTo }: Props) {
  const navigate = useNavigate();
  const color = colors[plan.code as keyof typeof colors] ?? "primary";
  const lightColor =
    lightColors[plan.code as keyof typeof lightColors] ?? "#EBF7EE";

  // استخراج العروض العامة (نجعلها مصفوفة فارغة كقيمة احترازية)
  const publicOffers = plan.publicOffers || [];

  // تحديد أول عرض افتراضياً إذا توفرت عروض
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(
    publicOffers.length > 0 ? publicOffers[0].offerId : null,
  );

  // العثور على كائن العرض المحدد حالياً لتطبيق الخصم
  const currentAppliedOffer = publicOffers.find(
    (o) => o.offerId === selectedOfferId,
  );

  // حساب السعر بناءً على تطبيق العرض أو السعر الأساسي
  const displayPrice = currentAppliedOffer
    ? currentAppliedOffer.finalPrice
    : plan.basePrice;

  // التبديل بين اختيار العرض أو إلغائه (إذا ضغط على نفس العرض يتم إلغاؤه)
  const handleToggleOffer = (offerId: number) => {
    setSelectedOfferId((prev) => (prev === offerId ? null : offerId));
  };

  // عند الضغط على زر الشراء/اختيار الخطة
  const handleSelectPlan = () => {
    const payload = {
      planId: plan.planId,
      offerId: selectedOfferId, // إرسال المعرف المختار أو null في حال تم إلغاء التحديد
    };

    console.log("الخطة والعرض المحددان:", payload);

    if (returnTo) {
      navigate(returnTo, {
        state: {
          fromPricing: true,
          selectedPlanId: payload.planId,
          selectedOfferId: payload.offerId,
        },
      });
    } else {
      navigate("/", { state: payload });
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 5,
        height: "100%",
        borderWidth: featured ? 2 : 1,
        borderStyle: "solid",
        borderColor: featured ? `${color}.main` : "divider",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* شريط الخصم العلوي يظهر فقط عند تفعيل عرض معين */}
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

            {/* مميزات الخطة */}
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

          {/* السعر المحدث ديناميكياً بناءً على العرض المختار */}
          <PriceSection
            basePrice={plan.basePrice}
            currentPrice={displayPrice}
            color={color}
          />

          {/* عرض جميع العروض المتاحة عبر الـ map بدلاً من عرض واحد فقط */}
          {publicOffers.length > 0 && (
            <Stack spacing={1.5}>
              {publicOffers.map((offer) => (
                <OfferBanner
                  key={offer.offerId}
                  offerId={offer.offerId}
                  title={offer.title}
                  description={offer.description}
                  endsAt={offer.endsAt}
                  color={color}
                  isSelected={selectedOfferId === offer.offerId}
                  onSelectOffer={handleToggleOffer}
                />
              ))}
            </Stack>
          )}

          {/* زر التأكيد واختيار الخطة */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            color={color as any}
            onClick={handleSelectPlan}
          >
            اختر هذه الخطة
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
