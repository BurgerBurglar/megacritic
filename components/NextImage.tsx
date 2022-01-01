import { Box, BoxProps } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import React from "react";

interface NextImageProps extends BoxProps {
  src: string;
  alt?: string;
  imageProps?: Partial<ImageProps>;
}

export const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  imageProps,
  ...props
}) => {
  return (
    <Box
      className="image-wrapper"
      w="100%"
      h="100%"
      position="relative"
      {...props}
    >
      <Image src={src} alt={alt} layout="fill" {...imageProps} />
    </Box>
  );
};
