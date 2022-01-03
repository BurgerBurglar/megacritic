import {
  Flex,
  Spinner,
  SimpleGrid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieOverview } from "../../types/Movie";
import { MovieCard } from "../MovieCard";

interface GridProps {
  movies: MovieOverview[];
  loadMore: () => void;
  hasMore: boolean;
}

export const InfiniteGrid: React.FC<GridProps> = ({
  movies,
  loadMore,
  hasMore,
}) => {
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <Flex
          justify="center"
          align="center"
          bgColor={useColorModeValue("purple.200", "purple.800")}
          borderRadius="md"
          w="100%"
          h="50px"
        >
          <Spinner mr={3} />
          Loading...
        </Flex>
      }
      endMessage={
        <Flex
          justify="center"
          align="center"
          bgColor={useColorModeValue("purple.200", "purple.800")}
          borderRadius="md"
          w="100%"
          h="50px"
        >
          <Image
            src="http://cdn.onlinewebfonts.com/svg/img_274139.png"
            alt="doge"
            w="30px"
            mr={1}
          />
          Wow, such empty...
        </Flex>
      }
    >
      <SimpleGrid minChildWidth="200px" spacing="20px" w="100%">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
