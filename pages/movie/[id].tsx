import { Box, Flex, StackDivider, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { CastSlider } from "../../components/movie/CastSlider";
import { MovieCollection } from "../../components/movie/MovieCollection";
import { MovieHero } from "../../components/movie/MovieHero";
import { MovieMedia } from "../../components/movie/MovieMedia";
import { MovieSidebar } from "../../components/movie/MovieSidebar";
import { MovieSocial } from "../../components/movie/MovieSocial";
import { Recommendations } from "../../components/movie/Recommendations";
import {
  CastOverview,
  Collection,
  CrewOverview,
  Movie,
  MovieKeyword,
  MovieLinks,
  MovieRecommendation,
} from "../../types/Movie";
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
import { maxW } from "../../utils/constants";

interface Props {
  id: string;
  movie: Movie;
  crew: CrewOverview[];
  cast: CastOverview[];
  credential: string | null;
  keywords: MovieKeyword[];
  links: MovieLinks | null;
  recommendations: MovieRecommendation[];
  collection: Collection | null;
}
const Movie: NextPage<Props> = ({
  id,
  movie,
  crew,
  cast,
  credential,
  keywords,
  links,
  recommendations,
  collection,
}) => {
  const reviews = useSWR("reviews", () => getReviews(id)).data || [];
  const videos = useSWR("videos", () => getMovieVideos(id)).data || [];
  const { data: images } = useSWR("images", () => getMovieImages(id));

  return (
    <>
      <Head>
        <title>{movie?.title} - Megacritic</title>
      </Head>
      <Flex as="main" direction="column" align="center" w="100%">
        <MovieHero
          movie={movie}
          crew={crew || []}
          credential={credential || undefined}
        />
        <Flex
          className="bottom"
          direction={{ base: "column", lg: "row" }}
          w="100%"
          maxW={maxW}
          mt={10}
          px={5}
        >
          <VStack
            divider={<StackDivider />}
            align="start"
            spacing={10}
            flexGrow={1}
            w={{ base: "100%", lg: "70%" }}
          >
            <CastSlider cast={cast || []} />
            {reviews.length ? <MovieSocial reviews={reviews} /> : null}
            {images && videos ? (
              <MovieMedia images={images} videos={videos} />
            ) : null}
            {collection ? <MovieCollection collection={collection} /> : null}
            <Recommendations recommendations={recommendations} />
          </VStack>
          <Box
            className="sidebar"
            ml={{ base: 0, lg: 10 }}
            w="100%"
            maxW="300px"
            // flex={0}
          >
            <MovieSidebar
              movie={movie}
              keywords={keywords || []}
              links={links || undefined}
              homepage={movie?.homepage}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params?.id as string;
  const movie = await getMovieDetails(id);
  if (!movie) {
    return {
      notFound: true,
    };
  }

  const { crew, cast } = await getMovieCredits(id);
  const credential = await getMovieCredential(id);
  const keywords = (await getKeywords(id)) || [];
  const links = await getMovieLinks(id);
  const recommendations = await getRecommendations(id);
  const collection = await getCollection(
    movie?.belongs_to_collection
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
      collection,
    },
  };
};
export default Movie;