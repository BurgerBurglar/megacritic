import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Select,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { DateRange } from "../../types/utils";
import { Genres } from "./Genres";
import { RatingSlider } from "./RatingSlider";
import { ReleaseDates } from "./ReleaseDates";

interface SideBarProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  selectedGenreIds: Set<number>;
  handleToggleGenre: (genreId: number) => void;
  refreshMovies: () => void;
  clearGenres: () => void;
  dateRange: DateRange;
  ratings: [number, number];
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  setRatings: Dispatch<SetStateAction<[number, number]>>;
}

export const SideBar: React.FC<SideBarProps> = ({
  sortBy,
  setSortBy,
  selectedGenreIds,
  handleToggleGenre,
  refreshMovies,
  clearGenres,
  dateRange,
  setDateRange,
  ratings,
  setRatings,
}) => {
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
          <VStack divider={<StackDivider />} spacing={3}>
            <Genres
              selectedGenreIds={selectedGenreIds}
              handleToggleGenre={handleToggleGenre}
              clearGenres={clearGenres}
            />
            <ReleaseDates dateRange={dateRange} setDateRange={setDateRange} />
            <RatingSlider ratings={ratings} setRatings={setRatings} />
          </VStack>
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
