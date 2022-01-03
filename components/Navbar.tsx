import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

const NavLink: React.FC = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("purple.200", "purple.800"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
interface NavbarProps {}

const navLinks = () => (
  <>
    <NavLink>
      <NextLink href="/discover/movie">
        <Box>Discover</Box>
      </NextLink>
    </NavLink>
  </>
);

export const Navbar: React.FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      bg={useColorModeValue("purple.100", "purple.900")}
      color={useColorModeValue("purple.900", "purple.100")}
      position="sticky"
      top={0}
      zIndex={9}
      px={4}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          colorScheme="purple"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <NavLink>
            <NextLink href="/">
              <Heading as="h1" size="md">
                Megacritic
              </Heading>
            </NextLink>
          </NavLink>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {navLinks()}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="color mode"
            colorScheme="purple"
            variant="outline"
            borderRadius="full"
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {navLinks()}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
