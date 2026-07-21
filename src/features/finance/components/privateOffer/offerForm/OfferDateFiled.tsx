import { Controller, type Control } from "react-hook-form";
import type { OfferFormModel } from "../../../types/offerTypes";
import { RTLDatePicker } from "../../../../../shared/layout/RTLDatePicker";

interface Props {
  control?: Control<OfferFormModel>;
  isEndDate: boolean;
}

const OfferDateFields = ({ control, isEndDate }: Props) => {
  if (isEndDate) {
    return (
      <Controller
        name="endsAt"
        control={control}
        render={({ field }) => (
          <RTLDatePicker
            label="تاريخ انتهاء العرض"
            value={
              field.value
              // ? new Date(field.value).toString()
              // : new Date().toString()
            }
            onChange={(value) => field.onChange(value?.toString())}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name="startsAt"
      control={control}
      render={({ field }) => (
        <RTLDatePicker
          label="تاريخ بدء العرض"
          value={field.value}
          //   field.value
          //     ? new Date(field.value).toString()
          //     : new Date().toString()
          // }
          onChange={(value) => field.onChange(value?.toString())}
        />
      )}
    />
  );
};

export default OfferDateFields;
