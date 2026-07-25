// // features/inventory/components/CustomTextField.tsx
// import React from "react";
// import TextField from "@mui/material/TextField";

// interface CustomTextFieldProps {
//   label: string;
//   value: string | number;
//   onChange: (val: string) => void;
//   placeholder?: string;
//   type?: "text" | "number";
//   fullWidth?: boolean;
//   padding?: string;
// }

// export const CustomTextField: React.FC<CustomTextFieldProps> = ({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   fullWidth = true,
//   padding = "16px",
// }) => {
//   return (
//     <TextField
//       fullWidth={fullWidth}
//       type={type}
//       label={label}
//       placeholder={placeholder}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       variant="outlined" 
//       sx={{
//         direction: "rtl",
        
//         "& .MuiOutlinedInput-root": {
//           backgroundColor: "#f1f5f9",
//           borderRadius: "14px",
//           transition: "all 0.2s ease-in-out",
//           paddingRight: "0px !important",
//           paddingLeft: "0px !important",

//           "& fieldset": {
//             borderColor: "transparent",
//             borderRadius: "14px",
//             transition: "all 0.2s ease-in-out",
//           },
//           "&:hover fieldset": {
//             borderColor: "#cbd5e1",
//           },
//           "&.Mui-focused fieldset": {
//             borderColor: "#0f766e",
//             borderWidth: "1.5px",
//           },
//         },

//         "& .MuiInputLabel-outlined": {
//           color: "#64748b",
//           right: "16px !important", 
//           left: "auto !important",
//           transformOrigin: "top right",
//           transform: "translate(0, 16px) scale(1)", 
//           zIndex: 1,
//           pointerEvents: "none",
          
//           "&.MuiInputLabel-shrink": {
//             transform: "translate(0, -6px) scale(0.75)", 
//             backgroundColor: "#ffffff", 
//             padding: "0 6px",
//           },
//           // لون الـ Label عند التركيز
//           "&.Mui-focused": {
//             color: "#0f766e",
//           }
//         },

//         "& .MuiOutlinedInput-input": {
//           textAlign: "right",
//           paddingRight: "16px !important",
//           paddingLeft: "16px !important",
//           height: "1.4375em", 
//           padding: padding,
//         },
//       }}
//     />
//   );
// };
// features/inventory/components/CustomTextField.tsx
// features/inventory/components/CustomTextField.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import textfieldStyle from "../constants/textFieldStyle";

interface CustomTextFieldProps {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  fullWidth?: boolean;
  padding?: string;
  error?: boolean;
  helperText?: string; // أضفنا هذه الخاصية لعرض نص الخطأ أسفل الحقل

  disabled?: boolean;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  fullWidth = true,
  padding = "16px",
  error = false,
  helperText,
  disabled = false,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      error={error} 
      helperText={helperText} // تمرير نص الخطأ
      sx={{
        direction: "rtl",
        
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#f1f5f9",
          borderRadius: "14px",
          transition: "all 0.2s ease-in-out",
          paddingRight: "0px !important",
          paddingLeft: "0px !important",

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
          // === التنسيقات الصارمة لحالة الخطأ ===
          "&.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
            borderWidth: "1.5px !important",
          },
          "&:hover.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
          },
          "&.Mui-focused.Mui-error fieldset": {
            borderColor: "#d32f2f !important",
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
          "&.Mui-focused": {
            color: "#0f766e",
          },
          "&.Mui-error": {
            color: "#d32f2f !important",
          }
        },

        "& .MuiOutlinedInput-input": {
          textAlign: "right",
          paddingRight: "16px !important",
          paddingLeft: "16px !important",
          height: "1.4375em", 
          padding: padding,
        },
        
        // تنسيق نص الخطأ أسفل الحقل
        "& .MuiFormHelperText-root": {
          textAlign: "right",
          marginRight: 0,
          marginLeft: 0,
          fontWeight: 600,
          fontSize: "12px",
          color: "#d32f2f",
        }
      }}
    />
  );
};
