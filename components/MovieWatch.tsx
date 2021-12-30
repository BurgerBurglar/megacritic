import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useWatchProviders } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface MovieWatchProps {
  id: number;
}

export const MovieWatch: React.FC<MovieWatchProps> = ({ id }) => {
  const [countryCode, setCountryCode] = useLocalStorage<string>(
    "countryCode",
    "US"
  );
  // const { providers } = useWatchProviders(id.toString());
  // const localProviders = providers[countryCode];

  // const logoPath =
  //   "https://www.themoviedb.org/t/p/original" +
  //   localProviders.flatrate[0].logo_path;

  return (
    <Flex justify="center" align="center" bg="blue.900" w="100%" p={3}>
      {/* <Image src={logoPath} alt={localProviders.flatrate[0].provider_name} /> */}
      <Box>
        <Text color="gray.400">Now Streaming</Text>
        <Text>Watch Now</Text>
      </Box>
    </Flex>
  );
};
