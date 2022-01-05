import { AspectRatio, Box, BoxProps } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";
import React from "react";

interface NextImageProps extends BoxProps {
  src: string;
  alt?: string;
  ratio?: number;
  imageProps?: Partial<ImageProps>;
}

export const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  ratio,
  imageProps,
  ...props
}) => {
  return (
    <AspectRatio ratio={ratio} {...props}>
      <Box className="image-wrapper" position="relative" w="100%" h="100%">
        <Image src={src} alt={alt} layout="fill" {...imageProps} />
      </Box>
    </AspectRatio>
  );
};
