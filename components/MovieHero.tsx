import {
  Flex,
  HStack,
  VStack,
  Box,
  Heading,
  Image,
  Link,
  Text,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Movie } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { getHourMinute } from "../utils/getHourMinute";
import { MovieCardRating } from "./MovieCardRating";

const CircleIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);
interface MovieHeroProps {
  movie: Movie;
  crew: {
    jobs: string[];
    name: string;
    id: string;
  }[];
  credential: string;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  crew,
  credential,
}) => {
  const poster =
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie?.poster_path;
  const backdrop =
    "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" +
    movie?.backdrop_path;
  return (
    <Flex
      bgImage={backdrop}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="right -200px top"
      color="white"
      h="570px"
    >
      <Flex
        bg="linear-gradient(to right, rgba(20, 20, 20, 1), rgba(20, 20, 20, 1) 200px,rgba(20, 20, 20, 0.8))"
        w="100vw"
        justify="center"
      >
        <HStack spacing={5} justify="center" w="100%" maxW="1400px">
          <Image src={poster} alt={movie?.title} h="450px" />
          <VStack spacing={5} align="start">
            <Box>
              <Link>
                <NextLink href={`http://localhost:3000/movie/${movie?.id}`}>
                  <Heading display="inline" fontSize="3xl">
                    {movie?.title}
                  </Heading>
                </NextLink>
              </Link>
              <Text as="span" color="gray.400" fontSize="3xl">
                {" (" + movie?.release_date.substring(0, 4)})
              </Text>
              <HStack align="center" divider={<CircleIcon w={2} border={0} />}>
                <Box>
                  <Text
                    as="span"
                    color="gray.300"
                    border="1px"
                    borderColor="gray.300"
                    py="1px"
                    px="3px"
                  >
                    {credential}
                  </Text>
                  <Text as="span" ml={2}>
                    {formatDates(movie?.release_date!, { month: "numeric" })}
                  </Text>
                </Box>
                <Text>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </Text>
                <Text>{getHourMinute(movie.runtime)}</Text>
              </HStack>
            </Box>
            <HStack fontWeight="bold">
              <MovieCardRating
                rating={movie.vote_average}
                w="50px"
                h="50px"
                fontSize="xl"
              />
              <Box w="4em" ml={2} lineHeight="1.2em">
                User Score
              </Box>
            </HStack>
            <Text as="em" color="gray.300">
              {movie.tagline}
            </Text>
            <Heading as="h3" size="md">
              Overview
            </Heading>
            <Text>{movie.overview}</Text>
            <Flex flexWrap="wrap">
              {crew
                ? crew.map((crewMember) => (
                    <Box key={crewMember.id} mr={60} mb={5}>
                      <Text fontWeight="bold">{crewMember.name}</Text>
                      <Text>{crewMember.jobs.join(", ")}</Text>
                    </Box>
                  ))
                : null}
            </Flex>
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  );
};
