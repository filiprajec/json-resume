import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

import { ColorScheme, Theme, theme } from "./theme";
export { ColorScheme };

interface InitialContext extends Theme {
  colorScheme: ColorScheme;
  colorSchemeName: string;
  changeColorScheme: (name: string) => void;
}

const initialContext: InitialContext = {
  colorScheme: theme.colorSchemes.default,
  colorSchemeName: "default",
  changeColorScheme: () => {},
  ...theme,
};

const ThemeContext = createContext<InitialContext>(initialContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultColorSchemeName = theme.defaultColorSchemeName;

  const [colorSchemeName, setColorSchemeName] = useState<
    keyof Theme["colorSchemes"]
  >(defaultColorSchemeName);
  const [colorScheme, setColorScheme] = useState(
    theme.colorSchemes[defaultColorSchemeName]
  );

  const changeColorScheme = useCallback((name: string) => {
    setColorSchemeName(name);
    setColorScheme(theme.colorSchemes[name]);
  }, []);

  const value = useMemo(
    () => ({ colorScheme, colorSchemeName, changeColorScheme, ...theme }),
    [colorScheme, colorSchemeName, changeColorScheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
