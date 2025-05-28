import { FC, useState, createContext, useEffect, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { ThemeSwitcher } from "./Base";
import { StylesProvider } from "@mui/styles";
import PropTypes from "prop-types";

export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [themeName, _setThemeName] = useState("MainTheme");
  const theme = ThemeSwitcher(themeName);
  const [loading, setLoading] = useState(true);

  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setThemeName("MainTheme");
        setLoading(false);
      }, 300);
    })();
  }, []);

  return loading == true ? (
    <></>
  ) : (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={_setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

interface ThemeProviderWrapperProps {
  children?: ReactNode;
}
ThemeProviderWrapper.propTypes = {
  children: PropTypes.node,
};
export default ThemeProviderWrapper;