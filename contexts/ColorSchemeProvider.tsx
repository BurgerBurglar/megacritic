import React, { Dispatch, SetStateAction, useContext } from "react";
import { ColorScheme } from "../types/utils";

export const ColorSchemeContext = React.createContext<ColorScheme>("purple");
export const SetColorSchemeContext = React.createContext<
  Dispatch<SetStateAction<ColorScheme>> | undefined
>(undefined);

interface ColorSchemeProviderProps {
  colorScheme: ColorScheme;
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
}

export const ColorSchemeProvider: React.FC<ColorSchemeProviderProps> = ({
  colorScheme,
  setColorScheme,
  children,
}) => {
  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <SetColorSchemeContext.Provider value={setColorScheme}>
        {children}
      </SetColorSchemeContext.Provider>
    </ColorSchemeContext.Provider>
  );
};

export const useColorSchemeContext = () => useContext(ColorSchemeContext);
