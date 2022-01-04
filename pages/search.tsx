import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { KeyboardEvent, useState } from "react";
import { NextImage } from "../components/NextImage";
import { TextEllipse } from "../components/TextEllipse";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";
import { MovieOverview } from "../types/Movie";
import { maxW } from "../utils/constants";
import { formatDates } from "../utils/formatDates";
import { getPosterUrl } from "../utils/getUrl";
import { getMovieOverviews } from "../utils/request";
interface Props {
  query: ParsedUrlQuery;
  overviews: MovieOverview[];
  totalPages: number;
}
const Search: NextPage<Props> = ({ query, overviews, totalPages }) => {
  const [newQuery, setNewQuery] = useState(
    JSON.stringify(query?.query).replaceAll('"', "")
  );
  const [title, setTitle] = useState("Search");
  const router = useRouter();
  const borderColor = useTenShadesOfGray(200);
  const hoverColor = useThemeColor(100);
  const titleColor = useThemeColor(700);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${newQuery}`);
      setTitle(newQuery);
    }
  };

  return (
    <>
      <Head>
        <title>{title} - Megacritic</title>
      </Head>
      <Container maxW={maxW}>
        <InputGroup mb={5} color={useTenShadesOfGray(600)}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="star wars y:1977"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            onKeyPress={handleEnter}
          />
          <InputRightElement>
            <IconButton
              icon={<CloseIcon />}
              aria-label="clear"
              variant="unstyled"
              onClick={() => setNewQuery("")}
            />
          </InputRightElement>
        </InputGroup>
        <VStack w="full">
          {overviews.length === 0 ? (
            <Text>What do you want to see?</Text>
          ) : (
            overviews.map((movie) => (
              <Box key={movie.id} w="full">
                <NextLink href={`/movie/${movie.id}`} passHref>
                  <a>
                    <Flex
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      shadow="md"
                      w="full"
                      p={3}
                      _hover={{
                        transition: "all .4s ease",
                        bgColor: hoverColor,
                      }}
                    >
                      <NextImage
                        src={getPosterUrl(movie.poster_path)}
                        alt={movie.title}
                        w="100px"
                        h="150px"
                      />
                      <Flex direction="column" justify="center" w="full" ml={3}>
                        <Box mb={3}>
                          <Heading as="h3" size="md" color={titleColor}>
                            {movie.title}
                          </Heading>
                          <Text color="gray.500" size="sm">
                            {formatDates(movie.release_date)}
                          </Text>
                        </Box>
                        <TextEllipse fontSize="sm">
                          {movie.overview}
                        </TextEllipse>
                      </Flex>
                    </Flex>
                  </a>
                </NextLink>
              </Box>
            ))
          )}
        </VStack>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  if (Object.keys(query).length === 0)
    // WTF JavaScript
    return {
      props: {
        query,
        overviews: [],
        totalPages: 0,
      },
    };
  const { overviews, totalPages } = await getMovieOverviews("search", query);
  return {
    props: {
      query,
      overviews,
      totalPages,
    },
  };
};
export default Search;
