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
        WebkitLineClamp: `${lines}`,
        WebkitBoxOrient: "vertical",
      }}
      overflow="hidden"
      {...props}
    >
      {children}
    </Element>
  );
};