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
