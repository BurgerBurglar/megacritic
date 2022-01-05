import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useTenShadesOfGray, useThemeColor } from "../../hooks/useColors";
import { maxW } from "../../utils/constants";
import { getProfileUrl } from "../../utils/getUrl";
import { NextImage } from "../NextImage";
import { Slider } from "../Slider";
import { TextEllipse } from "../TextEllipse";

interface CastSliderProps {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export const CastSlider: React.FC<CastSliderProps> = ({ cast }) => {
  const nameColor = useThemeColor(700);
  const gray = useTenShadesOfGray(600);
  return (
    <Flex direction="column" w="100%" maxW={maxW}>
      <Heading as="h3" size="md" mb={3}>
        Top Billed Cast
      </Heading>
      {cast.length ? (
        <Slider>
          {cast.slice(0, 9).map((castMember) => (
            <Flex
              key={castMember.id}
              w="140px"
              minW="140px"
              h="290px"
              display="inline-block"
              m={2}
              borderRadius="lg"
              shadow="xl"
              overflow="hidden"
            >
              <NextImage
                h="175px"
                src={getProfileUrl(castMember.profile_path)}
                alt={castMember.name}
              />
              <Box p={3} pb={5} whiteSpace="normal">
                <TextEllipse
                  tooltip={castMember.name}
                  color={nameColor}
                  fontWeight="bold"
                >
                  {castMember.name}
                </TextEllipse>
                <TextEllipse
                  tooltip={castMember.character}
                  fontSize="sm"
                  color={gray}
                >
                  {castMember.character}
                </TextEllipse>
              </Box>
            </Flex>
          ))}
        </Slider>
      ) : (
        <Box>
          <Text>
            We don&apos;t have any cast added to this movie. You can help by
            adding some!
          </Text>
          <Text fontWeight="bold" mt={3}>
            Add Missing Cast &amp; Crew
          </Text>
        </Box>
      )}
    </Flex>
  );
};
