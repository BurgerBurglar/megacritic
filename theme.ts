import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
const dark = "purple.900";
const light = "purple.50";
const breakpoints = createBreakpoints({
  sm: "320px",
  smallish: "600px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});
export const theme = extendTheme({
  breakpoints,
  colors: {
    purple: {
      1000: "#0B0014",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
});
