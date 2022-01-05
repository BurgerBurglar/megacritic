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
  useBreakpointValue,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import React from "react";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { useTenShadesOfGray } from "../../hooks/useColors";
import { MovieReview } from "../../types/Movie";
import { formatDates } from "../../utils/formatDates";
import { Tabs } from "../Tabs";
import { TextEllipse } from "../TextEllipse";

interface MovieSocialProps {
  reviews: MovieReview[];
}

export const MovieSocial: React.FC<MovieSocialProps> = ({ reviews }) => {
  const colorScheme = useColorSchemeContext();
  const borderColor = useTenShadesOfGray(200);
  const dateColor = useTenShadesOfGray(600);
  const avatarSize = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const reviewsSorted = reviews.sort(
    (x, y) => Date.parse(x.updated_at) - Date.parse(y.updated_at)
  );

  const tabs = ["Reviews", "Discussions"];
  const counts = [reviews.length, 0];

  const ReviewerAvatar: React.FC<{ review: MovieReview }> = ({ review }) => (
    <Avatar
      name={review.author}
      src={review.author_details.avatar_path?.slice(1) || undefined}
      size={avatarSize}
    />
  );

  const ReviewHead: React.FC<{ review: MovieReview }> = ({ review }) => (
    <HStack spacing={{ base: 0, md: 3 }} align="center" flexWrap="wrap">
      <Text fontWeight="bold">{review.author}</Text>
      <Text color={dateColor} fontSize="sm">
        {formatDates(review.created_at)}
      </Text>
      {review.author_details.rating ? (
        <Tag h="2em" size="sm" variant="solid" colorScheme={colorScheme}>
          <TagLeftIcon boxSize="12px" as={StarIcon} />
          <TagLabel>{review.author_details.rating}</TagLabel>
        </Tag>
      ) : null}
    </HStack>
  );

  const Review: React.FC<{ review: MovieReview }> = ({ review }) => (
    <TextEllipse Element={Box} lines={5}>
      {review.content.split("\n").map((p, i) => (
        <Text key={i} mb={3}>
          {parse(p)}
        </Text>
      ))}
    </TextEllipse>
  );
  const ReviewCard: React.FC<{ review: MovieReview }> = ({ review }) => (
    <Flex
      key={review.id}
      shadow="md"
      w="100%"
      borderColor={borderColor}
      border="1px"
      mb={4}
      p={{ base: 1, sm: 5 }}
      _last={{
        mb: 2,
      }}
    >
      <ReviewerAvatar review={review} />
      <Flex direction="column" flex={1} minW={0} ml={{ base: 1, md: 8 }}>
        <ReviewHead review={review} />
        <Review review={review} />
      </Flex>
    </Flex>
  );

  const elements = [
    reviewsSorted.length ? (
      <Flex
        direction="column"
        align="start"
        borderColor={borderColor}
        border="1px"
        p={{ base: 1, sm: 5 }}
        maxH="500px"
        overflowY="auto"
        mt={5}
      >
        {reviewsSorted.map((review) => (
          <ReviewCard key={review.id} review={review} />
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
