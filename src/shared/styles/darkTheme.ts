import arabicTheme from "./arabicTheme";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme(arabicTheme, {
  direction: "rtl",
  palette: {
    mode: "dark",
    background: {
      default: "#0b0c0d",
      paper: "#121212",
    },
    text: {
      primary: "#e6eef2",
      secondary: "#aeb6bb",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: "rtl",
          backgroundColor: "#0b0c0d",
        },
      },
    },
  },
});

export default darkTheme;
