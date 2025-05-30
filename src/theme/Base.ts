import { Theme } from "@mui/material";
import { MainTheme } from "./schemes/MainTheme";

export function ThemeSwitcher(theme: string): Theme {
  return themeMap[theme];
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    se: true;
    xxl: true;
  }

  interface Theme {
    colors: {
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };
  }

  interface ThemeOptions {
    colors: {
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headings: true;
    SubHeading?: true;
    H1?: true;
    Body1?: true;
  }
}

const themeMap: { [key: string]: Theme } = {
  MainTheme,
};
