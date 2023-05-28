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
    style={{ backgroundImage: `url("${url}")` }}
  >
    {children}
  </Flex>
);
