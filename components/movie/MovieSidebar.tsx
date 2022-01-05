import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IconType } from "react-icons";
import {
  FaFacebookSquare,
  FaHome,
  FaImdb,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useColorSchemeContext } from "../../contexts/ColorSchemeProvider";
import { useThemeColor } from "../../hooks/useColors";
import { Movie, MovieKeyword, MovieLinks } from "../../types/Movie";
import { formatLanguage } from "../../utils/formatLanguage";

interface MovieSidebarProps {
  movie?: Movie;
  keywords: MovieKeyword[];
  links?: MovieLinks;
  homepage?: string;
}

interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  icon: IconType;
}

export const MovieSidebar: React.FC<MovieSidebarProps> = ({
  movie,
  keywords,
  links,
  homepage,
}) => {
  const colorScheme = useColorSchemeContext();
  const iconColor = useThemeColor(700);
  const languages = [
    ...new Set([
      formatLanguage(movie?.original_language),
      ...(movie?.spoken_languages || []).map(
        (language) => language.english_name
      ),
    ]),
  ];
  const SocialButton: React.FC<SocialButtonProps> = ({
    href,
    ariaLabel,
    icon,
  }) => {
    return (
      <NextLink href={href}>
        <IconButton
          variant="ghost"
          aria-label={ariaLabel}
          size="sm"
          icon={<Icon as={icon} color={iconColor} w={6} h={6} />}
        />
      </NextLink>
    );
  };

  const SideBarHeading: React.FC = ({ children }) => (
    <Heading as="h4" color={iconColor} size="sm">
      {children}
    </Heading>
  );
  return (
    <VStack align="start" spacing={5}>
      <HStack flexWrap="wrap">
        {links?.facebook_id ? (
          <SocialButton
            href={"https://www.facebook.com/" + links.facebook_id}
            ariaLabel="facebook"
            icon={FaFacebookSquare}
          />
        ) : null}
        {links?.twitter_id ? (
          <SocialButton
            href={"https://www.twitter.com/" + links.twitter_id}
            ariaLabel="twitter"
            icon={FaTwitter}
          />
        ) : null}
        {links?.instagram_id ? (
          <SocialButton
            href={"https://www.instagram.com/" + links.instagram_id}
            ariaLabel="instagram"
            icon={FaInstagram}
          />
        ) : null}
        {links?.imdb_id ? (
          <SocialButton
            href={"https://www.imdb.com/title/" + links.imdb_id}
            ariaLabel="imdb"
            icon={FaImdb}
          />
        ) : null}
        {homepage ? (
          <SocialButton href={homepage} ariaLabel="homepage" icon={FaHome} />
        ) : null}
      </HStack>
      <Box>
        <SideBarHeading>Status</SideBarHeading>
        {movie?.status}
      </Box>
      <Box>
        <SideBarHeading> Original Language</SideBarHeading>
        {languages.join(", ")}
      </Box>
      <Box>
        <SideBarHeading>Budget</SideBarHeading>
        {movie?.budget ? `$${Number(movie.budget).toLocaleString("en")}` : "-"}
      </Box>
      <Box>
        <SideBarHeading>Revenue</SideBarHeading>
        {movie?.revenue
          ? `$${Number(movie.revenue).toLocaleString("en")}`
          : "-"}
      </Box>
      <Box>
        <SideBarHeading>Keywords</SideBarHeading>
        <Flex flexWrap="wrap">
          {keywords.length ? (
            keywords.map((keyword) => (
              <Tag
                key={keyword.id}
                colorScheme={colorScheme}
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
