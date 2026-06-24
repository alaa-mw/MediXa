import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    tertiary: {
      main: string;
      light: string;
    };
    snackbar: { 
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
    };
     tertiary?: {
      main?: string;
      light?: string;
    };
    default?: {
      main?: string;
      dark?: string;
    };
    snackbar?: { 
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  }
  // interface BreakpointOverrides { defualt
  //   xs: true; 0 px and up (mobile)
  //   sm: true; 600px and up (tablets)
  //   md: true; 900px and up (laptops)
  //   lg: true; 1200px and up (desktops)
  //   xl: true; 1536px and up (large screens)
  // }
}

const theme = createTheme({
  direction: 'rtl',
   components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '& ::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for Firefox */
          scrollbarWidth: 'none',
          /* Hide scrollbar for IE and older Edge */
          msOverflowStyle: 'none',
        },
        '#root': {
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#5a3c62',  // Dark purple
      light: '#9d7ea6',   // Lighter purple
    },
    secondary: {
      main: '#3a6a6c',    // Dark teal
      light: '#78bfc1',   // Lighter teal
    },
    tertiary: {
      main: '#374466',    // Dark blue
      light: '#5a6a8c',   // Lighter blue
    },
    gradient: {
      primary: 'linear-gradient(135deg, #5a3c62 0%,#caafd1 100%)',
      secondary: 'linear-gradient(135deg, #3a6a6c 0%,#78bfc1 100%)',
      tertiary: 'linear-gradient(135deg, #374466 0%,#5a6a8c 100%)',
    },
    background: {
      default:'#F4F8FB',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#5a5a5a',
    },
    // Override the default color palette tokens
    success: {
      main: '#d2f9de',
      dark: '#5ea97a'
    },
    error: {
      main: '#ffc9c8',
      dark: '#d32f2f'
    },
    warning: {
      main: '#fbe6c7',
      dark: '#e0760c'
    },
    info: {
      main: '#bfecfa',
      dark: '#02a1d1'
    },
    default:{
      main: '#e0e0e0',
      dark: '#9e9e9e'
    },
    snackbar: {  // Define your snackbar colors
      success:'#76bb7d', // Green
      error:'#ff9695',   // Red
      warning: '#ff9800', // Orange
      info:'#21bff3'     // Blue
    },
    // success: {
    //   main: 'hsl(170, 51%, 53%)', // Default green
    //    contrastText: '#fff',
    // }
  },
  typography: {
    fontFamily: "'Cairo', sans-serif",
  },

});

export default theme;

