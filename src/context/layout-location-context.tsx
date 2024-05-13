import { createContext, useContext, useMemo, useState } from "react";
import { useResume } from "./resume-context";

export type LayoutLocation = "panel" | "body";

const white = "var(--mantine-color-white)";
const black = "var(--mantine-color-black)";

interface InitialContext {
  layoutLocation: LayoutLocation;
  textColor: string;
  accentColor: string;
}

const initialContext: InitialContext = {
  layoutLocation: "body",
  textColor: black,
  accentColor: "gray.1",
};

const LayoutLocationContext = createContext<InitialContext>(initialContext);

interface LayoutLocationProviderProps {
  layoutLocation: LayoutLocation;
  children: React.ReactNode;
}

export const LayoutLocationProvider = ({
  layoutLocation,
  children,
}: LayoutLocationProviderProps) => {
  const { resumeConfig } = useResume();
  const { colorScheme } = resumeConfig;

  const textColorOnPrimary = colorScheme.inverted ? white : black;
  const textColor = layoutLocation === "panel" ? textColorOnPrimary : black;
  const accentColor =
    (layoutLocation === "panel" && colorScheme.inverted
      ? colorScheme.secondary
      : colorScheme.primary) ?? "gray.1";

  const value = useMemo(
    () => ({
      layoutLocation,
      textColor,
      accentColor,
    }),
    [layoutLocation, textColor, accentColor]
  );

  return (
    <LayoutLocationContext.Provider value={value}>
      {children}
    </LayoutLocationContext.Provider>
  );
};

export const useLayoutLocation = () => {
  const context = useContext(LayoutLocationContext);
  if (!context) {
    throw new Error(
      "useLayoutLocation must be used within a LayoutLocationProvider"
    );
  }
  return context;
};
