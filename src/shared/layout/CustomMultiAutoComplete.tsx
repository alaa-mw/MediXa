// shared/layout/CustomMultiAutocompleteWithPagination.tsx
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import type { PaginationData } from "./CustomAutoCompleteWithPagination/pagination-types";
import StyledPaper from "./CustomAutoCompleteWithPagination/StylePaper";
import textfieldStyle from "../constants/textFieldStyle";

interface CustomMultiAutocompleteWithPaginationProps<T> {
  label: string;
  placeholder?: string;
  options: T[];
  value: T[];
  loading?: boolean;
  pagination: PaginationData;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  onChange: (value: T[]) => void;
  onSearch?: (value: string) => void;
  onPageChange: (page: number) => void;
  onQuickAdd?: () => void;
  noOptionsText?: React.ReactNode;
}

function CustomMultiAutocompleteWithPagination<T>(
  props: CustomMultiAutocompleteWithPaginationProps<T>,
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
    <Autocomplete<T, true, false, false>
      multiple // تفعيل التحديد المتعدد بشكل صارم
      options={options}
      value={value}
      loading={loading}
      noOptionsText={noOptionsText}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
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
        listbox: {
          sx: {
            maxHeight: 250,
            overflowY: "auto",
          },
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

export default CustomMultiAutocompleteWithPagination;
