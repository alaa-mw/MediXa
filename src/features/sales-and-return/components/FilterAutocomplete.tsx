import React from "react";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";

export interface AutocompleteOption {
  id: number | string;
  name: string;
}

interface FilterAutocompleteProps {
  options: AutocompleteOption[];
  value: AutocompleteOption | null;
  onChange: (newValue: AutocompleteOption | null) => void;
  placeholder?: string;
}

export const FilterAutocomplete: React.FC<FilterAutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option?.name || ""}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      forcePopupIcon={true}
      slotProps={{
        popupIndicator: {
          children: <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#64748b" }} />,
        },
        clearIndicator: {
          children: <ClearIcon sx={{ fontSize: 16 }} />,
        },
        paper: {
          sx: {
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            mt: 0.5,
            direction: "rtl",
            [`& .${autocompleteClasses.option}`]: {
              fontSize: "13px",
              minHeight: 34,
              justifyContent: "flex-start",
              borderRadius: "6px",
              margin: "2px 6px",
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          sx={{
            direction: "rtl",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              fontSize: "13px",
              height: "32px",
              paddingLeft: "10px !important",
              paddingRight: "10px !important",

              "& .MuiAutocomplete-endAdornment": {
                position: "absolute",
                left: "8px !important",
                right: "auto !important",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                flexDirection: "row",
              },

              "& .MuiAutocomplete-clearIndicator": {
                margin: 0,
                padding: "2px",
                order: 1,
                color: "#94a3b8",
                "&:hover": { color: "#ef4444" },
              },

              "& .MuiAutocomplete-popupIndicator": {
                margin: 0,
                padding: "2px",
                order: 2,
              },

              "& fieldset": {
                borderColor: "#d1d5db",
              },

              "&:hover fieldset": {
                borderColor: "#9ca3af",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
                borderWidth: 1,
              },
            },

            "& .MuiOutlinedInput-input": {
              padding: "6px 8px",
              paddingLeft: "52px !important",
              textAlign: "right",
              fontSize: "13px",
            },

            "& .MuiOutlinedInput-input::placeholder": {
              color: "#64748b",
              opacity: 1,
            },
          }}
        />
      )}
    />
  );
};


// import React from "react";
// import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import ClearIcon from "@mui/icons-material/Clear";
// import CircularProgress from "@mui/material/CircularProgress";

// export interface AutocompleteOption {
//   id: number | string;
//   name: string;
// }

// interface FilterAutocompleteProps {
//   options: AutocompleteOption[];
//   value: AutocompleteOption | null;
//   onChange: (newValue: AutocompleteOption | null) => void;
//   placeholder?: string;
//   loading: boolean;
//   inputValue: string;
//   onInputChange: (value: string) => void;
//   onLoadMore: () => void;
// }

// export const FilterAutocomplete: React.FC<FilterAutocompleteProps> = ({
//   options,
//   value,
//   onChange,
//   placeholder,
//   loading,
//   inputValue,
//   onInputChange,
//   onLoadMore,
// }) => {
//   // دالة مراقبة التمرير (Scroll) لطلب المزيد من البيانات
//   const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
//     const listboxNode = event.currentTarget;
//     if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 5) {
//       onLoadMore();
//     }
//   };

//   return (
//     <Autocomplete
//       options={options}
//       value={value}
//       onChange={(_, newValue) => onChange(newValue)}
//       filterOptions={(x) => x}
//       inputValue={inputValue}
//       // التحقق من reason مهم جداً لمنع حلقة التحديث اللانهائية
//       onInputChange={(_, newInputValue, reason) => {
//         if (reason === "input") {
//           onInputChange(newInputValue);
//         }
//       }}
//       getOptionLabel={(option) => option?.name || ""}
//       isOptionEqualToValue={(option, val) => option.id === val.id}
//       forcePopupIcon={true}
//       loading={loading}
      
//       // الهيكل الموحد لـ MUI v7 للتحكم بالمكونات الفرعية
//       slotProps={{
//         listbox: {
//           onScroll: handleScroll,
//         },
//         popupIndicator: {
//           children: <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#64748b" }} />,
//         },
//         clearIndicator: {
//           children: <ClearIcon sx={{ fontSize: 16 }} />,
//         },
//         paper: {
//           sx: {
//             borderRadius: "10px",
//             boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//             mt: 0.5,
//             direction: "rtl",
//             [`& .${autocompleteClasses.option}`]: {
//               fontSize: "13px",
//               minHeight: 34,
//               justifyContent: "flex-start",
//               borderRadius: "6px",
//               margin: "2px 6px",
//             },
//           },
//         },
//       }}
      
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           placeholder={placeholder}
//           variant="outlined"
//           size="small"
//           // دمج endAdornment بطريقة MUI v7 المعتمدة
//           slotProps={{
//             input: {
//               ...params.slotProps?.input,
//               endAdornment: (
//                 <>
//                   {loading ? (
//                     <CircularProgress color="inherit" size={16} sx={{ ml: 1 }} />
//                   ) : null}
//                   {params.slotProps?.input?.endAdornment}
//                 </>
//               ),
//             },
//           }}
//           sx={{
//             direction: "rtl",
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "8px",
//               backgroundColor: "#ffffff",
//               fontSize: "13px",
//               height: "32px",
//               paddingLeft: "10px !important",
//               paddingRight: "10px !important",

//               "& .MuiAutocomplete-endAdornment": {
//                 position: "absolute",
//                 left: "8px !important",
//                 right: "auto !important",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "2px",
//                 flexDirection: "row",
//               },

//               "& .MuiAutocomplete-clearIndicator": {
//                 margin: 0,
//                 padding: "2px",
//                 order: 1,
//                 color: "#94a3b8",
//                 "&:hover": { color: "#ef4444" },
//               },

//               "& .MuiAutocomplete-popupIndicator": {
//                 margin: 0,
//                 padding: "2px",
//                 order: 2,
//               },

//               "& fieldset": {
//                 borderColor: "#d1d5db",
//               },

//               "& :hover fieldset": {
//                 borderColor: "#9ca3af",
//               },

//               "&.Mui-focused fieldset": {
//                 borderColor: "#1976d2",
//                 borderWidth: 1,
//               },
//             },

//             "& .MuiOutlinedInput-input": {
//               padding: "6px 8px",
//               paddingLeft: "52px !important",
//               textAlign: "right",
//               fontSize: "13px",
//               height: "100%",
//               boxSizing: "border-box",
//             },

//             "& .MuiOutlinedInput-input::placeholder": {
//               color: "#64748b",
//               opacity: 1,
//             },
//           }}
//         />
//       )}
//     />
//   );
// };