import { Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
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
  return (
    <Flex direction="column" w="100%" maxW={maxW}>
      <Heading as="h3" size="md">
        Recommendations
      </Heading>
      {recommendations.length ? (
        <Slider h="230px" mt={3}>
          {recommendations.slice(0, 9).map((recommendation) => (
            <NextLink
              key={recommendation.id}
              href={"http://localhost:3000/movie/" + recommendation.id}
            >
              <Flex
                as="button"
                w="300px"
                minW="300px"
                h="full"
                display="inline-block"
                m={2}
              >
                <NextImage
                  src={getBackdropUrl(recommendation.backdrop_path)}
                  alt={recommendation.title}
                  borderRadius="lg"
                  overflow="hidden"
                />
                <Flex
                  justify="space-between"
                  align="center"
                  whiteSpace="normal"
                  fontSize="sm"
                  mt={1}
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
