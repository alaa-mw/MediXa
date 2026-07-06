import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import StyledPaper from "./StylePaper";
import type { CustomAutocompleteWithPaginationProps } from "./pagination-types";
import textfieldStyle from "../../constants/textFieldStyle";

function CustomAutocompleteWithPagination<T>(
  props: CustomAutocompleteWithPaginationProps<T>,
) {
  const {
    label,
    placeholder,
    options,
    value,
    loading,
    pagination,
    getOptionLabel,
    isOptionEqualToValue,
    onChange,
    onSearch,
    onPageChange,
    onQuickAdd,
    noOptionsText = "لا توجد بيانات",
  } = props;

  return (
    <Autocomplete<T, false, false, false>
      options={options}
      value={value || null} // لضمان عدم حدوث مشاكل عند مسح القيمة
      loading={loading}
      noOptionsText={noOptionsText}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      // الفلترة والبحث يتم استدعاؤهما فقط عندما يقوم المستخدم بالكتابة الفعلية
      onInputChange={(_, newInputValue, reason) => {
        if (reason === "input" || reason === "clear") {
          onSearch?.(newInputValue);
        }
      }}
      forcePopupIcon
      slots={{
        paper: ({ children }) => (
          <StyledPaper
            pagination={pagination}
            onPageChange={onPageChange}
            onQuickAdd={onQuickAdd}
          >
            {children}
          </StyledPaper>
        ),
      }}
      slotProps={{
        popupIndicator: {
          children: <KeyboardArrowDownIcon />,
        },
        clearIndicator: {
          children: <ClearIcon fontSize="small" />,
        },
        paper: {
          sx: {
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            mt: 1,
            direction: "rtl",
            [`& .${autocompleteClasses.option}`]: {
              fontSize: "14px",
              fontWeight: 500,
              justifyContent: "flex-start",
              borderRadius: "8px",
              margin: "2px 5px",
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          sx={textfieldStyle}
        />
      )}
    />
  );
}

export default CustomAutocompleteWithPagination;
