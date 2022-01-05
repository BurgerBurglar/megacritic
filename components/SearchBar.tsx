import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { useTenShadesOfGray } from "../hooks/useColors";
import { useSearch } from "../hooks/useSearch";

interface SearchBarProps {
  initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialQuery }) => {
  const { newQuery, setNewQuery, search } = useSearch(initialQuery);
  const colorScheme = useColorSchemeContext();

  return (
    <Flex>
      <InputGroup mb={5} color={useTenShadesOfGray(600)} mr={1}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="star wars y:1977"
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && search()}
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
      <Button variant="outline" colorScheme={colorScheme}>
        Search
      </Button>
    </Flex>
  );
};
