import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
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
  const profileImage = (profilePath: string | null) =>
    profilePath
      ? "https://www.themoviedb.org/t/p/w138_and_h175_face/" + profilePath
      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

  return (
    <Flex direction="column" w="100%" maxW="1400px">
      <Heading as="h3" size="md">
        Top Billed Cast
      </Heading>
      <Slider mt={3}>
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
              src={profileImage(castMember.profile_path)}
              alt={castMember.name}
            />
            <Box p={3} whiteSpace="normal">
              <TextElipse fontWeight="bold">{castMember.name}</TextElipse>
              <TextElipse color="gray.600">{castMember.character}</TextElipse>
            </Box>
          </Flex>
        ))}
      </Slider>
    </Flex>
  );
};
