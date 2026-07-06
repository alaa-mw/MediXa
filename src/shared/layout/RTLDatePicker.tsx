import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { arSA } from "date-fns/locale/ar-SA";
import { format } from "date-fns";
import { Dayjs } from "dayjs";

interface RTLDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  label?: string;
  minDate?: Date | string | null;
  disabled?: boolean;
  fullWidth?: boolean;
  padding?: string;
}

export function RTLDatePicker({
  value,
  onChange,
  label,
  minDate,
  disabled = false,
  fullWidth = true,
  padding = "16px",
}: RTLDatePickerProps) {
  const handleDateChange = (date: Date | Dayjs | null) => {
    if (date) {
      const d = new Date(date.toString());
      const formattedDate = format(d, "yyyy-MM-dd");
      onChange(formattedDate);
    }
  };

  const getMinDate = () => {
    if (!minDate) return undefined;
    return minDate instanceof Date ? minDate : new Date(minDate);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={arSA}
      localeText={{
        datePickerToolbarTitle: "اختيار التاريخ",
        previousMonth: "الشهر السابق",
        nextMonth: "الشهر التالي",
        cancelButtonLabel: "إلغاء",
        okButtonLabel: "تأكيد",
        todayButtonLabel: "اليوم",
        openPreviousView: "فتح العرض السابق",
        openNextView: "فتح العرض التالي",
        clearButtonLabel: "مسح",
      }}
    >
      <DatePicker
        label={label}
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        minDate={getMinDate()}
        disabled={disabled}
        slotProps={{
          textField: {
            dir: "rtl",
            fullWidth: fullWidth,
            variant: "outlined",
            sx: {
              direction: "rtl",

              // Input Root (Container) Styles
              "& .MuiPickersOutlinedInput-root": {
                backgroundColor: "#f1f5f9",
                borderRadius: "14px",
                transition: "all 0.2s ease-in-out",
                // Adjusted padding to allow room for the date picker icon button
                paddingRight: "0px !important",
                paddingLeft: "8px !important",

                "& fieldset": {
                  borderColor: "transparent",
                  borderRadius: "14px",
                  transition: "all 0.2s ease-in-out",
                },
                "&:hover fieldset": {
                  borderColor: "#cbd5e1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0f766e",
                  borderWidth: "1.5px",
                },
              },

              // Label Styles
              "& .MuiInputLabel-outlined": {
                color: "#64748b",
                right: "16px !important",
                left: "auto !important",
                transformOrigin: "top right",
                transform: "translate(0, 16px) scale(1)",
                zIndex: 1,
                pointerEvents: "none",

                "&.MuiInputLabel-shrink": {
                  transform: "translate(0, -6px) scale(0.75)",
                  backgroundColor: "#ffffff",
                  padding: "0 6px",
                },
                "&.Mui-focused": {
                  color: "#0f766e",
                },
              },

              // Try this - target all possible class combinations
              "& .MuiPickersOutlinedInput-sectionsContainer, & [class*='MuiPickersOutlinedInput-sectionsContainer']":
                {
                  padding: `${padding} !important`,
                  textAlign: "right",
                },
            },
          },
          actionBar: {
            actions: ["today"],
            sx: {
              flexDirection: "row-reverse",
            },
          },
        }}
        sx={{
          // Global icon wrapper overrides specific to the date picker input layout
          "& .MuiPickersInputBase-root": {
            "& .MuiInputAdornment-root": {
              marginLeft: "8px",
              marginRight: 0,
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
