import { useMemo } from "react";

import { useResume } from "../resume-context";
import { ComponentLayoutLocation } from "./layout-context";

export const white = "var(--mantine-color-white)";
export const black = "var(--mantine-color-black)";

export function useColorsByLocation(
  componentLocation: ComponentLayoutLocation
) {
  const { resumeConfig } = useResume();
  const { colorScheme } = resumeConfig;

  return useMemo(() => {
    if (componentLocation === "panel" && colorScheme.inverted) {
      return {
        text: white,
        primary: colorScheme.secondary,
        secondary: colorScheme.primary,
      };
    }

    return {
      text: black,
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
    };

    // const textColorOnPrimary = colorScheme.inverted ? white : black;
    // const textColor =
    //   componentLocation === "panel" ? textColorOnPrimary : black;
    // const accentColor =
    //   (componentLocation === "panel" && colorScheme.inverted
    //     ? colorScheme.secondary
    //     : colorScheme.primary) ?? "gray.1";
  }, [colorScheme, componentLocation]);
}
