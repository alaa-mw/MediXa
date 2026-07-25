// const textfieldStyle = {
//   direction: "rtl",

//   "& .MuiOutlinedInput-root": {
//     backgroundColor: "#f1f5f9",
//     borderRadius: "14px",
//     transition: "all 0.2s ease-in-out",
//     paddingRight: "0px !important",
//     paddingLeft: "0px !important",

//     "& fieldset": {
//       borderColor: "transparent",
//       borderRadius: "14px",
//       transition: "all 0.2s ease-in-out",
//     },
//     "&:hover fieldset": {
//       borderColor: "#cbd5e1",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#0f766e",
//       borderWidth: "1.5px",
//     },
//   },

//   "& .MuiInputLabel-outlined": {
//     color: "#64748b",
//     right: "16px !important",
//     left: "auto !important",
//     transformOrigin: "top right",
//     transform: "translate(0, 16px) scale(1)",
//     zIndex: 1,
//     pointerEvents: "none",

//     "&.MuiInputLabel-shrink": {
//       transform: "translate(0, -6px) scale(0.75)",
//       backgroundColor: "#ffffff",
//       padding: "0 6px",
//     },
//     // لون الـ Label عند التركيز
//     "&.Mui-focused": {
//       color: "#0f766e",
//     },
//   },

//   "& .MuiOutlinedInput-input": {
//     textAlign: "right",
//     paddingRight: "16px !important",
//     paddingLeft: "16px !important",
//     height: "1.4375em",
//     padding: "16.5px 14px",
//   },

//   "& .MuiAutocomplete-endAdornment": {
//     right: "auto",
//     left: "8px",
//   },
// };

// export default textfieldStyle;
const textfieldStyle = {
  direction: "rtl",

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f1f5f9",
    borderRadius: "14px",
    paddingLeft: "14px !important",
    paddingRight: "14px !important",

    "& .MuiAutocomplete-endAdornment": {
      position: "absolute",
      left: "12px !important",
      right: "auto !important",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      flexDirection: "row",
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
    },

    "& fieldset": {
      borderColor: "transparent",
      borderRadius: "14px",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0f766e",
      borderWidth: "1.5px",
    },
  },

  "& .MuiOutlinedInput-input": {
    paddingRight: "0px !important",
    paddingLeft: "70px !important",
    textAlign: "right",
    "&[type='number']": {
      paddingLeft: "9px !important",
    },
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
    "&.Mui-focused": {
      color: "#0f766e",
    },
  },
};

export default textfieldStyle;
