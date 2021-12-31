import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { getProfileUrl } from "../utils/getUrl";
import { Slider } from "./Slider";
import { TextElipse } from "./TextElipse";

interface CastSliderProps {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export const CastSlider: React.FC<CastSliderProps> = ({ cast }) => {
  return (
    <Flex direction="column" w="100%" maxW="1400px">
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
              h="full"
              display="inline-block"
              m={2}
              borderRadius="lg"
              shadow="xl"
              overflow="hidden"
            >
              <Image
                src={getProfileUrl(castMember.profile_path)}
                alt={castMember.name}
              />
              <Box p={3} whiteSpace="normal">
                <TextElipse fontWeight="bold">{castMember.name}</TextElipse>
                <TextElipse color="gray.600">{castMember.character}</TextElipse>
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
