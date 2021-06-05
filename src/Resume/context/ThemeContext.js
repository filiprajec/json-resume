/*
  ThemeContext.scss
  <> Filip Rajec
*/

import { createContext, useEffect, useState } from "react";

import Styles from "../shared/styles";

const baseThemeDefaults = {
    light: "white",
    dark: "black",
}
const themes = {
  default: {
    primary: Styles.colors.basic.lime,
    secondary: Styles.colors.basic.lilac,
    ...baseThemeDefaults
  },
  theme1: {
    primary: Styles.colors.basic.lightGreen,
    secondary: Styles.colors.basic.lightPink,
    ...baseThemeDefaults
  },
  theme2: {
    primary: Styles.colors.basic.cornflowerLilac,
    secondary: Styles.colors.basic.champagne,
    ...baseThemeDefaults
  },
};

export const useThemeValue = () => {
  const [themeName, setThemeName] = useState("default");
  const [theme, setTheme] = useState(themes.default);
  useEffect(() => {
    setTheme(themes[themeName]);
  }, [themeName]);

  return { theme, name: themeName, setTheme: setThemeName, themes };
};

const getInitialContext = () => {
  const setTheme = () => {
    // eslint-disable-next-line no-console
    console.warn("Attach useThemeValue to provider to change theme.");
  };
  return { theme: themes.default, name: "default", setTheme };
};

const ThemeContext = createContext(getInitialContext());
export const ThemeProvider = ThemeContext.Provider;
export default ThemeContext;
