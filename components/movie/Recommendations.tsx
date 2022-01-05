import { Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useTenShadesOfGray } from "../../hooks/useColors";
import { MovieRecommendation } from "../../types/Movie";
import { maxW } from "../../utils/constants";
import { getBackdropUrl } from "../../utils/getUrl";
import { MovieCardRating } from "../MovieCardRating";
import { NextImage } from "../NextImage";
import { Slider } from "../Slider";
import { TextEllipse } from "../TextEllipse";

interface RecommendationsProps {
  recommendations: MovieRecommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
}) => {
  const borderColor = useTenShadesOfGray(200);
  return (
    <Flex direction="column" w="100%" maxW={maxW}>
      <Heading as="h3" size="md">
        Recommendations
      </Heading>
      {recommendations.length ? (
        <Slider h="250px" mt={3}>
          {recommendations.slice(0, 9).map((recommendation) => (
            <NextLink
              key={recommendation.id}
              href={"/movie/" + recommendation.id}
              passHref
            >
              <Flex
                as="button"
                w="300px"
                minW="300px"
                h="215px"
                display="inline-block"
                border="1px"
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
                shadow="lg"
                m={2}
              >
                <NextImage
                  src={getBackdropUrl(recommendation.backdrop_path)}
                  alt={recommendation.title}
                  h={175}
                />
                <Flex
                  justify="space-between"
                  align="center"
                  whiteSpace="normal"
                  fontSize="sm"
                  px={3}
                  py={1}
                >
                  <Flex>
                    <TextEllipse tooltip={recommendation.title} lines={1}>
                      {recommendation.title}
                    </TextEllipse>
                    <Text color="gray.500" ml={1}>
                      ({recommendation.release_date.slice(0, 4)})
                    </Text>
                  </Flex>
                  <MovieCardRating rating={recommendation.vote_average} />
                </Flex>
              </Flex>
            </NextLink>
          ))}
        </Slider>
      ) : (
        <Text>
          We don&apos;t have enough data to suggest any movies. You can help by
          rating movies you&apos;ve seen.
        </Text>
      )}
    </Flex>
  );
};
