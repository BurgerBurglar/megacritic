import {
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Select,
  StackDivider,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext, useRef } from "react";
import { FaPalette } from "react-icons/fa";
import {
  SetColorSchemeContext,
  useColorSchemeContext,
} from "../contexts/ColorSchemeProvider";
import { useThemeColor } from "../hooks/useColors";
import { ColorScheme } from "../types/utils";
import { colorSchemes, maxW } from "../utils/constants";

const NavLink: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    as="a"
    py={1}
    px={{ base: 0, md: 2 }}
    rounded="md"
    _hover={{
      bg: useThemeColor(200),
    }}
    {...props}
  >
    {children}
  </Box>
);

const NavLinks: React.FC = () => (
  <>
    <NavLink>
      <NextLink href="/discover/movie">
        <Box>Discover</Box>
      </NextLink>
    </NavLink>
  </>
);

const ColorSchemeSelector: React.FC<{ colorScheme: ColorScheme }> = ({
  colorScheme,
}) => {
  const setColorScheme = useContext(SetColorSchemeContext)!;
  return (
    <HStack justify="space-between" w="full">
      <Text>Color Scheme</Text>
      <Select
        flex={1}
        bgColor={useThemeColor(100)}
        value={colorScheme}
        onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
      >
        {colorSchemes.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

const ThemeToggler: React.FC<{ colorScheme: ColorScheme }> = ({
  colorScheme,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack justify="space-between" w="full">
      <Text w="full">Light / Dark Mode</Text>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        aria-label="color mode"
        colorScheme={colorScheme}
        variant="outline"
        borderRadius="full"
        onClick={toggleColorMode}
      />
    </HStack>
  );
};
export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorScheme = useColorSchemeContext();
  const textColor = useThemeColor(900);
  const btnRef = useRef<any>();

  return (
    <Box
      as="nav"
      bg={useThemeColor(400, 900)}
      color={textColor}
      position="sticky"
      top={0}
      zIndex={9}
      py={2}
    >
      <Container maxW={maxW} display="flex" justifyContent="space-between">
        <Flex display={{ md: "none" }} w={10} h={10}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="drawer button"
            colorScheme={colorScheme}
            variant="ghost"
            onClick={onOpen}
          />
          <Drawer
            size="xs"
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg={useThemeColor(100)}>
              <DrawerHeader>
                <NextLink href="/">
                  <NavLink>
                    <Heading as="h1" size="md">
                      Megacritic
                    </Heading>
                  </NavLink>
                </NextLink>
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={2} divider={<StackDivider />} align="start">
                  <NavLinks />
                  <ColorSchemeSelector colorScheme={colorScheme} />
                  <ThemeToggler colorScheme={colorScheme} />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>

        <Flex className="nav-left" align="center">
          <NextLink href="/">
            <NavLink>
              <Heading as="h1" size="md">
                Megacritic
              </Heading>
            </NavLink>
          </NextLink>
          <Flex display={{ base: "none", md: "flex" }}>
            <NavLinks />
          </Flex>
        </Flex>
        <Flex
          className="center helper"
          visibility="hidden"
          display={{ md: "none" }}
          w={10}
          h={10}
        />
        <Flex
          className="menu-container"
          align="center"
          w="fit-content"
          display={{ base: "none", md: "flex" }}
        >
          <Menu closeOnSelect={false}>
            <MenuButton
              colorScheme={colorScheme}
              as={IconButton}
              variant="ghost"
              icon={<Icon as={FaPalette} color={textColor} />}
              aria-label="color scheme"
              rightIcon={<ChevronDownIcon />}
              p={4}
            />
            <MenuList bgColor={useThemeColor(100)} p={5}>
              <VStack divider={<StackDivider />}>
                <ColorSchemeSelector colorScheme={colorScheme} />
                <ThemeToggler colorScheme={colorScheme} />
              </VStack>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};
