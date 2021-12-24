import { Box, Flex } from "@chakra-ui/layout";
import type { FlexProps } from "@chakra-ui/react";
import React from "react";

interface MovieCardRatingProps extends FlexProps {
  rating: number;
}

export const MovieCardRating: React.FC<MovieCardRatingProps> = (props) => {
  const { rating } = props;
  let bgColor = "red";
  if (rating >= 5) bgColor = "#fc3";
  if (rating >= 7) bgColor = "#6c3";

  return (
    <Flex
      w="30px"
      h="30px"
      bgColor={bgColor}
      justify="center"
      align="center"
      borderRadius="50%"
      color="white"
      {...props}
    >
      {rating}
    </Flex>
  );
};
