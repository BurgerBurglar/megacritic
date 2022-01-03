import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import {
  ColorSchemeProvider,
  SetColorSchemeContext,
} from "../contexts/ColorSchemeProvider";
import { useColorSchemes } from "../hooks/useColorSchemes";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../styles/styles.css";
import { theme } from "../theme";
import { ColorScheme } from "../types/utils";
import { colorSchemes, initialColorScheme } from "../utils/constants";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useColorSchemes();
  return (
    <ChakraProvider theme={theme}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorSchemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
