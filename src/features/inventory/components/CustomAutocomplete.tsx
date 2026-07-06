// // features/inventory/components/CustomAutocomplete.tsx
// import React from "react";
// import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import ClearIcon from "@mui/icons-material/Clear";

// interface CustomAutocompleteProps {
//   label: string;
//   options: string[];
//   value: string;
//   onChange: (newValue: string) => void;
//   placeholder?: string;
// }

// export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
//   label,
//   options,
//   value,
//   onChange,
//   placeholder,
// }) => {
//   return (
//     <Autocomplete
//       options={options}
//       value={value || null}
//       onChange={(_, newValue) => {
//         onChange(newValue || "");
//       }}
      
//       forcePopupIcon={true}       
//       slotProps={{
//         popupIndicator: {
//           children: <KeyboardArrowDownIcon />,
//         },
//         clearIndicator: {
//           children: <ClearIcon fontSize="small" />,
//         },
//         paper: {
//           sx: {
//             borderRadius: "14px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//             mt: 1,
//             direction: "rtl",
//             [`& .${autocompleteClasses.option}`]: {
//               fontSize: "14px",
//               fontWeight: 500,
//               justifyContent: "flex-start",
//               borderRadius: "8px",
//               margin: "2px 5px",
//             },
//           },
//         },
//       }}
      
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           placeholder={placeholder}
//           variant="outlined"
//           sx={{
//             direction: "rtl",

//             "& .MuiOutlinedInput-root": {
//               backgroundColor: "#f1f5f9",
//               borderRadius: "14px",
//               paddingLeft: "14px !important",  
//               paddingRight: "14px !important", 
              
//               "& .MuiAutocomplete-endAdornment": {
//                 position: "absolute",
//                 left: "12px !important",       
//                 right: "auto !important",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "4px",                    
//                 flexDirection: "row",         
//               },

//               "& .MuiAutocomplete-clearIndicator": {
//                 margin: "0 !important",
//                 padding: "4px",
//                 order: 1,                      
//                 color: "#94a3b8",
//                 "&:hover": { color: "#ef4444" }
//               },

//               "& .MuiAutocomplete-popupIndicator": {
//                 margin: "0 !important",
//                 padding: "4px",
//                 order: 2,                      
//               },

//               "& fieldset": {
//                 borderColor: "transparent",
//                 borderRadius: "14px",
//               },
//               "&:hover fieldset": {
//                 borderColor: "#cbd5e1",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#0f766e",
//                 borderWidth: "1.5px",
//               },
//             },
            
//             "& .MuiOutlinedInput-input": {
//               paddingRight: "0px !important",
//               paddingLeft: "70px !important", 
//               textAlign: "right",
//             },
            
//             "& .MuiInputLabel-outlined": {
//               color: "#64748b",
//               right: "14px !important",
//               left: "auto !important",
//               transformOrigin: "top right",
//               transform: "translate(0, 16px) scale(1)", 
//               zIndex: 1,
//               pointerEvents: "none",
              
//               "&.MuiInputLabel-shrink": {
//                 transform: "translate(0, -6px) scale(0.75)",
//                 backgroundColor: "#ffffff", 
//                 padding: "0 6px",
//               },
//               "&.Mui-focused": {
//                 color: "#0f766e",
//               }
//             }
//           }}
//         />
//       )}
//     />
//   );
// };

// features/inventory/components/CustomAutocomplete.tsx
import React from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import textfieldStyle from "../../../shared/constants/textFieldStyle";

// استخدام Generics <T> لجعل الكود Type-safe تماماً بدون any
interface CustomAutocompleteProps<T> {
  label: string;
  options: T[];
  value: T | T[] | null; // يدعم كائن مفرد، مصفوفة كائنات، أو فارغ
  onChange: (newValue: T | T[] | null) => void;
  getOptionLabel: (option: T) => string; // دالة نمررها من الخارج لتحديد النص المعروض
  isOptionEqualToValue?: (option: T, value: T) => boolean; // لمطابقة الـ IDs
  placeholder?: string;
  multiple?: boolean;
}

export const CustomAutocomplete = <T,>({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  placeholder,
  multiple = false,
}: CustomAutocompleteProps<T>) => {
  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      value={value ?? (multiple ? [] : null)}
      onChange={(_, newValue) => onChange(newValue)}
      forcePopupIcon={true}
      
      slotProps={{
        popupIndicator: { children: <KeyboardArrowDownIcon /> },
        clearIndicator: { children: <ClearIcon fontSize="small" /> },
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
          sx={{
            direction: "rtl",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f1f5f9",
              borderRadius: "14px",
              // التبديل بين الـ padding بناءً على النمط لعدم تداخل الـ Chips
              paddingLeft: multiple ? "14px !important" : "14px !important",
              paddingRight: multiple ? "14px !important" : "14px !important",
              
              "& .MuiAutocomplete-endAdornment": {
                position: "absolute",
                left: "12px !important",
                right: "auto !important",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              },
              "& .MuiAutocomplete-clearIndicator": {
                margin: "0 !important",
                padding: "4px",
                order: 1,
                color: "#94a3b8",
                "&:hover": { color: "#ef4444" },
              },
              "& .MuiAutocomplete-popupIndicator": {
                margin: "0 !important",
                padding: "4px",
                order: 2,
                                color: "#00000066",

              },
              "& fieldset": { borderColor: "transparent", borderRadius: "14px" },
              "&:hover fieldset": { borderColor: "#cbd5e1" },
              "&.Mui-focused fieldset": { borderColor: "#0f766e", borderWidth: "1.5px" },
            },
            "& .MuiOutlinedInput-input": {
              // عند وجود خيارات متعددة نترك الـ padding الافتراضي للمكتبة لترتيب الـ Chips
              paddingLeft: multiple ? "0px !important" : "70px !important",
              paddingRight: "0px !important",
              textAlign: "right",
            },
            "& .MuiInputLabel-outlined": {
              color: "#64748b",
              right: "14px !important",
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
          }}
        />
      )}
    />
  );
};
