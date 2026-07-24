import * as yup from "yup";
import type {
  DiscountType,
  OfferFormModel,
  OfferScope,
} from "../../../types/offerTypes";
import { Box, Stack, Typography } from "@mui/material";
import OfferFormCard from "./OfferFormCard";

const schema: yup.ObjectSchema<OfferFormModel> = yup.object({
  code: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  discountType: yup
    .mixed<DiscountType>()
    .oneOf(["PERCENTAGE", "FIXED_AMOUNT"])
    .required(),
  scope: yup.mixed<OfferScope>().oneOf(["PRIVATE", "PUBLIC"]).required(),
  discountValue: yup.number().required(),
  startsAt: yup.string().required(),
  endsAt: yup.string().required(),
});

interface Props {
  isPending : boolean
  onSubmit: (data: OfferFormModel) => void;
}

const OfferForm = ({isPending, onSubmit }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      {/* 2. وضعنا العنوان ثانياً في الكود: ليدفعه المتصفح في نظام الـ RTL إلى أقصى اليمين تماماً موازاةً للعنوان العلوي */}
      <Stack
        sx={{
          minWidth: { md: "180px" },
          mt: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}
        >
          إضافة عرض جديد
        </Typography>
      </Stack>
      {/* 1. وضعنا الكارد أولاً في الكود: ليتمدد ويأخذ المساحة الكاملة على اليسار بين الخطين الحمرين */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          p: 0,
          mt: 2,
        }}
      >
        <OfferFormCard isPending={isPending} onSubmit={onSubmit} schema={schema} />
      </Box>
    </Box>
  );
};

export default OfferForm;
