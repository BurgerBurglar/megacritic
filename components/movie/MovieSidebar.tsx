import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  useColorModeValue,
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
import { Movie, MovieKeyword, MovieLinks } from "../../types/Movie";
import { formatLanguage } from "../../utils/formatLanguage";

interface MovieSidebarProps {
  movie?: Movie;
  keywords: MovieKeyword[];
  links?: MovieLinks;
  homepage?: string;
}

export const MovieSidebar: React.FC<MovieSidebarProps> = ({
  movie,
  keywords,
  links,
  homepage,
}) => {
  const languages = [
    ...new Set([
      formatLanguage(movie?.original_language),
      ...(movie?.spoken_languages || []).map(
        (language) => language.english_name
      ),
    ]),
  ];
  const purple = useColorModeValue("purple.700", "purple.300");
  return (
    <VStack align="start" spacing={5}>
      <HStack flexWrap="wrap">
        {links?.facebook_id ? (
          <NextLink href={"https://www.facebook.com/" + links.facebook_id}>
            <IconButton
              variant="ghost"
              aria-label="facebook"
              size="sm"
              icon={<Icon as={FaFacebookSquare} color={purple} w={6} h={6} />}
            />
          </NextLink>
        ) : null}
        {links?.twitter_id ? (
          <NextLink href={"https://www.twitter.com/" + links.twitter_id}>
            <IconButton
              variant="ghost"
              aria-label="twitter"
              size="sm"
              icon={<Icon as={FaTwitter} color={purple} w={6} h={6} />}
            />
          </NextLink>
        ) : null}
        {links?.instagram_id ? (
          <NextLink href={"https://www.instagram.com/" + links.instagram_id}>
            <IconButton
              variant="ghost"
              aria-label="instagram"
              size="sm"
              icon={<Icon as={FaInstagram} color={purple} w={6} h={6} />}
            />
          </NextLink>
        ) : null}
        {links?.imdb_id ? (
          <NextLink href={"https://www.imdb.com/title/" + links.imdb_id}>
            <IconButton
              variant="ghost"
              aria-label="imdb"
              size="sm"
              icon={<Icon as={FaImdb} color={purple} w={6} h={6} />}
            />
          </NextLink>
        ) : null}
        {homepage ? (
          <NextLink href={homepage}>
            <IconButton
              variant="ghost"
              aria-label="homepage"
              size="sm"
              icon={<Icon as={FaHome} color={purple} w={6} h={6} />}
            />
          </NextLink>
        ) : null}
      </HStack>
      <Box>
        <Heading as="h4" color={purple} size="sm">
          Status
        </Heading>
        {movie?.status}
      </Box>
      <Box>
        <Heading as="h4" color={purple} size="sm">
          Original Language
        </Heading>
        {languages.join(", ")}
      </Box>
      <Box>
        <Heading as="h4" color={purple} size="sm">
          Budget
        </Heading>
        {movie?.budget ? `$${Number(movie.budget).toLocaleString("en")}` : "-"}
      </Box>
      <Box>
        <Heading as="h4" color={purple} size="sm">
          Revenue
        </Heading>
        {movie?.revenue
          ? `$${Number(movie.revenue).toLocaleString("en")}`
          : "-"}
      </Box>
      <Box>
        <Heading as="h4" color={purple} size="sm">
          Keywords
        </Heading>
        <Flex flexWrap="wrap">
          {keywords.length ? (
            keywords.map((keyword) => (
              <Tag
                key={keyword.id}
                colorScheme="purple"
                size="md"
                border="1px"
                mx="2px"
                my="4px"
              >
                {keyword.name}
              </Tag>
            ))
          ) : (
            <Text>No keywords have been added.</Text>
          )}
        </Flex>
      </Box>
    </VStack>
  );
};
