import Icon, { IconProps } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MovieCardRating } from "../../components/MovieCardRating";
import { useMovieCredential } from "../../hooks/useMovieCredential";
import { useMovieCredits } from "../../hooks/useMovieCredits";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { formatDates } from "../../utils/formatDates";
import { getHourMinute } from "../../utils/getHourMinute";

const CircleIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);
const Movie: NextPage = () => {
  const id = useRouter().query.id as string;
  const { movie, error } = useMovieDetails(id);
  const { credits } = useMovieCredits(id);
  const { credential } = useMovieCredential(
    id,
    movie?.production_countries[0].iso_3166_1
  );
  if (!id || !movie || error) return <></>;
  const poster =
    "https://www.themoviedb.org/t/p/w220_and_h330_face/" + movie?.poster_path;
  const rating = movie.vote_average * 10;
  return (
    <HStack spacing={5}>
      <Image src={poster} alt={movie?.title} />
      <VStack spacing={3} align="start">
        <Flex align="center">
          <Link>
            <NextLink href={`http://localhost:3000/movie/${movie?.id}`}>
              <Heading fontSize="3xl">{movie?.title}</Heading>
            </NextLink>
          </Link>
          <Text color="gray.500" fontSize="3xl">
            ({movie?.release_date.substring(0, 4)})
          </Text>
        </Flex>
        <HStack align="center" divider={<CircleIcon w={2} border={0} />}>
          <Box>
            <Text as="span" border="1px" py="1px" px="3px">
              {credential}
            </Text>
            <Text as="span" ml={2}>
              {formatDates(movie?.release_date!, { month: "numeric" })}
            </Text>
          </Box>
          <Text>{movie.genres.map((genre) => genre.name).join(", ")}</Text>
          <Text>{getHourMinute(movie.runtime)}</Text>
        </HStack>
        <HStack fontWeight="bold">
          <MovieCardRating rating={rating} w="50px" h="50px" fontSize="xl" />
          <Box w="4em" ml={2} lineHeight="1.2em">
            User Score
          </Box>
        </HStack>
        <Text as="em">{movie.tagline}</Text>
        <Heading as="h3" size="md">
          Overview
        </Heading>
        <Text>{movie.overview}</Text>
      </VStack>
    </HStack>
  );
};
export default Movie;
