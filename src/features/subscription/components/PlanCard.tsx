// import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
// import PriceSection from "./PriceSection";
// import OfferBanner from "./OfferBanner";
// import type { SubscriptionPlan } from "../types/subscriptionTypes";
// import IconHelper from "./IconHelper";
// import DiscountCorner from "./DiscountRibbon";
// import { Check, CheckCircleOutlineOutlined } from "@mui/icons-material";

// interface Props {
//   plan: SubscriptionPlan;
//   featured?: boolean;
// }

// const colors = {
//   STARTER: "secondary",
//   PROFESSIONAL: "primary",
//   ENTERPRISE: "secondary",
// } as const;

// const lightColors = {
//   STARTER: "#EBF7EE",
//   PROFESSIONAL: "#F5EEFC",
//   ENTERPRISE: "#EBF7EE",
// } as const;

// export default function PlanCard({ plan, featured }: Props) {
//   const color = colors[plan.code as keyof typeof colors] ?? "primary";
//   const lightColor =
//     lightColors[plan.code as keyof typeof lightColors] ?? "#EBF7EE";

//   const offer = plan.publicOffers?.[0];

//   const icon = <IconHelper code={plan.code} lightColor={lightColor} />;

//   return (
//     <Card
//       sx={{
//         position: "relative",
//         borderRadius: 5,
//         height: "100%",
//         borderWidth: featured ? 2 : 1,
//         borderStyle: "solid",
//         borderColor: featured ? `${color}.main` : "divider",
//       }}
//     >
//       {offer && (
//         <DiscountCorner
//           discount={offer.discountValue}
//           color={color}
//           lightColor={lightColor}
//         />
//       )}

//       <CardContent>
//         <Stack spacing={3}>
//           {/* تم إصلاح السطر أدناه: تم إخراج الـ spacing كـ Prop مستقل */}
//           <Stack spacing={2} sx={{ alignItems: "center" }}>
//             {icon}
//             {/* {featured && (
//             <Box sx={{ textAlign: "center" }}>
//               <Typography
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   px: 2,
//                   py: 0.5,
//                   borderRadius: 10,
//                   display: "inline-block",
//                 }}
//               >
//                 الأكثر اختياراً
//               </Typography>
//             </Box>
//           )} */}
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: 800,
//                 color: `${color}.main`,
//                 textAlign: "center",
//               }}
//             >
//               {plan.name}
//             </Typography>

//             {/* تحويل الوصف الطويل إلى مصفوفة من المميزات وعرضها كقائمة */}
//             <Stack
//               spacing={1.5}
//               sx={{ width: "100%", alignSelf: "flex-start", px: 1 }}
//             >
//               {plan.description
//                 .split(/[.،,]/) // تقسيم النص بناءً على النقطة، الفاصلة العربية (،) أو الفاصلة الإنجليزية (,)
//                 .map((feature) => feature.trim()) // تنظيف الفراغات الزائدة حول النصوص
//                 .filter((feature) => feature.length > 0) // تجاهل أي نصوص فارغة تنتج عن الفصل
//                 .map((feature, index) => (
//                   <Stack
//                     key={index}
//                     direction="row"
//                     spacing={1.5}
//                     sx={{ alignItems: "flex-start" }}
//                   >
//                     <Check
//                       sx={{
//                         color: "grey",
//                         fontSize: "1.2rem",
//                         mt: 0.3,
//                         pl: 0.5,
//                       }}
//                     />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "text.secondary",
//                         textAlign: "right",
//                         lineHeight: 1.5,
//                         fontWeight: 500,
//                       }}
//                     >
//                       {feature}
//                     </Typography>
//                   </Stack>
//                 ))}
//             </Stack>
//           </Stack>

//           <PriceSection
//             basePrice={plan.basePrice}
//             currentPrice={plan.currentPrice}
//             color={color}
//           />

//           {offer && (
//             <OfferBanner
//               title={offer.title}
//               description={offer.description}
//               endsAt={offer.endsAt}
//               color={color}
//             />
//           )}

//           <Button
//             fullWidth
//             size="large"
//             variant="contained"
//             color={color as any}
//           >
//             اختر هذه الخطة
//           </Button>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }
// PlanCard.tsx
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

  const defaultOffer = plan.publicOffers?.[0];

  // إدارة العرض المحدد للبطاقة (محدد افتراضياً إذا وجد عرض)
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(
    defaultOffer ? defaultOffer.offerId : null,
  );

  // العثور على كائن العرض المحدد حالياً
  const currentAppliedOffer = plan.publicOffers?.find(
    (o) => o.offerId === selectedOfferId,
  );

  // حساب السعر بناءً على تطبيق العرض من عدمه
  const displayPrice = currentAppliedOffer
    ? currentAppliedOffer.finalPrice
    : plan.basePrice;

  // التبديل بين تطبيق العرض وإلغائه
  const handleToggleOffer = (offerId: number) => {
    setSelectedOfferId((prev) => (prev === offerId ? null : offerId));
  };

  // عند الضغط على "اختر هذه الخطة"
  const handleSelectPlan = () => {
    const payload = {
      planId: plan.planId,
      offerId: selectedOfferId, // سيعود بـ offerId المختار أو null في حال تم إلغاء اختيار العرض
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
      {/* ظهور شريط الخصم العلوي عند تفعيل العرض */}
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
            {<IconHelper code={plan.code} lightColor={lightColor} />}
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

          {/* السعر المحدث ديناميكياً */}
          <PriceSection
            basePrice={plan.basePrice}
            currentPrice={displayPrice}
            color={color}
          />

          {/* مكون العرض مع إمكانية التحديد والتبديل */}
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
