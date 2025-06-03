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
      golden: {
        main: string;
      };
      text: {
        main: string;
      };
      black: {
        main: string;
      };
      white: {
        main: string;
      };
      green: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      grey: {
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
      golden: {
        main: string;
      };
      text: {
        main: string;
      };
      black: {
        main: string;
      };
      white: {
        main: string;
      };
      green: {
        lighter: string;
        light: string;
        main: string;
      };
      grey: {
        lighter: string;
        light: string;
      };
    };
  }

  interface TypographyVariants {
    headings?: React.CSSProperties;
    SubHeading?: React.CSSProperties;
    H1?: React.CSSProperties;
    Body1?: React.CSSProperties;
  }


  interface TypographyVariantsOptions {
    headings?: React.CSSProperties;
    SubHeading?: React.CSSProperties;
    H1?: React.CSSProperties;
    Body1?: React.CSSProperties;
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
