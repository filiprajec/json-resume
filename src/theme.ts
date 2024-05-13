import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Inter",
  primaryColor: "violet",
  defaultRadius: "md",
});

export const paperTheme = (scale: number) =>
  createTheme({
    scale,
    headings: {
      fontFamily: "Karrik",
      sizes: {
        h1: {
          fontSize: "calc(2.5rem * var(--mantine-scale))",
          lineHeight: "calc(2.75rem * var(--mantine-scale))",
        },
        h2: {
          fontSize: "calc(2rem * var(--mantine-scale))",
          lineHeight: "calc(2.25rem * var(--mantine-scale))",
        },
        h3: {
          fontSize: "calc(1.5rem * var(--mantine-scale))",
          lineHeight: "calc(1.75rem * var(--mantine-scale))",
        },
        h4: {
          fontSize: "calc(1.25rem * var(--mantine-scale))",
          lineHeight: "calc(1.5rem * var(--mantine-scale))",
        },
        h5: {
          fontSize: "calc(1rem * var(--mantine-scale))",
          lineHeight: "calc(1.25rem * var(--mantine-scale))",
        },
        h6: {
          fontSize: "calc(0.75rem * var(--mantine-scale))",
          lineHeight: "calc(1rem * var(--mantine-scale))",
        },
      },
    },
  });
