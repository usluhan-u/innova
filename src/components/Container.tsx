import React from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';

export interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Container = ({ children }: ContainerProps) => (
  <ChakraContainer maxW={{ base: 'full', md: '90%' }}>
    {children}
  </ChakraContainer>
);
