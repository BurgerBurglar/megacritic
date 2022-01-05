import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { NextImage } from "../components/NextImage";
import { SearchBar } from "../components/SearchBar";
import { TextEllipse } from "../components/TextEllipse";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";
import { MovieOverview } from "../types/Movie";
import { maxW, PAGES_DISPLAY } from "../utils/constants";
import { formatDates } from "../utils/formatDates";
import { getPosterUrl } from "../utils/getUrl";
import { parseQuery } from "../utils/parseQuery";
import { getMovieOverviews } from "../utils/request";
interface Props {
  query: ParsedUrlQuery;
  overviews: MovieOverview[];
  totalPages: number;
}

const Search: NextPage<Props> = ({ query, overviews, totalPages }) => {
  const initialQuery = parseQuery(query, "query");
  const page = parseInt(parseQuery(query, "page")) || 1;

  const router = useRouter();
  const colorScheme = useColorSchemeContext();
  const borderColor = useTenShadesOfGray(200);
  const hoverColor = useThemeColor(50);
  const titleColor = useThemeColor(700);

  const emptyMessage =
    initialQuery.length === 0
      ? "What do you want to see?"
      : "No results have been found. Try again?";

  const firstPages = [...Array(totalPages).keys()]
    .slice(0, PAGES_DISPLAY)
    .map((p) => p + 1);
  const lastPage = totalPages > PAGES_DISPLAY ? totalPages : undefined;

  const goToPage = (toPage: number) => {
    if (toPage === page) return;
    Router.push({
      pathname: router.pathname,
      query: {
        ...query,
        page: toPage,
      },
    });
  };

  const NavigationButton: React.FC<ButtonProps & { toPage: number }> = ({
    children,
    toPage,
    ...props
  }) => (
    <Button
      size="sm"
      variant={children === page ? "solid" : "ghost"}
      colorScheme={colorScheme}
      {...props}
      onClick={() => goToPage(toPage)}
    >
      {children}
    </Button>
  );

  const shouldPrevious = page !== 1;
  const shouldNext = page < totalPages;

  const PageLinks: React.FC = () => (
    <HStack ml="auto">
      <>
        <NavigationButton isDisabled={!shouldPrevious} toPage={page - 1}>
          <ChevronLeftIcon /> Previous
        </NavigationButton>
        {firstPages.map((navPage) => (
          <NavigationButton key={navPage} toPage={navPage}>
            {navPage}
          </NavigationButton>
        ))}
        {lastPage ? (
          <>
            ...
            <NavigationButton toPage={lastPage}>{lastPage}</NavigationButton>
          </>
        ) : null}
        <NavigationButton isDisabled={!shouldNext} toPage={page + 1}>
          Next
          <ChevronRightIcon />
        </NavigationButton>
      </>
    </HStack>
  );

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
        {totalPages > 1 ? (
          <Flex w="full" mt={2}>
            <PageLinks />
          </Flex>
        ) : null}
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { overviews, totalPages } = await getMovieOverviews("search", query);
  return {
    props: {
      query,
      overviews,
      totalPages: totalPages || 0,
    },
  };
};
export default Search;
