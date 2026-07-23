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
            value={field.value}
            onChange={(value) => {
              if (!value) {
                field.onChange("");
                return;
              }
              const date = new Date(value);
              if (!isNaN(date.getTime())) {
                field.onChange(date.toISOString());
              } else {
                field.onChange("");
              }
            }}
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
          onChange={(value) => {
            if (!value) {
              field.onChange("");
              return;
            }
            // إضافة 3 ساعات ودقيقة واحدة لموازنة فروق الأوقات
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
              date.setHours(date.getHours() + 3);
              date.setMinutes(date.getMinutes() + 1);
              field.onChange(date.toISOString());
            } else {
              field.onChange("");
            }
          }}
        />
      )}
    />
  );
};

export default OfferDateFields;
