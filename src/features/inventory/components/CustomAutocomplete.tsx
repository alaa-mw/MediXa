// features/inventory/components/CustomAutocomplete.tsx
import React from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import textfieldStyle from "../../../shared/constants/textFieldStyle";

interface CustomAutocompleteProps {
  label: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Autocomplete
      options={options}
      value={value || null}
      onChange={(_, newValue) => {
        onChange(newValue || "");
      }}
      forcePopupIcon={true}
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
};
