import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { Collection } from "../../types/Movie";
import { getBackdropUrl } from "../../utils/getUrl";

interface MovieCollectionProps {
  collection: Collection;
}

export const MovieCollection: React.FC<MovieCollectionProps> = ({
  collection,
}) => {
  const colorScheme = useColorSchemeContext();
  if (!collection) return null;
  const partTitles = collection.parts.map(({ title }) => title);
  const backdrop = getBackdropUrl(collection.backdrop_path, "wide");
  return (
    <Flex
      w="100%"
      h="250px"
      position="relative"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        className="bg"
        position="absolute"
        top={0}
        w="100%"
        h="100%"
        zIndex={-1}
      >
        <Box
          className="bg-image"
          bgImage={`linear-gradient(to right, #000000FF 0%, #000000AA 100%), url(${backdrop})`}
          bgRepeat="no-repeat"
          bgPosition="50% 50%"
          bgSize="cover"
          w="full"
          h="full"
        />
        <Box
          className="bg-tint"
          position="absolute"
          top={0}
          left={0}
          bgColor={`var(--chakra-colors-${colorScheme}-900)`}
          opacity={0.3}
          w="full"
          h="full"
        />
      </Box>
      <Flex direction="column" justify="center" ml={5}>
        <Heading as="h4" size="lg" color="white">
          Part of the {collection.name}
        </Heading>
        <Text color="white">Includes {partTitles.join(", ")}</Text>
        <Button
          colorScheme="gray"
          width="fit-content"
          borderRadius="full"
          textTransform="uppercase"
          fontSize="sm"
          px={5}
          mt={5}
        >
          View the collection
        </Button>
      </Flex>
    </Flex>
  );
};
