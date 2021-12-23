import { Box, Flex } from "@chakra-ui/layout";
import React from "react";

interface MovieCardRatingProps {
  rating: number;
}

export const MovieCardRating: React.FC<MovieCardRatingProps> = ({ rating }) => {
  let bgColor = "red";
  if (rating >= 5) bgColor = "#fc3";
  if (rating >= 7) bgColor = "#6c3";

  return (
    <Flex
      w="30px"
      h="30px"
      bgColor={bgColor}
      position="relative"
      top="-15px"
      left="10px"
      justify="center"
      align="center"
      borderRadius="50%"
      color="white"
    >
      {rating}
    </Flex>
  );
};
