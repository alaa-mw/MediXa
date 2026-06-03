import { createTheme } from "@mui/material";

export const landingTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Cairo", "Tajawal", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
  },
  palette: {
    primary: {
      main: "#0A84C6",
    },
    secondary: {
      main: "#14B8A6",
    },
    background: {
      default: "#F4F8FB",
      paper: "#FFFFFF",
    },
  },
});
