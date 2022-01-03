import { Box, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { MovieSlider } from "../components/MovieSlider";
import { MovieOverview } from "../types/Movie";
import { getMovieOverviews } from "../utils/request";
interface HomeProps {
  discover: MovieOverview[];
  nowPlaying: MovieOverview[];
  popular: MovieOverview[];
  trending: MovieOverview[];
  topRated: MovieOverview[];
  upcoming: MovieOverview[];
}
const Home: NextPage<HomeProps> = ({
  discover,
  nowPlaying,
  popular,
  trending,
  topRated,
  upcoming,
}) => {
  return (
    <>
      <Head>
        <title>Megacritic</title>
        <meta
          name="description"
          content="Checkout the best movies... and more!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="main" w="100%" maxW="1400px" mx="auto" mt={5}>
        <Heading>Discover</Heading>
        <MovieSlider movies={discover} />
        <Heading>Now Playing</Heading>
        <MovieSlider movies={nowPlaying} />
        <Heading>Popular</Heading>
        <MovieSlider movies={popular} />
        <Heading>Trending</Heading>
        <MovieSlider movies={trending} />
        <Heading>Top Rated</Heading>
        <MovieSlider movies={topRated} />
        <Heading>Upcoming</Heading>
        <MovieSlider movies={upcoming} />
      </Box>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { overviews: discover } = await getMovieOverviews("discover");
  const { overviews: nowPlaying } = await getMovieOverviews("nowPlaying");
  const { overviews: popular } = await getMovieOverviews("popular");
  const { overviews: trending } = await getMovieOverviews("trending");
  const { overviews: topRated } = await getMovieOverviews("topRated");
  const { overviews: upcoming } = await getMovieOverviews("upcoming");
  return {
    props: {
      discover,
      nowPlaying,
      popular,
      trending,
      topRated,
      upcoming,
    },
  };
};