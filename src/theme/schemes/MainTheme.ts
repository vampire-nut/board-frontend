import { createTheme } from "@mui/material";
import { createBreakpoints } from "@mui/system";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const sansThai = IBM_Plex_Sans_Thai({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
    preload: false,
    display: 'swap',
    adjustFontFallback: false
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
    breakpoints: defaultBreakpoint,
    typography: {
        fontFamily: sansThai.style.fontFamily,
    },
});