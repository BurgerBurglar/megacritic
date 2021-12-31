import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { MovieOverview } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { MovieCardRating } from "./MovieCardRating";
import { TextEllipse } from "./TextEllipse";
import NextLink from "next/link";
import { getPosterUrl } from "../utils/getUrl";
interface MovieCardProps {
  movie: MovieOverview;
  itemId: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster = getPosterUrl(movie.poster_path);

  return (
    <NextLink key={movie.id} href={"http://localhost:3000/movie/" + movie.id}>
      <Flex
        direction="column"
        justify="space-between"
        w="150px"
        h="310px"
        mx="auto"
        _hover={{
          cursor: "pointer",
        }}
      >
        <Box h="80%">
          <Image src={poster} alt={movie.title} h="auto" borderRadius="10px" />
          <Box position="relative" top="-15px" left="10px">
            <MovieCardRating rating={movie.vote_average} />
          </Box>
        </Box>
        <Box h="20%">
          <TextEllipse Element={Heading} as="h2" size="sm">
            {movie.title}
          </TextEllipse>
          <Text color="gray.500">{formatDates(movie.release_date)}</Text>
        </Box>
      </Flex>
    </NextLink>
  );
};
