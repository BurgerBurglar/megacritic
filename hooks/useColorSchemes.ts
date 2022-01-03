import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ColorScheme } from "../types/utils";
import { initialColorScheme } from "../utils/constants";

export const useColorSchemes = (): [
  ColorScheme,
  Dispatch<SetStateAction<ColorScheme>>
] => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  useEffect(() => {
    setColorScheme(window.localStorage.getItem("colorScheme") as ColorScheme);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);
  return [colorScheme, setColorScheme];
};
