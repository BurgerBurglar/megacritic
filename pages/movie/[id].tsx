import { Box, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CastSlider } from "../../components/CastSlider";
import { MovieHero } from "../../components/MovieHero";
import { MovieMedia } from "../../components/MovieMedia";
import { MovieSidebar } from "../../components/MovieSidebar";
import { useKeywords } from "../../hooks/useKeywords";
import { useMovieCredential } from "../../hooks/useMovieCredential";
import { useMovieCredits } from "../../hooks/useMovieCredits";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useMovieLinks } from "../../hooks/useMovieLinks";

const Movie: NextPage = () => {
  const id = useRouter().query.id as string;
  const { movie, error } = useMovieDetails(id);
  const { crew, cast } = useMovieCredits(id);
  const { credential } = useMovieCredential(
    id,
    movie?.production_countries[0].iso_3166_1
  );
  const { keywords } = useKeywords(id);
  const { links } = useMovieLinks(id);

  if (
    id === undefined ||
    movie === undefined ||
    crew === undefined ||
    cast === undefined ||
    credential === undefined ||
    keywords === undefined ||
    links === undefined ||
    error
  )
    return <></>;

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      h="full"
      minH="100vh"
      w="100vw"
    >
      <MovieHero movie={movie} crew={crew} credential={credential} />
      <Flex
        className="bottom"
        direction={{ base: "column", lg: "row" }}
        w="100vw"
        maxW="1400px"
        mt={10}
        ml={5}
      >
        <VStack
          divider={<StackDivider />}
          align="start"
          spacing={10}
          flexGrow={1}
          w={{ base: "100%", lg: "70%" }}
        >
          <CastSlider cast={cast} />
          <MovieMedia id={id} />
        </VStack>
        <Box className="sidebar" ml={{ base: 0, lg: 10 }} w="30%">
          <MovieSidebar
            movie={movie}
            keywords={keywords}
            links={links}
            homepage={movie.homepage}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
export default Movie;
