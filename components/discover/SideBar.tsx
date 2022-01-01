import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface SideBarProps {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export const SideBar: React.FC<SideBarProps> = ({ sortBy, setSortBy }) => {
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
    </Accordion>
  );
};
