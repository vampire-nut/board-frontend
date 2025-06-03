import { createTheme } from "@mui/material";
import { alpha, createBreakpoints, darken, lighten } from "@mui/system";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const sansThai = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  preload: false,
  display: "swap",
  adjustFontFallback: false,
});

const defaultBreakpoint = {
  values: {
    xs: 0,
    se: 470,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1440,
    xxl: 1536,
  },
};

const breakpoints = createBreakpoints(defaultBreakpoint);
const up_lg = breakpoints.up("lg");
const up_md = breakpoints.up("md");
const only_md = breakpoints.only("md");
const down_md = breakpoints.down("md");
const down_sm = breakpoints.down("sm");

const themeColors = {
  primary: "#243831",
  secondary: "#2B5F44",
  golden: "#C5A365",
  text: "#191919",
  black: "#000000",
  white: "#FFFFFF",
  success: "#49A569",
  error: "#E12E2B",
  green500: "#243831",
  green300: "#2B5F44",
  green100: "#D8E9E4",
  grey100: "#BBC2C0",
  grey300: "#939494",
};

export const MainTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    success: {
      main: themeColors.success,
    },
    error: {
      main: themeColors.error,
    },
  },
  colors: {
    secondary: {
      lighter: alpha(themeColors.secondary, 0.1),
      light: lighten(themeColors.secondary, 0.3),
      main: themeColors.secondary,
      dark: darken(themeColors.secondary, 0.2),
    },
    primary: {
      lighter: alpha(themeColors.primary, 0.1),
      light: lighten(themeColors.primary, 0.3),
      main: themeColors.primary,
      dark: darken(themeColors.primary, 0.2),
    },
    success: {
      lighter: alpha(themeColors.success, 0.1),
      light: lighten(themeColors.success, 0.3),
      main: themeColors.success,
      dark: darken(themeColors.success, 0.2),
    },
    error: {
      lighter: alpha(themeColors.error, 0.1),
      light: lighten(themeColors.error, 0.3),
      main: themeColors.error,
      dark: darken(themeColors.error, 0.2),
    },
    golden: {
      main: themeColors.golden,
    },
    text: {
      main: themeColors.text,
    },
    black: {
      main: themeColors.black,
    },
    white: {
      main: themeColors.white,
    },
    green: {
      lighter: themeColors.green100,
      light: themeColors.green300,
      main: themeColors.green500,
    },
    grey: {
      lighter: themeColors.grey100,
      light: themeColors.grey300,
    },
  },
  breakpoints: defaultBreakpoint,
  typography: {
    fontFamily: sansThai.style.fontFamily,

    headings: {
      fontWeight: 400,
      fontSize: 28,
    },
    SubHeading: {
      fontWeight: 400,
      fontSize: 28,
    },
    H1: {

    },
    Body1: {

    },

  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          fontWeight: "normal",
          textTransform: "none",
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: themeColors.success,
        },
        contained: {
          borderRadius: "8px",
          height: '40px',
          minWidth: "105px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: themeColors.white,
          borderRadius: '8px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "& .MuiTouchRipple-root": {
            opacity: 0.3,
          },
        },
      },
    },
  },
});
