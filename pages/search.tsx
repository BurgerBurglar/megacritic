import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { KeyboardEvent, useState } from "react";
import { NextImage } from "../components/NextImage";
import { TextEllipse } from "../components/TextEllipse";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";
import { MovieOverview } from "../types/Movie";
import { formatDates } from "../utils/formatDates";
import { getPosterUrl } from "../utils/getUrl";
import { getMovieOverviews } from "../utils/request";
interface Props {
  overviews: MovieOverview[];
  totalPages: number;
}
const Search: NextPage<Props> = ({ overviews, totalPages }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const borderColor = useTenShadesOfGray(200);
  const hoverColor = useThemeColor(100);
  const titleColor = useThemeColor(700);
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && router.push(`/search?query=${query}`);

  return (
    <>
      <Container maxW="container.xl">
        <InputGroup mb={5}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="star wars y:1977"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleEnter}
          />
        </InputGroup>
        <VStack w="full">
          {overviews.map((movie) => (
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
                      <TextEllipse fontSize="sm">{movie.overview}</TextEllipse>
                    </Flex>
                  </Flex>
                </a>
              </NextLink>
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { overviews, totalPages } = await getMovieOverviews("search", query);
  return { props: { overviews, totalPages } };
};
export default Search;
