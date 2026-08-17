import type { OfferFormModel } from "../../../types/offerTypes";
import { Controller, type Control } from "react-hook-form";
import {
  MenuItem,
  TextField,
  type SxProps,
  type TextFieldProps,
  type Theme,
  type SelectProps,
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
      render={({ field, fieldState }) => (
        <FormSelect
          label="نوع الخصم"
          options={DiscountTypes}
          {...field}
          value={field.value ?? ""}
          onChange={(event) => field.onChange(event.target.value)}
          displayEmpty
          SelectProps={{
            displayEmpty: true,
            renderValue: (selected: unknown) => {
              if (!selected) return "اختر نوع الخصم";
              const option = DiscountTypes.find(
                (item) => item.value === selected,
              );
              return option?.label ?? "اختر نوع الخصم";
            },
          }}
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
  displayEmpty?: boolean;
  SelectProps?: SelectProps;
}

const FormSelect = ({ options, sx, ...props }: TProps) => {
  return (
    <TextField
      select
      fullWidth
      size="small"
      {...props}
      sx={
        [
          ...(Array.isArray(textfieldStyle)
            ? textfieldStyle
            : [textfieldStyle]),
          {
            "& .MuiSelect-icon": {
              right: "auto !important",
              left: "12px !important",
              color: "gray",
            },
            // إرجاع الـ input لوضعه الطبيعي بدون padding زائد
            "& .MuiOutlinedInput-input": {
              paddingLeft: "10px !important",
              paddingRight: "14px !important",
              textAlign: "center",
            },
            // توسيط النص الافتراضي (Placeholder / Empty value) عمودياً في المنتصف
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              height: "100%",
            },

            "& .MuiInputLabel-root": {
              transform: "translate(2px, 10px) scale(1)",
              "&.MuiInputLabel-shrink": {
                transform: "translate(4px, -9px) scale(0.75)",
              },
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
