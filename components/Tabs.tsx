import {
  Box,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { MouseEvent, useState } from "react";
import { useTenShadesOfGray } from "../hooks/useColors";

interface TabsProps {
  header: string;
  tabs: string[];
  counts: (number | null)[];
  elements?: (JSX.Element | null)[];
}

export const Tabs: React.FC<TabsProps> = ({
  header,
  tabs,
  counts,
  elements,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeTabColor = useTenShadesOfGray(800);

  const getTabs = () => {
    const activeBarProps = {
      _after: {
        content: "''",
        w: "full",
        h: "5px",
        bgColor: activeTabColor,
        position: "absolute",
        left: 0,
        bottom: "-10px",
      },
    };
    const handleTabClick = (e: MouseEvent<HTMLHeadingElement>) => {
      const tab = e.currentTarget.getAttribute("data-id")!;
      setActiveTab(parseInt(tab));
    };
    return tabs.map((tab, i) => (
      <Heading
        key={i}
        data-id={i}
        as="h4"
        size="sm"
        position="relative"
        margin="10px 0"
        onClick={handleTabClick}
        {...(activeTab === i ? activeBarProps : null)}
      >
        {tab}
        <Box as="span" color="gray.500" ml={1}>
          {counts[i]}
        </Box>
      </Heading>
    ));
  };

  return (
    <Flex direction="column" w="100%">
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        align={{
          base: "start",
          md: "center",
        }}
        mb={3}
      >
        <Heading as="h3" size="md" mr={20}>
          {header}
        </Heading>
        <HStack
          maxW="100%"
          flexWrap="wrap"
          spacing={{
            base: 2,
            md: 8,
          }}
        >
          {getTabs()}
        </HStack>
      </Flex>
      {elements ? elements[activeTab] : null}
    </Flex>
  );
};
