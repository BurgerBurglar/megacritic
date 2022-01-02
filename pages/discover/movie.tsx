import { Box, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { InfiniteGrid } from "../../components/discover/InfiniteGrid";
import { SideBar } from "../../components/discover/SideBar";
import { useSortFilter } from "../../hooks/useSortFilter";
import { MovieOverview } from "../../types/Movie";
import { DateRange } from "../../types/utils";
import { getMovieOverviews } from "../../utils/request";

interface Props {
  movies: MovieOverview[];
}

const Movie: NextPage<Props> = ({ movies }) => {
  const {
    sortBy,
    setSortBy,
    selectedGenreIds,
    handleToggleGenre,
    refreshMovies,
    clearGenres,
    allMovies,
    loadMore,
    hasMore,
    dateRange,
    setDateRange,
  } = useSortFilter(movies);

  return (
    <>
      <Flex as="main" justify="center" w="100%" h="100%">
        <Flex direction="column" w="100%" maxW="1400px" mt={5} px={3}>
          <Heading as="h1" size="lg" mb={5}>
            Popular Movies
          </Heading>
          <Flex w="100%">
            <SideBar
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedGenreIds={selectedGenreIds}
              handleToggleGenre={handleToggleGenre}
              refreshMovies={refreshMovies}
              clearGenres={clearGenres}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
            <Box w="100%" ml={3}>
              <InfiniteGrid
                movies={allMovies}
                loadMore={loadMore}
                hasMore={hasMore}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Movie;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { overviews: movies } = await getMovieOverviews("discover");
  return {
    props: { movies },
  };
};
