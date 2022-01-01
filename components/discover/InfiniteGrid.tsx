import { Flex, Spinner, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieOverview } from "../../types/Movie";
import { MovieCard } from "../MovieCard";

interface GridProps {
  movies: MovieOverview[];
  loadMore: () => void;
}

export const InfiniteGrid: React.FC<GridProps> = ({ movies, loadMore }) => {
  return (
    <InfiniteScroll
      dataLength={movies.length}
      hasMore
      loader={
        <Flex
          justify="center"
          align="center"
          bgColor="gray.200"
          borderRadius="md"
          w="100%"
          h="50px"
        >
          <Spinner mr={3} />
          Loading...
        </Flex>
      }
      next={loadMore}
    >
      <SimpleGrid minChildWidth="200px" spacing="20px" w="100%">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
