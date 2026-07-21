import type { OfferFormModel } from "../../../types/offerTypes";
import { Controller, type Control } from "react-hook-form";
import {
  MenuItem,
  TextField,
  type SxProps,
  type TextFieldProps,
  type Theme,
} from "@mui/material";
import { DiscountTypes } from "../../../types/discountTypes";
import FormTextField from "../../FormTextField";
import textfieldStyle from "../../../../../shared/constants/textFieldStyle";

interface Props {
  control: Control<OfferFormModel>;
  isValueField: boolean;
}

const OfferDiscountFields = ({ control, isValueField }: Props) => {
  if (isValueField) {
    return (
      <Controller
        name="discountValue"
        control={control}
        render={({ field, fieldState }) => (
          <FormTextField
            label="قيمة الخصم"
            type="number"
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
      name="discountType"
      control={control}
      // ✅ استخراج fieldState لقراءة الخطأ
      render={({ field, fieldState }) => (
        <FormSelect
          label="نوع الخصم"
          options={DiscountTypes}
          {...field}
          // ✅ تمرير الخصائص للـ TextField الداخلي
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default OfferDiscountFields;

interface Option {
  label: string;
  value: string | number;
}

interface TProps extends Omit<TextFieldProps, "select"> {
  options: Option[];
}
const FormSelect = ({ options, sx, ...props }: TProps) => {
  return (
    <TextField
      select
      fullWidth
      size="small"
      {...props}
      // 🛠️ التعديل هنا: تمرير الـ sx كمصفوفة يحل مشكلة الـ Type نهائياً ويمنع تداخل الستايلات المشتركة
      sx={
        [
          ...(Array.isArray(textfieldStyle)
            ? textfieldStyle
            : [textfieldStyle]),
          {
            // إصلاح أيقونة السهم الداخلي للـ Select
            "& .MuiSelect-icon": {
              right: "auto !important",
              left: "12px !important",
            },
            // تعديل الـ padding لحجم الخط والنص الداخلي
            "& .MuiOutlinedInput-input": {
              paddingLeft: "10px !important",
              paddingRight: "14px !important",
              textAlign: "right",
            },
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ] as SxProps<Theme>
      }
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
