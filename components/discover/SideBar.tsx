import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Select,
} from "@chakra-ui/react";
import React from "react";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = () => {
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
          >
            <option value="option1">Most Popular</option>
            <option value="option2">Least Popular</option>
            <option value="option1">Highest Rate</option>
            <option value="option2">Lowest Rate</option>
            <option value="option1">Earliest Released</option>
            <option value="option2">Latest Released</option>
            <option value="option1">Earliest Released</option>
            <option value="option2">Alphabetical</option>
          </Select>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
