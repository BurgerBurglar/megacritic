import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CastSlider } from "../../components/CastSlider";
import { MovieHero } from "../../components/MovieHero";
import { MovieSidebar } from "../../components/MovieSidebar";
import { useKeywords } from "../../hooks/useKeywords";
import { useMovieCredential } from "../../hooks/useMovieCredential";
import { useMovieCredits } from "../../hooks/useMovieCredits";
import { useMovieDetails } from "../../hooks/useMovieDetails";

const Movie: NextPage = () => {
  const id = useRouter().query.id as string;
  const { movie, error } = useMovieDetails(id);
  const { crew, cast } = useMovieCredits(id);
  const { credential } = useMovieCredential(
    id,
    movie?.production_countries[0].iso_3166_1
  );
  const { keywords } = useKeywords(id);
  if (!id || !movie || !crew || !cast || !credential || !keywords || error)
    return <></>;

  return (
    <Flex as="main" direction="column" align="center" h="full" minH="100vh">
      <MovieHero movie={movie} crew={crew} credential={credential} />
      <Flex w="full" maxW="1400px" mt={10} ml={5}>
        <Box w="70%" maxW="1080px">
          <CastSlider cast={cast} />
        </Box>
        <Box ml={10}>
          <MovieSidebar movie={movie} keywords={keywords} />
        </Box>
      </Flex>
    </Flex>
  );
};
export default Movie;
