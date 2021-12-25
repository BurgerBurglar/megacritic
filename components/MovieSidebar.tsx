import { VStack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Movie, MovieKeyword } from "../types/Movie";

interface MovieSidebarProps {
  movie: Movie;
  keywords: MovieKeyword[];
}

export const MovieSidebar: React.FC<MovieSidebarProps> = ({
  movie,
  keywords,
}) => {
  return (
    <VStack align="start" spacing={5}>
      <Box>
        <Heading as="h4" size="sm">
          Status
        </Heading>
        {movie.status}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Original Language
        </Heading>
        {movie.spoken_languages
          .map((language) => language.english_name)
          .join(", ")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Budget
        </Heading>
        ${Number(movie.budget).toLocaleString("en")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Revenue
        </Heading>
        ${Number(movie.revenue).toLocaleString("en")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Keywords
        </Heading>
        <Flex flexWrap="wrap">
          {keywords.map((keyword) => (
            <Text
              key={keyword.id}
              as="span"
              bg="gray.200"
              fontSize="sm"
              borderRadius="md"
              border="1px"
              borderColor="gray.300"
              px="10px"
              py="3px"
              mx="2px"
              my="4px"
            >
              {keyword.name}
            </Text>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};
