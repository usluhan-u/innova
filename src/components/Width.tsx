import React from 'react';
import { Flex } from '@chakra-ui/react';
import { WidthType } from '../fields';

interface WidthProps {
  children: React.ReactNode | React.ReactNode[];
  value: WidthType;
  max?: string;
}

export const Width = ({ children, value, max }: WidthProps) => (
  <Flex w={{ base: 'full', md: value }} maxW={max}>
    {children}
  </Flex>
);
