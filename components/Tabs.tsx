import { Flex, Heading, HStack } from "@chakra-ui/react";
import React, { MouseEvent, useState } from "react";

interface TabsProps {
  header: string;
  tabs: string[];
  elements?: (JSX.Element | null)[];
}

export const Tabs: React.FC<TabsProps> = ({ header, tabs, elements }) => {
  const [activeTab, setActiveTab] = useState(0);

  const getTabs = () => {
    const activeBarProps = {
      _after: {
        content: "''",
        w: "full",
        h: "5px",
        bgColor: "black",
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
        onClick={handleTabClick}
        {...(activeTab === i ? activeBarProps : null)}
      >
        {tab}
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
