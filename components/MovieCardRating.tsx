import { Flex } from "@chakra-ui/layout";
import type { FlexProps } from "@chakra-ui/react";
import React from "react";

interface MovieCardRatingProps extends FlexProps {
  rating?: number;
}

export const MovieCardRating: React.FC<MovieCardRatingProps> = ({
  rating,
  ...props
}) => {
  let bgColor = "gray";
  if (rating) bgColor = "red";
  if (rating && rating >= 5) bgColor = "#eb2";
  if (rating && rating >= 7) bgColor = "#6c3";

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
      {(Math.round((rating || 0) * 100) / 100).toFixed(1)}
    </Flex>
  );
};
