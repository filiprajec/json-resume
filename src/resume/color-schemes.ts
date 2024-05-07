export type ColorScheme = {
  panel: string;
  primary: string;
};

export type ColorSchemeKey =
  | "gray"
  | "grayAndViolet"
  | "grayAndYellow"
  | "candy"
  | "softCandy"
  | "fire"
  | "ice"
  | "pink";

export type ColorSchemes = Record<ColorSchemeKey, ColorScheme>;

export const colorSchemes: ColorSchemes = {
  gray: {
    panel: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-dark-8)",
  },
  grayAndViolet: {
    panel: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-violet-5)",
  },
  grayAndYellow: {
    panel: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-yellow-9)",
  },
  candy: {
    panel: "var(--mantine-color-lime-1)",
    primary: "var(--mantine-color-violet-4)",
  },
  softCandy: {
    panel: "var(--mantine-color-blue-1)",
    primary: "var(--mantine-color-pink-7)",
  },
  fire: {
    panel: "var(--mantine-color-red-1)",
    primary: "var(--mantine-color-orange-8)",
  },
  ice: {
    panel: "var(--mantine-color-indigo-6)",
    primary: "var(--mantine-color-gray-0)",
  },
  pink: {
    panel: "var(--mantine-color-pink-2)",
    primary: "var(--mantine-color-pink-7)",
  },
};
