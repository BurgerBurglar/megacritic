import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";
import { MovieOverview } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { getPosterUrl } from "../utils/getUrl";
import { MovieCardRating } from "./MovieCardRating";
import { NextImage } from "./NextImage";
import { TextEllipse } from "./TextEllipse";
interface MovieCardProps {
  movie: MovieOverview;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const poster = getPosterUrl(movie.poster_path);

  return (
    <NextLink key={movie.id} href={"/movie/" + movie.id} passHref>
      <Flex
        direction="column"
        justify="space-between"
        border="1px"
        borderColor={useTenShadesOfGray(200)}
        borderRadius="md"
        shadow="md"
        mx="auto"
        w="200px"
        h="400px"
        boxSizing="content-box"
        _hover={{
          cursor: "pointer",
          transition: "all .4s ease",
          bgColor: useThemeColor(50),
        }}
      >
        <Box h="80%">
          <NextImage
            src={poster}
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
            color={useThemeColor(700)}
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
