import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface NextImageProps extends BoxProps {
  src: string;
  alt?: string;
}

export const NextImage: React.FC<NextImageProps> = ({ src, alt, ...props }) => {
  return (
    <Box w="100%" h="100%" position="relative" {...props}>
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </Box>
  );
};
