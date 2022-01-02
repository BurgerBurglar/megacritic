import { CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import { getMovieGenres } from "../../utils/request";

interface SideBarProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  selectedGenreIds: Set<number>;
  handleToggleGenre: (genreId: number) => void;
  refreshMovies: () => void;
  clearGenres: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  sortBy,
  setSortBy,
  selectedGenreIds,
  handleToggleGenre,
  refreshMovies,
  clearGenres,
}) => {
  const genres = useSWR("movieGenre", getMovieGenres).data || [];

  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      w="30%"
      maxW="300px"
      h="fit-content"
    >
      <AccordionItem
        border="1px"
        borderColor="LightGray !important"
        borderRadius="md"
        shadow="md"
        mb={3}
      >
        <h2>
          <AccordionButton
            borderBottom="1px"
            borderColor="LightGray !important"
          >
            <Box flex="1" textAlign="left" fontWeight="bold">
              Sort
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Select
            variant="outline"
            borderX="none"
            borderTop="none"
            borderRadius={0}
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="popularity.asc">Least Popular</option>
            <option value="vote_average.desc">Highest Rate</option>
            <option value="vote_average.asc">Lowest Rate</option>
            <option value="primary_release_date.asc">Earliest Released</option>
            <option value="primary_release_date.desc">Latest Released</option>
            <option value="original_title.asc">Alphabetical</option>
          </Select>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem
        border="1px"
        borderColor="LightGray !important"
        borderRadius="md"
        shadow="md"
        mb={3}
      >
        <h2>
          <AccordionButton
            borderBottom="1px"
            borderColor="LightGray !important"
          >
            <Box flex="1" textAlign="left" fontWeight="bold">
              Filters
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Heading as="h3" size="sm" fontWeight="normal" mb={1}>
            Genres
          </Heading>
          {genres?.map((genre) => (
            <Button
              key={genre.id}
              variant={selectedGenreIds.has(genre.id) ? "solid" : "outline"}
              colorScheme="telegram"
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
        </AccordionPanel>
      </AccordionItem>
      <Button
        colorScheme="telegram"
        borderRadius="full"
        w="100%"
        onClick={refreshMovies}
      >
        Search
      </Button>
    </Accordion>
  );
};
