import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { Children } from "react";
import { useThemeColor } from "../hooks/useColors";

interface SliderProps extends BoxProps {}

export const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
  const rightColor = useThemeColor(50);
  const hasChildren = Children.count(children) !== 0;
  return (
    <Box
      className="slider-box"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      mt={2}
      {...props}
      _after={{
        content: "''",
        width: "80px",
        height: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        bg: useColorModeValue(
          "linear-gradient(to right, #FFFFFF00 0%, #FFFFFFFF)",
          "linear-gradient(to right, #00000000 0%, #00000055)"
        ),
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
        {hasChildren ? (
          <>
            {children}{" "}
            <Flex align="center" ml={4} mr={10} fontWeight="bold">
              View More
              <ArrowForwardIcon ml={2} boxSize={5} />
            </Flex>
          </>
        ) : (
          <Text>Wow, such empty.</Text>
        )}
      </Flex>
    </Box>
  );
};
