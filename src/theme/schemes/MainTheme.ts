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
  primary: "#1877F2",
  secondary: "#4D8FF2",
  black: "#222222",
  white: "#ffffff",
  success: "#34B428",
  error: "#E12E2B",
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
  },
  breakpoints: defaultBreakpoint,
  typography: {
    fontFamily: sansThai.style.fontFamily,
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
          [up_md]: { height: 42 },
          [only_md]: { height: 42 },
          [down_md]: { height: 42 },
        },
        contained: {
          borderRadius: "8px",
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
