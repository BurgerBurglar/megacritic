import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MovieSlider } from "../components/MovieSlider";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { useTenShadesOfGray } from "../hooks/useColors";
import { useSearch } from "../hooks/useSearch";
import { MovieOverview } from "../types/Movie";
import { maxW } from "../utils/constants";
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
  const { newQuery, setNewQuery, router } = useSearch("");
  const colorScheme = useColorSchemeContext();
  const search = () => router.push(`/search?query=${newQuery}`);
  const searchSize = useBreakpointValue({ base: "md", md: "lg" });
  const heroHeight = useBreakpointValue({ base: "300px", md: "500px" });

  const bgImage =
    "https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/kSNojkWwSZWsYv0Xj1gcq88okzY.jpg";
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
      <Container
        display="flex"
        alignItems="center"
        pos="relative"
        bgImage={`url('${bgImage}')`}
        bgRepeat="no-repeat"
        bgSize="cover"
        maxW={maxW}
        h={heroHeight}
      >
        <Box
          className="bg-tint"
          bgColor="black"
          pos="absolute"
          w="full"
          h="full"
          top={0}
          left={0}
          opacity={0.5}
        />
        <Box color="white" zIndex={1} w="full" p={5}>
          <Text fontSize={{ base: "4xl", md: "6xl" }}>Welcome.</Text>
          <Text fontSize={{ base: "md", md: "xl" }}>
            Millions of movies, TV shows and people to discover. Explore now.
          </Text>
          <InputGroup
            mb={5}
            size={searchSize}
            color={useTenShadesOfGray(600)}
            mt={3}
          >
            <Input
              variant="solid"
              borderRadius="full"
              placeholder="star wars y:1977"
              pl={5}
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && search()}
            />
            <InputRightElement w="fit-content">
              <Button
                colorScheme={colorScheme}
                size={searchSize}
                borderRadius="full"
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Container>
      <Container as="main" maxW={maxW} mt={5}>
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
      </Container>
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
