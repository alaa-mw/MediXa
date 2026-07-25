import Grid from "@mui/material/Grid";
import { Controller, type Control } from "react-hook-form";
import type { PharmacyAssignmentModel } from "../../../types/offerTypes";
import FormTextField from "../../FormTextField";
import { Box } from "@mui/material";

interface Props {
  control: Control<PharmacyAssignmentModel>;
}

const AssignmentFields = ({ control }: Props) => {
  return (
    <Box sx={{ width: "100%", ml: 30 }}>
      {/* 1. استخدام Grid container لتوزيع العناصر بشكل أفقي */}
      <Grid container spacing={2}>
        {/* الحقل الأول: سبب المنح */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="grantReason"
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

        {/* الحقل الثاني: ملاحظات إضافية (تم تصحيح الـ name إلى note) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => (
              <FormTextField
                label="ملاحظات إضافية"
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
    </Box>
  );
};

export default AssignmentFields;
