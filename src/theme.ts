export const theme = {
  colors: {
    lime: {
      100: "#fcfdfa",
      200: "#f7fcf0",
      300: "#eefadc",
      400: "#e4f7c7",
      500: "#d7f2b0",
      600: "#c9e894",
      700: "#b1d16a",
      800: "#94ba2c",
      900: "#99d52a",
      1000: "#93c926",
      1100: "#5d770d",
      1200: "#263209",
    },
    olive: {
      100: "#fcfdfc",
      200: "#f8faf8",
      300: "#f2f4f2",
      400: "#ecefec",
      500: "#e6e9e6",
      600: "#e0e4e0",
      700: "#d8dcd8",
      800: "#c3c8c2",
      900: "#8b918a",
      1000: "#818780",
      1100: "#6b716a",
      1200: "#141e12",
    },
    red: {
      100: "#fffcfc",
      200: "#fff8f8",
      300: "#ffefef",
      400: "#ffe5e5",
      500: "#fdd8d8",
      600: "#f9c6c6",
      700: "#f3aeaf",
      800: "#eb9091",
      900: "#e5484d",
      1000: "#dc3d43",
      1100: "#cd2b31",
      1200: "#381316",
    },
  },
  borderRadius: {
    xs: "0.2rem",
    sm: "0.4rem",
    md: "0.8rem",
    lg: "1.2rem",
    xl: "1.6rem",
  },
  fontSize: {
    xs: "0.6rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "1.6rem",
    xl: "2.4rem",
  },
} as const

export type CustomTheme = typeof theme
