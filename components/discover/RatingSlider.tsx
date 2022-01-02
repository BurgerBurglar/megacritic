import {
  Box,
  Tooltip,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface RatingSliderProps {
  ratings: [number, number];
  setRatings: Dispatch<SetStateAction<[number, number]>>;
}

export const RatingSlider: React.FC<RatingSliderProps> = ({
  ratings: [minRating, maxRating],
  setRatings,
}) => {
  return (
    <Box w="full">
      <Tooltip label={`Range ${minRating} - ${maxRating}`} closeOnClick={false}>
        <RangeSlider
          defaultValue={[minRating, maxRating]}
          min={0}
          max={10}
          step={0.5}
          onChangeEnd={(val) => setRatings(val as [number, number])}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
      </Tooltip>
      <Flex
        justify="space-between"
        color="gray.500"
        w="full"
        position="relative"
        left={1}
        mt={-2}
      >
        <Box>0</Box>
        <Box>5</Box>
        <Box>10</Box>
      </Flex>
    </Box>
  );
};
