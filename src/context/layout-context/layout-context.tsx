import { createContext, useContext, useMemo } from "react";

import { useResume } from "../resume-context";
import { useColorsByLocation } from "./use-colors-by-location";

export type ComponentLayoutLocation = "panel" | "body";

interface InitialContext {
  componentLocation: ComponentLayoutLocation;
  colors: {
    text: string;
    primary: string;
    secondary: string;
  };
}

const initialContext: InitialContext = {
  componentLocation: "body",
  colors: {
    text: "var(--mantine-color-black)",
    primary: "var(--mantine-color-white)",
    secondary: "var(--mantine-color-gray-1)",
  },
};

const LayoutContext = createContext<InitialContext>(initialContext);

interface LayoutProviderProps {
  componentLocation: ComponentLayoutLocation;
  children: React.ReactNode;
}

export const LayoutProvider = ({
  componentLocation,
  children,
}: LayoutProviderProps) => {
  const colors = useColorsByLocation(componentLocation);

  const value = useMemo(
    () => ({
      componentLocation,
      colors,
    }),
    [componentLocation, colors]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "useLayoutLocation must be used within a LayoutLocationProvider"
    );
  }
  return context;
};
