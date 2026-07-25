/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { arSA } from "date-fns/locale/ar-SA";
import { format } from "date-fns";
import { Dayjs } from "dayjs";

export interface UnifiedDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  label?: string;
  minDate?: Date | string | null;
  disabled?: boolean;
  fullWidth?: boolean;
  padding?: string;
  variant?: "rtl" | "compact"; // two design ways
  size?: "small" | "medium";
}

export default function UnifiedDatePicker({
  value,
  onChange,
  label,
  minDate,
  disabled = false,
  fullWidth = true,
  padding = "16px",
  variant = "rtl",
  size = "medium",
}: UnifiedDatePickerProps) {
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

  const rtlStyles = {
    direction: "rtl",
    "& .MuiPickersOutlinedInput-root": {
      backgroundColor: "#f1f5f9",
      borderRadius: "14px",
      transition: "all 0.2s ease-in-out",
      paddingRight: "0px !important",
      paddingLeft: "8px !important",
      "& fieldset": {
        borderColor: "transparent",
        borderRadius: "14px",
        transition: "all 0.2s ease-in-out",
      },
      "&:hover fieldset": { borderColor: "#cbd5e1" },
      "&.Mui-focused fieldset": {
        borderColor: "#0f766e",
        borderWidth: "1.5px",
      },
    },
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
      "&.Mui-focused": { color: "#0f766e" },
    },
    "& .MuiPickersOutlinedInput-sectionsContainer, & [class*='MuiPickersOutlinedInput-sectionsContainer']":
      {
        padding: `${padding} !important`,
        textAlign: "right",
      },
  } as any;

  const compactStyles = {
    direction: "rtl",
    width: "100%",
    "& .MuiPickersOutlinedInput-root": {
      backgroundColor: "transparent",
      borderRadius: "6px",
      transition: "all 0.2s ease-in-out",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
      paddingRight: "8px !important",
      paddingLeft: "4px !important",
      "& fieldset": { borderColor: "#cbd5e1", borderRadius: "6px" },
      "&:hover fieldset": { borderColor: "#94a3b8" },
      "&.Mui-focused fieldset": {
        borderColor: "#0f766e",
        borderWidth: "1.2px",
      },
    },
    "& .MuiPickersOutlinedInput-sectionsContainer, & [class*='MuiPickersOutlinedInput-sectionsContainer']":
      {
        padding: "0px !important",
        fontSize: "12px",
        textAlign: "right",
        display: "flex",
        alignItems: "center",
        height: "100%",
      },
  } as any;

  const textFieldSx = variant === "rtl" ? rtlStyles : compactStyles;

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
            fullWidth,
            variant: "outlined",
            size: size,
            sx: textFieldSx,
          },
          actionBar: {
            actions: ["today"],
            sx: { flexDirection: "row-reverse" },
          },
        }}
        sx={{
          width: fullWidth ? "100%" : undefined,
          "& .MuiInputBase-root": {
            "& .MuiInputAdornment-root": {
              marginLeft: variant === "rtl" ? "8px" : 0,
              marginRight: variant === "rtl" ? 0 : "4px",
            },
            "& .MuiIconButton-root": { padding: "4px" },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export { UnifiedDatePicker };
