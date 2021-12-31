import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useRecommendations } from "../hooks/useFetch";
import { getBackdropUrl } from "../utils/getUrl";
import { MovieCardRating } from "./MovieCardRating";
import { Slider } from "./Slider";
import { TextElipse } from "./TextElipse";

interface RecommendationsProps {
  id: string;
}

export const Recommendations: React.FC<RecommendationsProps> = ({ id }) => {
  const { recommendations } = useRecommendations(id);
  return (
    <Flex direction="column" w="100%" maxW="1400px">
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
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={getBackdropUrl(recommendation.backdrop_path)}
                  alt={recommendation.title}
                  w="100%"
                />
                <Flex justify="space-between" p={3} whiteSpace="normal">
                  <Flex>
                    <TextElipse>{recommendation.title}</TextElipse>
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
