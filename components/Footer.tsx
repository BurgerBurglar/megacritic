import { Box, Container, IconButton, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { useColorSchemeContext } from "../contexts/ColorSchemeProvider";
import { useTenShadesOfGray, useThemeColor } from "../hooks/useColors";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export const Footer: React.FC = () => {
  const colorScheme = useColorSchemeContext();
  return (
    <Box bg={useThemeColor(100)} color={useTenShadesOfGray(700)} mt={10}>
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useTenShadesOfGray(200)}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>
            © I don&rsquo;t know what to put in a footer. I guess all rights
            reserved or something.
          </Text>
          <Stack direction={"row"} spacing={6}>
            <NextLink href="https://github.com/BurgerBurglar">
              <IconButton
                icon={<FaGithub />}
                aria-label="GitHub"
                borderRadius="full"
                variant="outline"
                colorScheme={colorScheme}
                size="md"
              />
            </NextLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
