export const styles = {
  fontSize: {
    px: {
      h1: 48,
      h2: 22,
      h3: 20,
      h4: 18,
      h5: 14,
      h6: 12,
      p: 12,
    },
  },
  padding: {
    px: {
      xxsmall: 2,
      xsmall: 3,
      small: 5,
      medium: 10,
      large: 20,
      xlarge: 40,
      xxlarge: 80,
    },
  },
  colors: {
    basic: {
      dark: "black",
      light: "white",
      background: "#f6f6f6",
      paper: "white",
      lightPink: "#fdeeff",
      chantilly: "#f2bee4",
      lightGreen: "#eaffe4",
      lime: "#c7f9cc",
      lilac: "#d0d1ff",
      cornflowerLilac: "#ffadad",
      champagne: "#ffd6a5",
      gray: "rgb(128, 128, 128)",
    },
  },
};

export const themeDefault = {
  primary: styles.colors.basic.lime,
  secondary: styles.colors.basic.chantilly,
};
