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
import { useThemeColor } from "../hooks/useColors";
import { THEME } from "../utils/constants";

const NavLink: React.FC = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useThemeColor(200),
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
      bg={useThemeColor(100)}
      color={useThemeColor(900)}
      position="sticky"
      top={0}
      zIndex={9}
      px={4}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          colorScheme={THEME}
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
            colorScheme={THEME}
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
