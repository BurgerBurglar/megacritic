import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useReviews } from "../hooks/useFetch";
import { formatDates } from "../utils/formatDates";
import { Tabs } from "./Tabs";
import { TextEllipse } from "./TextEllipse";
import parse from "html-react-parser";

interface MovieSocialProps {
  id: string;
}

export const MovieSocial: React.FC<MovieSocialProps> = ({ id }) => {
  const { reviews } = useReviews(id);
  const reviewsSorted = reviews.sort(
    (x, y) => Date.parse(x.updated_at) - Date.parse(y.updated_at)
  );

  const tabs = ["Reviews", "Discussions"];
  const counts = [reviews.length, 0];
  const elements = [
    reviewsSorted.length ? (
      <Flex
        direction="column"
        align="start"
        borderColor="gainsboro !important"
        border="1px"
        p={5}
        maxH="500px"
        overflow="auto"
        mt={5}
      >
        {reviewsSorted.map((review) => (
          <Flex
            key={review.id}
            shadow="md"
            w="100%"
            borderColor="gainsboro !important"
            border="1px"
            mb={4}
            p={5}
            _last={{
              mb: 2,
            }}
          >
            <Avatar
              name={review.author}
              src={review.author_details.avatar_path?.slice(1) || undefined}
              size="lg"
            />
            <Flex direction="column" ml={8}>
              <HStack spacing={3}>
                <Text fontWeight="bold">{review.author}</Text>
                <Text>{formatDates(review.created_at)}</Text>
                {review.author_details.rating ? (
                  <Tag
                    h="2em"
                    size="sm"
                    variant="solid"
                    color="white"
                    bgColor="black"
                  >
                    <TagLeftIcon boxSize="12px" as={StarIcon} />
                    <TagLabel>{review.author_details.rating}</TagLabel>
                  </Tag>
                ) : null}
              </HStack>
              <TextEllipse Element={Box} lines={5}>
                {review.content.split("\n").map((p, i) => (
                  <Text key={i} mb={3}>
                    {parse(p)}
                  </Text>
                ))}
              </TextEllipse>
            </Flex>
          </Flex>
        ))}
      </Flex>
    ) : (
      <Text mt={3}>Wow, such empty.</Text>
    ),
    null,
  ];
  return (
    <Tabs header="Social" tabs={tabs} counts={counts} elements={elements} />
  );
};
