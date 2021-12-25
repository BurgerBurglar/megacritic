import { ComponentWithAs, Text, TextProps } from "@chakra-ui/react";
import React from "react";

interface TextElipseProps extends TextProps {
  Element?: ComponentWithAs<"p", TextProps>;
  lines?: number;
}

export const TextElipse: React.FC<TextElipseProps> = ({
  Element = Text,
  lines = 2,
  children,
  ...props
}) => {
  return (
    <Element
      display="-webkit-box"
      css={{
        "-webkit-line-clamp": `${lines}`,
        "-webkit-box-orient": "vertical",
      }}
      overflow="hidden"
      {...props}
    >
      {children}
    </Element>
  );
};
