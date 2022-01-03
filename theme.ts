import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
const dark = "#232323";
const light = "red";
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
  global: (props: any) => ({
    body: {
      bg: mode(light, dark)(props),
    },
  }),
});
