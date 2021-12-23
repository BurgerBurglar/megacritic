import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { MovieOverview } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { MovieCardRating } from "./MovieCardRating";

interface MovieCardProps {
  movie: MovieOverview;
  itemId: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster =
    "https://www.themoviedb.org/t/p/w220_and_h330_face" + movie.poster_path;

  return (
    <Flex
      direction="column"
      justify="space-between"
      w="150px"
      h="310px"
      mx="auto"
    >
      <Box h="80%">
        <Image src={poster} alt={movie.title} h="auto" borderRadius="10px" />
        <MovieCardRating rating={movie.vote_average} />
      </Box>
      <Box h="20%">
        <Heading
          as="h2"
          size="sm"
          display="-webkit-box"
          css={{
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
          }}
          overflow="hidden"
        >
          {movie.title}
        </Heading>
        <Text color="gray.500">{formatDates(movie.release_date)}</Text>
      </Box>
    </Flex>
  );
};
