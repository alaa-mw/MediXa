import {
  Card,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormTextField from "../../FormTextField";
import PrimaryButton from "../../PrimaryButton";
import OfferBasicFields from "./OfferBasicFields";
import OfferDateFields from "./OfferDateFiled";
import OfferDiscountFields from "./OfferDiscountFiled";
import type { OfferFormModel } from "../../../types/offerTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check } from "@mui/icons-material";

interface Props {
  isPending: boolean;
  onSubmit: (data: OfferFormModel) => void;
  schema: OfferFormModel | any;
}

const OfferFormCard = ({ isPending, onSubmit, schema }: Props) => {
  const { control, handleSubmit } = useForm<OfferFormModel>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
      discountType: "FIXED_AMOUNT",
      scope: "PRIVATE",
      discountValue: "" as any,
      startsAt: "",
      endsAt: "",
    },
  });

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        flexGrow: 1,
        alignSelf: "stretch",
        p: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        boxSizing: "border-box",
        pl: 5.5,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          mb: 3,
        }}
      >
        <Controller
          name="scope"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              value={field.value}
              exclusive
              onChange={(_, value) => value && field.onChange(value)}
              size="small"
              sx={{
                gap: 2, // المسافة بين الزرين ليفصل كل زر عن الآخر تماماً وتظهر حوافهما سليمة
                display: "flex",
                // إجبار كل زر على الاحتفاظ بحواف دائرية مستقلة ومظهر Outlined منفصل
                "& .MuiToggleButtonGroup-grouped": {
                  borderRadius: "10px !important5",
                  border: "1.5px solid #9d7ea6 !important",
                  mx: 0,
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              <ToggleButton
                value="PUBLIC"
                sx={{
                  px: 3,
                  py: 0.6, // ارتفاع أقل للزر
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  color: "#9d7ea6",
                  backgroundColor: "transparent",
                  display: "flex",
                  gap: 1,
                  borderRadius: "10px !important",
                  borderColor: "#9d7ea6",
                  "&:hover": {
                    backgroundColor: "rgba(108, 63, 137, 0.04)",
                    borderColor: "#9d7ea6",
                  },
                  "&.Mui-selected": {
                    color: "#9d7ea6",
                    backgroundColor: "transparent",
                    borderColor: "#9d7ea6",
                    "&:hover": {
                      backgroundColor: "rgba(108, 63, 137, 0.04)",
                      borderColor: "#9d7ea6",
                    },
                  },
                }}
              >
                {field.value === "PUBLIC" && <Check fontSize="small" />}
                عام (Public)
              </ToggleButton>

              <ToggleButton
                value="PRIVATE"
                sx={{
                  px: 3,
                  py: 0.6, // ارتفاع أقل للزر متطابق مع الأول
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  color: "#9d7ea6",
                  backgroundColor: "transparent",
                  display: "flex",
                  gap: 1,
                  borderRadius: "10px !important",
                  borderColor: "#9d7ea6",
                  "&:hover": {
                    backgroundColor: "rgba(108, 63, 137, 0.04)",
                    borderColor: "#9d7ea6",
                  },
                  "&.Mui-selected": {
                    color: "#9d7ea6",
                    backgroundColor: "transparent",
                    borderColor: "#9d7ea6",
                    "&:hover": {
                      backgroundColor: "rgba(108, 63, 137, 0.04)",
                      borderColor: "#9d7ea6",
                    },
                  },
                }}
              >
                {field.value === "PRIVATE" && <Check fontSize="small" />}
                خاص (Private)
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <OfferBasicFields control={control} isTitleField={false} />
            <OfferDiscountFields control={control} isValueField={false} />
            <OfferDateFields control={control} isEndDate={false} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <OfferBasicFields control={control} isTitleField={true} />
            <OfferDiscountFields control={control} isValueField={true} />
            <OfferDateFields control={control} isEndDate={true} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <FormTextField
                label="معلومات العرض"
                multiline
                rows={5.8}
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <PrimaryButton
        sx={{ mt: 4 }}
        disabled={isPending}
        onClick={handleSubmit(onSubmit)}
      >
        {isPending ? "جاري الإضافة..." : "إضافة العرض"}
      </PrimaryButton>
    </Card>
  );
};

export default OfferFormCard;
