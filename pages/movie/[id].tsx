import { Flex } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { MovieHero } from "../../components/MovieHero";
import { useMovieCredential } from "../../hooks/useMovieCredential";
import { useMovieCredits } from "../../hooks/useMovieCredits";
import { useMovieDetails } from "../../hooks/useMovieDetails";

const Movie: NextPage = () => {
  const id = useRouter().query.id as string;
  const { movie, error } = useMovieDetails(id);
  const { credits } = useMovieCredits(id);
  const { credential } = useMovieCredential(
    id,
    movie?.production_countries[0].iso_3166_1
  );
  if (!id || !movie || !credits || !credential || error) return <></>;

  return (
    <Flex as="main" direction="column" align="center" h="full" minH="100vh">
      <MovieHero movie={movie} credits={credits} credential={credential} />
    </Flex>
  );
};
export default Movie;
