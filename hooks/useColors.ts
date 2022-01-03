import { useColorModeValue } from "@chakra-ui/react";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { ColorScheme, shade } from "../types/utils";

export const useColorScheme = (
  colorScheme: ColorScheme,
  lightShade: shade,
  darkShade?: shade
) => {
  let realDarkShade: shade | undefined = darkShade;
  if (darkShade === undefined) {
    if (lightShade === 50) {
      realDarkShade = 900;
    } else if (lightShade === 900) {
      realDarkShade = 50;
    } else {
      realDarkShade = (900 - lightShade) as shade;
    }
  }
  return useColorModeValue(
    `var(--chakra-colors-${colorScheme}-${lightShade}) !important`,
    `var(--chakra-colors-${colorScheme}-${realDarkShade}) !important`
  );
};

export const useThemeColor = (lightShade: shade, darkShade?: shade) => {
  const colorScheme = useColorSchemeContext();
  return useColorScheme(colorScheme, lightShade, darkShade);
};
export const useTenShadesOfGray = (lightShade: shade, darkShade?: shade) =>
  useColorScheme("gray", lightShade, darkShade);
