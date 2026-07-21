import Grid from "@mui/material/Grid";
import { Controller, type Control } from "react-hook-form";
import type { PharmacyAssignmentModel } from "../../../types/offerTypes";
import FormTextField from "../../FormTextField";
import { Stack } from "@mui/material";
import { RTLDatePicker } from "../../../../../shared/layout/RTLDatePicker";

interface Props {
  control: Control<PharmacyAssignmentModel>;
}

const AssignmentFields = ({ control }: Props) => {
  return (
    <Grid container spacing={3}>
      {/* العمود الأول */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <OfferDateFields2 control={control} isEndDate={false} />
        </Stack>
      </Grid>

      {/* العمود الثاني */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <OfferDateFields2 control={control} isEndDate={true} />
        </Stack>
      </Grid>

      {/* العمود الثالث */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Controller
          name="note"
          control={control}
          render={({ field, fieldState }) => (
            <FormTextField
              label="سبب المنح"
              multiline
              rows={1.5}
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default AssignmentFields;

interface Props2 {
  control: Control<PharmacyAssignmentModel>;
  isEndDate: boolean;
}

const OfferDateFields2 = ({ control, isEndDate }: Props2) => {
  if (isEndDate) {
    return (
      <Controller
        name="validUntil"
        control={control}
        render={({ field }) => (
          <RTLDatePicker
            label="تاريخ توقف العرض"
            value={field.value}
            onChange={(value) => field.onChange(value?.toString())}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name="validFrom"
      control={control}
      render={({ field }) => (
        <RTLDatePicker
          label="تاريخ بدء السريان"
          value={field.value}
          onChange={(value) => field.onChange(value?.toString())}
        />
      )}
    />
  );
};
