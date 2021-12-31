import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useCollection } from "../hooks/useFetch";
import { getBackdropUrl } from "../utils/getUrl";

interface MovieCollectionProps {
  id: string;
}

export const MovieCollection: React.FC<MovieCollectionProps> = ({ id }) => {
  const { collection } = useCollection(id);
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
        bgImage={`linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 100%), url(${backdrop})`}
        bgRepeat="no-repeat"
        bgPosition="50% 50%"
        bgSize="cover"
        position="absolute"
        top={0}
        w="100%"
        h="100%"
        zIndex={-1}
      />
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
