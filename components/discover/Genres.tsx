import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { getMovieGenres } from "../../utils/request";

interface GenresProps {
  selectedGenreIds: number[];
  handleToggleGenre: (genreId: number) => void;
  clearGenres: () => void;
}

export const Genres: React.FC<GenresProps> = ({
  selectedGenreIds,
  handleToggleGenre,
  clearGenres,
}) => {
  const colorScheme = useColorSchemeContext();
  const genres = useSWR("movieGenre", getMovieGenres).data || [];
  return (
    <Box>
      <Heading as="h3" size="sm" fontWeight="normal" mb={1}>
        Genres
      </Heading>
      {genres?.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenreIds.includes(genre.id) ? "solid" : "outline"}
          colorScheme={colorScheme}
          size="sm"
          borderRadius="full"
          fontWeight="normal"
          m={1}
          ml={0}
          onClick={() => handleToggleGenre(genre.id)}
        >
          {genre.name}
        </Button>
      ))}
      <Flex>
        <Button
          variant="outline"
          borderRadius="full"
          size="sm"
          colorScheme="blackAlpha"
          ml="auto"
          onClick={clearGenres}
        >
          <CloseIcon w={3} mr={1} />
          Clear
        </Button>
      </Flex>
    </Box>
  );
};
