import { Box, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CastSlider } from "../../components/CastSlider";
import { MovieCollection } from "../../components/MovieCollection";
import { MovieHero } from "../../components/MovieHero";
import { MovieMedia } from "../../components/MovieMedia";
import { MovieSidebar } from "../../components/MovieSidebar";
import { MovieSocial } from "../../components/MovieSocial";
import { Recommendations } from "../../components/Recommendations";
import { useFetch } from "../../hooks/useFetch";
import {
  getCollection,
  getKeywords,
  getMovieCredential,
  getMovieCredits,
  getMovieDetails,
  getMovieImages,
  getMovieLinks,
  getMovieVideos,
  getRecommendations,
  getReviews,
} from "../../utils/request";

const Movie = ({
  id,
  movie,
  crew,
  cast,
  credential,
  keywords,
  links,
  recommendations,
  // reviews,
  // images,
  // videos,
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const videos = useFetch(getMovieVideos, id) || [];
  const images = useFetch(getMovieImages, id);
  const reviews = useFetch(getReviews, id) || [];
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
          <MovieSocial reviews={reviews} />
          {images ? <MovieMedia images={images} videos={videos} /> : null}
          {collection ? <MovieCollection collection={collection} /> : null}
          <Recommendations recommendations={recommendations} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const movie = await getMovieDetails(id);
  const { crew, cast } = await getMovieCredits(id);
  const credential = await getMovieCredential(id);
  const keywords = await getKeywords(id);
  const links = await getMovieLinks(id);
  const recommendations = await getRecommendations(id);
  // const reviews = await getReviews(id);
  // const images = await getMovieImages(id);
  // const videos = await getMovieVideos(id);
  const collection = await getCollection(
    movie.belongs_to_collection
      ? movie.belongs_to_collection.id.toString()
      : null
  );
  return {
    props: {
      id,
      movie,
      crew,
      cast,
      credential,
      keywords,
      links,
      recommendations,
      // reviews,
      // images,
      // videos,
      collection,
    },
  };
};