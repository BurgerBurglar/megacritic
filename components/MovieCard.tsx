import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { MovieOverview } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { MovieCardRating } from "./MovieCardRating";
import { TextEllipse } from "./TextEllipse";
import NextLink from "next/link";
import { getPosterUrl } from "../utils/getUrl";
import { NextImage } from "./NextImage";
interface MovieCardProps {
  movie: MovieOverview;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster = getPosterUrl(movie.poster_path);

  return (
    <NextLink key={movie.id} href={"http://localhost:3000/movie/" + movie.id}>
      <Flex
        direction="column"
        justify="space-between"
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        shadow="md"
        mx="auto"
        w="200px"
        h="400px"
        boxSizing="content-box"
        _hover={{
          cursor: "pointer",
          transition: "all .4s ease",
          bgColor: "gray.100",
        }}
      >
        <Box h="80%">
          <NextImage
            src={getPosterUrl(poster)}
            alt={movie.title}
            h="300px"
            borderRadius="10px"
          />
          <MovieCardRating
            rating={movie.vote_average}
            position="relative"
            top="-15px"
            left="10px"
          />
        </Box>
        <Box h="20%" px={2}>
          <TextEllipse
            tooltip={movie.title}
            Element={Heading}
            as="h2"
            size="sm"
          >
            {movie.title}
          </TextEllipse>
          <Text color="gray.500">{formatDates(movie.release_date)}</Text>
        </Box>
      </Flex>
    </NextLink>
  );
};
