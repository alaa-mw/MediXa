import { createTheme } from "@mui/material/styles";
import mainTheme from "./mainTheme";

const theme = createTheme(mainTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: "rtl", // Ensure RTL is applied to the body
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "right",
          "&.MuiTableCell-head": {
            // For header cells
            fontWeight: "bold",
            color: "white",
            backgroundColor: mainTheme.palette.primary.main, // fix
          },
          "&.MuiTableCell-body": {
            // For body cells
            direction: "rtl",
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          textAlign: "right",
        },
      },
    },
    // إعدادات مخصصة لحقول النص
    // MuiTextField: {
    //   defaultProps: {
    //     dir: 'rtl',
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     input: {
    //       textAlign: 'right',
    //       '&::placeholder': {
    //         textAlign: 'right',
    //       },
    //     },
    //   },
    // },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          right: 10,
          left: "auto",
          transformOrigin: "top right",
          "&.Mui-focused": {
            transformOrigin: "top right",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          textAlign: "right",
        },
        notchedOutline: {
          textAlign: "right",
        },
      },
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       textAlign: 'right',
    //     },
    //   },
    // },
    //--------
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // Force RTL positioning
          right: 0,
          left: "auto !important",
          // For permanent drawers
          borderRight: "none",
          borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        },
        paperAnchorDockedRight: {
          borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
          borderRight: "none",
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        root: {
          textAlign: "right", // محاذاة افتراضية لليمين
          "& .MuiTypography-root": {
            textAlign: "inherit", // يرث المحاذاة من العنصر الأب
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
         startIcon: {
          marginRight: -4,
          marginLeft:8
        },
      },
    },
  },
  MuiDatePicker: {
    styleOverrides: {
      root: {
        borderRadius: "11px",
        borderWidth: "0px",
        border: "0px solid",
      },
    },
  },
});

export default theme;
