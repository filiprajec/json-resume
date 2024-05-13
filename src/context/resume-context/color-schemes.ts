export type ColorScheme = {
  secondary: string;
  primary: string;
  inverted: boolean;
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
    secondary: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-dark-8)",
    inverted: false,
  },
  grayAndViolet: {
    secondary: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-violet-5)",
    inverted: false,
  },
  grayAndYellow: {
    secondary: "var(--mantine-color-gray-1)",
    primary: "var(--mantine-color-yellow-9)",
    inverted: false,
  },
  candy: {
    secondary: "var(--mantine-color-lime-2)",
    primary: "var(--mantine-color-indigo-8)",
    inverted: false,
  },
  softCandy: {
    secondary: "var(--mantine-color-blue-1)",
    primary: "var(--mantine-color-pink-7)",
    inverted: false,
  },
  fire: {
    secondary: "var(--mantine-color-red-1)",
    primary: "var(--mantine-color-orange-8)",
    inverted: false,
  },
  ice: {
    primary: "var(--mantine-color-indigo-6)",
    secondary: "var(--mantine-color-gray-0)",
    inverted: true,
  },
  pink: {
    secondary: "var(--mantine-color-pink-2)",
    primary: "var(--mantine-color-pink-7)",
    inverted: false,
  },
};
