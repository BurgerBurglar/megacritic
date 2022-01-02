import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { Dispatch } from "react";
import { DateRange } from "../../types/utils";
import { stringifyDate, parseDate } from "../../utils/date";

interface ReleaseDatesProps {
  dateRange: DateRange;
  setDateRange: Dispatch<React.SetStateAction<DateRange>>;
}

export const ReleaseDates: React.FC<ReleaseDatesProps> = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <Box w="100%">
      <Heading as="h3" size="sm" fontWeight="normal" mb={1}>
        ReleaseDates
      </Heading>
      <Flex justify="space-between" align="center">
        <Text color="gray.500">from</Text>
        <Input
          type="date"
          value={stringifyDate(dateRange.from)}
          size="sm"
          maxW="160px"
          onChange={(e) =>
            setDateRange({
              ...dateRange,
              from: parseDate(e.target.value),
            })
          }
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Text color="gray.500">to</Text>
        <Input
          type="date"
          value={stringifyDate(dateRange.to)}
          size="sm"
          maxW="160px"
          onChange={(e) =>
            setDateRange({
              ...dateRange,
              to: parseDate(e.target.value),
            })
          }
        />
      </Flex>
    </Box>
  );
};
