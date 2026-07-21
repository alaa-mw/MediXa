import { Controller, type Control } from "react-hook-form";
import type { OfferFormModel } from "../../../types/offerTypes";
import FormTextField from "../../FormTextField";

interface Props {
  control?: Control<OfferFormModel>;
  isTitleField: boolean;
}

const OfferBasicFields = ({ control, isTitleField }: Props) => {
  if (isTitleField) {
    return (
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <FormTextField
            label="عنوان العرض"
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name="code"
      control={control}
      render={({ field, fieldState }) => (
        <FormTextField
          label="رمز العرض"
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default OfferBasicFields;
{
  /* <Grid sx={{ md: 12 }}>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <FormTextField
              label="وصف العرض"
              multiline
              minRows={3}
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid> */
}
