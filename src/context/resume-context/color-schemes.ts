export type ColorScheme = {
  secondary: string;
  primary: string;
  inverted: boolean;
};

export type ColorSchemeKey = string;

export type ColorSchemes = Record<ColorSchemeKey, ColorScheme>;

export const colorSchemes: ColorSchemes = {
  mono: {
    primary: "var(--mantine-color-dark-8)",
    secondary: "var(--mantine-color-white)",
    inverted: false,
  },
  violet: {
    primary: "var(--mantine-color-violet-5)",
    secondary: "var(--mantine-color-white)",
    inverted: false,
  },
  ice: {
    primary: "var(--mantine-color-indigo-6)",
    secondary: "var(--mantine-color-white)",
    inverted: false,
  },
  pink: {
    primary: "var(--mantine-color-pink-4)",
    secondary: "var(--mantine-color-white)",
    inverted: false,
  },
  green: {
    primary: "var(--mantine-color-teal-7)",
    secondary: "var(--mantine-color-white)",
    inverted: false,
  },
  grayMono: {
    primary: "var(--mantine-color-dark-8)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: false,
  },
  grayViolet: {
    primary: "var(--mantine-color-violet-5)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: false,
  },
  grayIce: {
    primary: "var(--mantine-color-indigo-6)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: false,
  },
  grayPink: {
    primary: "var(--mantine-color-pink-4)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: false,
  },
  grayGreen: {
    primary: "var(--mantine-color-teal-7)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: false,
  },
  ocean: {
    primary: "var(--mantine-color-blue-6)",
    secondary: "var(--mantine-color-blue-1)",
    inverted: false,
  },
  mint: {
    primary: "var(--mantine-color-teal-6)",
    secondary: "var(--mantine-color-teal-1)",
    inverted: false,
  },
  fire: {
    primary: "var(--mantine-color-orange-8)",
    secondary: "var(--mantine-color-red-1)",
    inverted: false,
  },
  pinkDark: {
    primary: "var(--mantine-color-pink-7)",
    secondary: "var(--mantine-color-pink-2)",
    inverted: false,
  },
  grape: {
    primary: "var(--mantine-color-grape-7)",
    secondary: "var(--mantine-color-grape-1)",
    inverted: false,
  },
  grayInverted: {
    primary: "var(--mantine-color-dark-7)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: true,
  },
  violetInverted: {
    primary: "var(--mantine-color-violet-5)",
    secondary: "var(--mantine-color-gray-1)",
    inverted: true,
  },
  iceInverted: {
    primary: "var(--mantine-color-indigo-6)",
    secondary: "var(--mantine-color-gray-0)",
    inverted: true,
  },
  golf: {
    primary: "var(--mantine-color-teal-7)",
    secondary: "var(--mantine-color-white)",
    inverted: true,
  },
  beach: {
    primary: "var(--mantine-color-cyan-9)",
    secondary: "var(--mantine-color-gray-3)",
    inverted: true,
  },
};
