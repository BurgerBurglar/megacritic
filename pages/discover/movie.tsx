import { Box, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { InfiniteGrid } from "../../components/discover/InfiniteGrid";
import { SideBar } from "../../components/discover/SideBar";
import { MovieOverview } from "../../types/Movie";
import { getMovieOverviews } from "../../utils/request";

interface Props {
  movies: MovieOverview[];
}

const Movie: NextPage<Props> = ({ movies }) => {
  const [allMovies, setAllMovies] = useState<MovieOverview[]>(movies);
  const [page, setPage] = useState(2);

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
    const newMovies = await getMovieOverviews("discover", { page });
    setAllMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  return (
    <>
      <Flex as="main" justify="center" w="100%" h="100%">
        <Flex direction="column" w="100%" maxW="1400px" mt={5} px={3}>
          <Heading as="h1" size="lg" mb={5}>
            Popular Movies
          </Heading>
          <Flex w="100%">
            <SideBar />
            <Box w="100%" ml={3}>
              <InfiniteGrid movies={allMovies} loadMore={loadMore} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Movie;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const movies: MovieOverview[] = await getMovieOverviews("discover");
  return {
    props: { movies },
  };
};
