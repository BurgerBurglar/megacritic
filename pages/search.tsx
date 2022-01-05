import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { ParsedUrlQuery } from "querystring";
import { NextImage } from "../components/NextImage";
import { SearchBar } from "../components/SearchBar";
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
  const initialQuery = (JSON.stringify(query?.query) || "").replaceAll('"', "");

  const borderColor = useTenShadesOfGray(200);
  const hoverColor = useThemeColor(50);
  const titleColor = useThemeColor(700);

  const emptyMessage =
    initialQuery.length === 0
      ? "What do you want to see?"
      : "No results have been found. Try again?";

  return (
    <>
      <Head>
        <title>{initialQuery ? initialQuery : "Search"} - Megacritic</title>
      </Head>
      <Container maxW={maxW}>
        <SearchBar initialQuery={initialQuery} />
        <VStack w="full">
          {overviews.length === 0 ? (
            <Text>{emptyMessage}</Text>
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
  if (Object.keys(query).length === 0 || !query.query || !query.query.length)
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
