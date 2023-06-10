import React from 'react';
import { Flex } from '@chakra-ui/react';

export interface BackgroundImageProps {
  url: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const BackgroundImage = ({ url, children }: BackgroundImageProps) => (
  <Flex
    w="full"
    bgPos="center"
    bgRepeat="no-repeat"
    bgSize="cover"
    sx={{
      backgroundImage: `linear-gradient(0deg, rgba(9, 34, 50, 0.1), rgba(9, 34, 50, 0.1)), url("${url}")`
    }}
  >
    {children}
  </Flex>
);
