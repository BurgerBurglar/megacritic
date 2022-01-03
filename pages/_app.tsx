import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { ColorSchemeProvider } from "../contexts/ColorSchemeProvider";
import { useColorSchemes } from "../hooks/useColorSchemes";
import "../styles/styles.css";
import { theme } from "../theme";

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
