import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  FaFacebookSquare,
  FaHome,
  FaImdb,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Movie, MovieKeyword, MovieLinks } from "../types/Movie";

interface MovieSidebarProps {
  movie: Movie;
  keywords: MovieKeyword[];
  links: MovieLinks;
  homepage: string;
}

export const MovieSidebar: React.FC<MovieSidebarProps> = ({
  movie,
  keywords,
  links,
  homepage,
}) => {
  return (
    <VStack align="start" spacing={5}>
      <HStack>
        <NextLink href={"https://www.facebook.com/" + links.facebook_id}>
          <IconButton
            variant="ghost"
            aria-label="facebook"
            size="lg"
            icon={<Icon as={FaFacebookSquare} w={8} h={8} />}
          />
        </NextLink>
        <NextLink href={"https://www.twitter.com/" + links.facebook_id}>
          <IconButton
            variant="ghost"
            aria-label="twitter"
            size="lg"
            icon={<Icon as={FaTwitter} w={8} h={8} />}
          />
        </NextLink>
        <NextLink href={"https://www.instagram.com/" + links.instagram_id}>
          <IconButton
            variant="ghost"
            aria-label="instagram"
            size="lg"
            icon={<Icon as={FaInstagram} w={8} h={8} />}
          />
        </NextLink>
        <NextLink href={"https://www.imdb.com/title/" + links.imdb_id}>
          <IconButton
            variant="ghost"
            aria-label="imdb"
            size="lg"
            icon={<Icon as={FaImdb} w={8} h={8} />}
          />
        </NextLink>
        <NextLink href={homepage}>
          <IconButton
            variant="ghost"
            aria-label="homepage"
            size="lg"
            icon={<Icon as={FaHome} w={8} h={8} />}
          />
        </NextLink>
      </HStack>
      {links.facebook_id}
      <Box>
        <Heading as="h4" size="sm">
          Status
        </Heading>
        {movie.status}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Original Language
        </Heading>
        {movie.spoken_languages
          .map((language) => language.english_name)
          .join(", ")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Budget
        </Heading>
        ${Number(movie.budget).toLocaleString("en")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Revenue
        </Heading>
        ${Number(movie.revenue).toLocaleString("en")}
      </Box>
      <Box>
        <Heading as="h4" size="sm">
          Keywords
        </Heading>
        <Flex flexWrap="wrap">
          {keywords.map((keyword) => (
            <Text
              key={keyword.id}
              as="span"
              bg="gray.200"
              fontSize="sm"
              borderRadius="md"
              border="1px"
              borderColor="gray.300"
              px="10px"
              py="3px"
              mx="2px"
              my="4px"
            >
              {keyword.name}
            </Text>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};
