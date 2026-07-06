import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { arSA } from "date-fns/locale/ar-SA";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface CustomDatePickerFieldProps {
  value: string | null;
  onChange: (date: string) => void;
  minDate?: Date | string | null;
  disabled?: boolean;
}

export function CustomDatePickerField({
  value,
  onChange,
  minDate,
  disabled = false,
}: CustomDatePickerFieldProps) {
  
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
      }}
    >
      <DatePicker
        value={value ? new Date(value) : null}
        onChange={handleDateChange}
        minDate={getMinDate()}
        disabled={disabled}
        slotProps={{
          textField: {
            dir: "rtl",
            fullWidth: true, 
            variant: "outlined",
            size: "small",
            sx: {
              direction: "rtl",
              width: "100%", // ملء المساحة المخصصة له من الأب فقط

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

                "& fieldset": {
                  borderColor: "#cbd5e1",
                  borderRadius: "6px",
                },
                "&:hover fieldset": {
                  borderColor: "#94a3b8",
                },
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
            },
          },
          actionBar: {
            actions: ["today"],
            sx: { flexDirection: "row-reverse" },
          },
        }}
        sx={{
          width: "100%", // الاعتماد على عرض حاوية الأب المرنة
          "& .MuiInputBase-root": {
            "& .MuiInputAdornment-root": {
              marginLeft: 0,
              marginRight: "4px", 
              height: "auto",
              alignSelf: "center", 
            },
            "& .MuiIconButton-root": {
              padding: "4px", 
            }
          },
        }}
      />
    </LocalizationProvider>
  );
}

