import { ChakraComponent, Text, TextProps, Tooltip } from "@chakra-ui/react";
import React from "react";
interface TextEllipseProps extends TextProps {
  Element?: ChakraComponent<any, any> | string;
  lines?: number;
  tooltip?: string;
}

export const TextEllipse: React.FC<TextEllipseProps> = ({
  Element = Text,
  lines = 2,
  children,
  tooltip,
  ...props
}) => {
  return (
    <Tooltip label={tooltip} openDelay={500}>
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
