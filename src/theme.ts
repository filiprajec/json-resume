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
          fontSize: "2.5rem",
          lineHeight: "2.75rem",
        },
        h2: {
          fontSize: "2rem",
          lineHeight: "2.25rem",
        },
        h3: {
          fontSize: "1.5rem",
          lineHeight: "1.75rem",
        },
        h4: {
          fontSize: "1.25rem",
          lineHeight: "1.5rem",
        },
        h5: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
        },
        h6: {
          fontSize: "0.75rem",
          lineHeight: "1rem",
        },
      },
    },
  });
