import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React from "react";

interface SliderProps extends BoxProps {}

export const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  return (
    <Box
      className="slider-box"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      mt={2}
      h="300px"
      {...props}
      _after={{
        content: "''",
        width: "80px",
        height: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        bg: "linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%)",
        willChange: "opacity",
        pointerEvents: "none",
      }}
    >
      <Flex
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        align="center"
        h="full"
      >
        {children}
        <Flex align="center" ml={4} mr={10} fontWeight="bold">
          View More
          <ArrowForwardIcon ml={2} boxSize={5} />
        </Flex>
      </Flex>
    </Box>
  );
};
