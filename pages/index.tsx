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
import React, { useMemo } from "react";
import useSWR from "swr";
import { MovieSlider } from "../components/MovieSlider";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";
import { useSearch } from "../hooks/useSearch";
import { MovieOverview } from "../types/Movie";
import { maxW } from "../utils/constants";
import { getMovieOverviews } from "../utils/request";

interface HomeProps {
  discover: MovieOverview[];
}
const Home: NextPage<HomeProps> = ({ discover }) => {
  const nowPlaying = useSWR("nowPlaying", () => getMovieOverviews("nowPlaying"))
    .data?.overviews;
  const popular = useSWR("popular", () => getMovieOverviews("popular")).data
    ?.overviews;
  const trending = useSWR("trending", () => getMovieOverviews("trending")).data
    ?.overviews;
  const topRated = useSWR("topRated", () => getMovieOverviews("topRated")).data
    ?.overviews;
  const upcoming = useSWR("upcoming", () => getMovieOverviews("upcoming")).data
    ?.overviews;

  const { newQuery, setNewQuery, search } = useSearch("");
  const colorScheme = useColorSchemeContext();

  const main = useMemo(
    () => (
      <>
        <Heading>Discover</Heading>
        <MovieSlider movies={discover} />
        <Heading>Now Playing</Heading>
        <MovieSlider movies={nowPlaying || []} />
        <Heading>Popular</Heading>
        <MovieSlider movies={popular || []} />
        <Heading>Trending</Heading>
        <MovieSlider movies={trending || []} />
        <Heading>Top Rated</Heading>
        <MovieSlider movies={topRated || []} />
        <Heading>Upcoming</Heading>
        <MovieSlider movies={upcoming || []} />
      </>
    ),
    [discover, nowPlaying, popular, topRated, trending, upcoming]
  );

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
        maxW={maxW}
        h={heroHeight}
      >
        <Box
          className="bg-tint"
          bgImage={`url('${bgImage}')`}
          filter="grayscale(100%)"
          bgRepeat="no-repeat"
          bgSize="cover"
          pos="absolute"
          w="full"
          h="full"
          top={0}
          left={0}
        />
        <Box
          className="bg-tint"
          bgColor={useThemeColor(900, 900)}
          pos="absolute"
          w="full"
          h="full"
          top={0}
          left={0}
          opacity={0.4}
        />
        <Box color="white" zIndex={0} w="full" p={5}>
          <Text fontSize={{ base: "4xl", md: "6xl" }}>Welcome.</Text>
          <Text fontSize={{ base: "md", md: "xl" }}>
            Millions of movies, TV shows and people to discover. Explore now.
          </Text>
          <InputGroup
            mb={5}
            size={searchSize}
            color={useTenShadesOfGray(700, 700)}
            mt={3}
          >
            <Input
              variant="solid"
              borderRadius="full"
              placeholder="star wars y:1977"
              opacity={0.7}
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
                onClick={search}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Container>
      <Container as="main" maxW={maxW} mt={5}>
        {main}
      </Container>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { overviews: discover } = await getMovieOverviews("discover");
  return {
    props: {
      discover,
    },
  };
};
