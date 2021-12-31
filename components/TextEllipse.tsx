import { ChakraComponent, Text, TextProps, Tooltip } from "@chakra-ui/react";
import React from "react";
interface TextEllipseProps extends TextProps {
  Element?: ChakraComponent<any, any> | string;
  lines?: number;
}

export const TextEllipse: React.FC<TextEllipseProps> = ({
  Element = Text,
  lines = 2,
  children,
  ...props
}) => {
  return (
    <Tooltip label={children?.toString()} openDelay={500}>
      <Element
        display="-webkit-box"
        css={{
          WebkitLineClamp: `${lines}`,
          WebkitBoxOrient: "vertical",
        }}
        overflow="hidden"
        {...props}
      >
        {children}
      </Element>
    </Tooltip>
  );
};
