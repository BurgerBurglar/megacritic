import { Box, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { CastSlider } from "../../components/CastSlider";
import { MovieCollection } from "../../components/MovieCollection";
import { MovieHero } from "../../components/MovieHero";
import { MovieMedia } from "../../components/MovieMedia";
import { MovieSidebar } from "../../components/MovieSidebar";
import { MovieSocial } from "../../components/MovieSocial";
import { Recommendations } from "../../components/Recommendations";
import {
  useKeywords,
  useMovieCredential,
  useMovieCredits,
  useMovieDetails,
  useMovieLinks,
} from "../../hooks/useFetch";

interface MovieProps {
  id: string;
}

const Movie: NextPage<MovieProps> = ({ id }) => {
  const { movie } = useMovieDetails(id);
  const { crew, cast } = useMovieCredits(id);
  const { credential } = useMovieCredential(
    id,
    movie?.production_countries[0]?.iso_3166_1
  );
  const { keywords } = useKeywords(id);
  const { links } = useMovieLinks(id);

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      h="full"
      minH="100vh"
      w="100vw"
    >
      <MovieHero movie={movie} crew={crew || []} credential={credential} />
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
          <CastSlider cast={cast || []} />
          <MovieSocial id={id} />
          <MovieMedia id={id} />
          {movie?.belongs_to_collection ? (
            <MovieCollection id={movie.belongs_to_collection.id.toString()} />
          ) : null}
          <Recommendations id={id} />
        </VStack>
        <Box className="sidebar" ml={{ base: 0, lg: 10 }} w="30%">
          <MovieSidebar
            movie={movie}
            keywords={keywords || []}
            links={links}
            homepage={movie?.homepage}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
export default Movie;
export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context
) => {
  const id = context.params?.id as string;
  return {
    props: {
      id,
    },
  };
};