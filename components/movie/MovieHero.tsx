import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconProps,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { Movie } from "../../types/Movie";
import { maxW } from "../../utils/constants";
import { formatDates } from "../../utils/formatDates";
import { getHourMinute } from "../../utils/getHourMinute";
import { getBackdropUrl, getPosterUrl } from "../../utils/getUrl";
import { MovieCardRating } from "../MovieCardRating";
import { NextImage } from "../NextImage";

const CircleIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);
interface MovieHeroProps {
  movie?: Movie;
  crew: {
    jobs: string[];
    name: string;
    id: string;
  }[];
  credential?: string;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movie,
  crew,
  credential,
}) => {
  const colorScheme = useColorSchemeContext();
  const bgColor = `var(--chakra-colors-${colorScheme}-900)`;

  const poster = getPosterUrl(movie?.poster_path, "lg");
  const backdrop = getBackdropUrl(movie?.backdrop_path, "lg");

  const Divider = () =>
    useBreakpointValue({
      base: <StackDivider />,
      sm: <CircleIcon w={2} border={0} />,
    });

  const bgOffsetPixels = useBreakpointValue({
    base: 0,
    sm: 200,
  });
  return (
    <Flex
      className="hero"
      justify="center"
      color="white"
      w="100%"
      minH="530px"
      position="relative"
    >
      <Box
        className="background"
        w="100%"
        h="100%"
        position="absolute"
        zIndex={-1}
      >
        <Box
          className="background-photo"
          w="100%"
          h="100%"
          position="absolute"
          bgImage={backdrop}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition={`right -${bgOffsetPixels}px top`}
        />
        <Box
          className="background-gradient"
          w="100%"
          h="100%"
          position="absolute"
          bg={`linear-gradient(to right, ${bgColor}, ${bgColor} ${bgOffsetPixels}px,rgba(20, 20, 20, 0.8))`}
        />
        <Box
          className="background-black"
          w="100%"
          h="100%"
          position="absolute"
          bgColor="black"
          opacity={0.3}
        />
      </Box>
      <Stack
        className="hero-main"
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "start" }}
        spacing={5}
        py={10}
        px={2}
        w="100%"
        maxW={maxW}
      >
        <Box
          flexShrink={0}
          w="full"
          h={{ md: "full" }}
          maxW="300px"
          maxH="450px"
        >
          <NextImage
            src={poster}
            alt={movie?.title}
            ratio={300 / 450}
            borderRadius="lg"
            overflow="hidden"
            imageProps={{ quality: 100 }}
          />
        </Box>
        <VStack className="hero-info" spacing={5} align="start">
          <Box>
            <Link>
              <NextLink href={`/movie/${movie?.id}`} passHref>
                <Heading display="inline" fontSize="3xl">
                  {movie?.title}
                </Heading>
              </NextLink>
            </Link>
            <Text as="span" color="gray.400" fontSize="3xl">
              {" (" + movie?.release_date.substring(0, 4)})
            </Text>
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align="center"
            alignSelf={{ base: "center", sm: "start" }}
            divider={Divider()} //{Divider !== undefined ? <Divider /> : undefined}
          >
            <Flex direction="row" align="center">
              <Text
                as="span"
                color="gray.300"
                whiteSpace="nowrap"
                border="1px"
                borderColor="gray.300"
                py="1px"
                px="3px"
              >
                {credential}
              </Text>
              <Text as="span" ml={2} suppressHydrationWarning>
                {formatDates(movie?.release_date!, { month: "numeric" })}
              </Text>
            </Flex>
            {movie?.genres.length ? (
              <Text>{movie?.genres.map((genre) => genre.name).join(", ")}</Text>
            ) : null}
            {movie?.runtime ? (
              <Text minW="6em">{getHourMinute(movie?.runtime)}</Text>
            ) : null}
          </Stack>
          <Stack
            direction={{ base: "row", sm: "column" }}
            align={{ base: "center", sm: "start" }}
          >
            <HStack fontWeight="bold">
              <MovieCardRating
                rating={movie?.vote_average}
                w="50px"
                h="50px"
                fontSize="xl"
              />
              <Box w="4em" ml={2} lineHeight="1.2em">
                User Score
              </Box>
            </HStack>
            <Text as="em" color="gray.300">
              {movie?.tagline}
            </Text>
          </Stack>
          <Box>
            <Heading as="h3" size="md" mb={3}>
              Overview
            </Heading>
            <Text>
              {movie?.overview
                ? movie.overview
                : "We don't have an overview translated in English. Help us expand our database by adding one."}
            </Text>
          </Box>
          {crew?.length ? (
            <SimpleGrid
              minChildWidth={{ base: "8em", lg: "10em" }}
              spacingX={{ base: "1em", lg: "3em" }}
              spacingY={{ base: "1em", lg: "2em" }}
              w="100%"
            >
              {crew.map((crewMember) => (
                <Box key={crewMember.id}>
                  <Text fontWeight="bold">{crewMember.name}</Text>
                  <Text>{crewMember.jobs.join(", ")}</Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>
              We don&apos;t have any crew added to this movie. You can help by
              adding some!
            </Text>
          )}
        </VStack>
      </Stack>
    </Flex>
  );
};
