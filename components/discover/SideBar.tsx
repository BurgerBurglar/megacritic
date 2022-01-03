import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Input,
  Select,
  StackDivider,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { useTenShadesOfGray } from "../../hooks/useColors";
import { DateRange, Keyword } from "../../types/utils";
import { searchKeywords } from "../../utils/request";
import { Genres } from "./Genres";
import { RatingSlider } from "./RatingSlider";
import { ReleaseDates } from "./ReleaseDates";

interface SideBarProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  selectedGenreIds: number[];
  handleToggleGenre: (genreId: number) => void;
  refreshMovies: () => void;
  clearGenres: () => void;
  dateRange: DateRange;
  ratings: [number, number];
  setDateRange: Dispatch<SetStateAction<DateRange>>;
  setRatings: Dispatch<SetStateAction<[number, number]>>;
  queries: Keyword[];
  setQueries: Dispatch<SetStateAction<Keyword[]>>;
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
  queries,
  setQueries,
}) => {
  const colorScheme = useColorSchemeContext();
  const [newQuery, setNewQuery] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const handleQueryChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setNewQuery(input);
    if (input.length >= 2) {
      setKeywords(await searchKeywords(input));
    } else {
      setKeywords([]);
    }
  };

  return (
    <Accordion
      defaultIndex={[0, 1]}
      allowMultiple
      w="30%"
      maxW="300px"
      h="fit-content"
    >
      <AccordionItem
        border="1px"
        borderColor={useTenShadesOfGray(200)}
        borderRadius="md"
        shadow="md"
        mb={3}
      >
        <h2>
          <AccordionButton
            borderBottom="1px"
            borderColor={useTenShadesOfGray(200)}
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
        borderColor={useTenShadesOfGray(200)}
        borderRadius="md"
        shadow="md"
        mb={3}
      >
        <h2>
          <AccordionButton
            borderBottom="1px"
            borderColor={useTenShadesOfGray(200)}
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
            <Box w="full">
              <Heading as="h3" size="sm" fontWeight="normal" mb={1}>
                Keywords
              </Heading>
              <Input
                placeholder="Filter by keywords..."
                value={newQuery}
                onChange={handleQueryChange}
              />
              {newQuery.length >= 2 ? (
                keywords.length ? (
                  <Select
                    placeholder="Select a keyword"
                    onChange={(e) => {
                      setQueries([...queries, JSON.parse(e.target.value)]);
                      setNewQuery("");
                    }}
                  >
                    {keywords.map((keyword) => (
                      <option key={keyword.id} value={JSON.stringify(keyword)}>
                        {keyword.name}
                      </option>
                    ))}
                  </Select>
                ) : null
              ) : null}
              {queries.map(({ id, name }) => (
                <Tag
                  size="sm"
                  key={id}
                  borderRadius="full"
                  variant="solid"
                  colorScheme={colorScheme}
                >
                  <TagLabel>{name}</TagLabel>
                  <TagCloseButton
                    onClick={() =>
                      setQueries(queries.filter((query) => query.id !== id))
                    }
                  />
                </Tag>
              ))}
            </Box>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
      <Button
        colorScheme={colorScheme}
        borderRadius="full"
        w="100%"
        onClick={refreshMovies}
      >
        Search
      </Button>
    </Accordion>
  );
};
