import { createContext, useEffect, useState, useContext } from "react";

import { styles } from "../styles";

export type ThemeProps = {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
};

const baseThemeDefaults = {
  light: "white",
  dark: "black",
};

const themes: Record<string, ThemeProps> = {
  default: {
    primary: styles.colors.basic.lime,
    secondary: styles.colors.basic.lilac,
    ...baseThemeDefaults,
  },
  theme1: {
    primary: styles.colors.basic.lightGreen,
    secondary: styles.colors.basic.lightPink,
    ...baseThemeDefaults,
  },
  theme2: {
    primary: styles.colors.basic.cornflowerLilac,
    secondary: styles.colors.basic.champagne,
    ...baseThemeDefaults,
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

function getInitialContext() {
  const setTheme = () => {
    // eslint-disable-next-line no-console
    console.warn("Attach useThemeValue to provider to change theme.");
  };
  return { theme: themes.default, name: "default", setTheme, themes };
}

export const ThemeContext = createContext<{
  theme: Record<string, string>;
  name: string;
  setTheme: (theme: string) => void;
  themes: Record<string, ThemeProps>;
}>(getInitialContext());
export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
