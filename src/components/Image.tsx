import React from 'react';
import NextImage from 'next/image';
import { Box, BoxProps, chakra } from '@chakra-ui/react';

interface ImageProps extends BoxProps {
  src: string;
  alt: string;
}

const ChakraStyledNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ['src', 'alt', 'fill', 'width', 'height'].includes(prop)
});

export const Image = ({
  alt,
  src,
  objectFit,
  borderRadius,
  ...rest
}: ImageProps) => (
  <Box pos="relative" boxSize="full" {...rest}>
    <ChakraStyledNextImage
      alt={alt}
      src={src}
      objectFit={objectFit}
      borderRadius={borderRadius}
      fill="true"
    />
  </Box>
);
