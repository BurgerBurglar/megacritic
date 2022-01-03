import { ReactNode } from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";
import NextLink from "next/link";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("purple.100", "purple.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={10}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
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
                colorScheme="purple"
                size="md"
              />
            </NextLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
