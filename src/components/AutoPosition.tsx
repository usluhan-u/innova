import React from 'react';
import { ChakraProps, Flex } from '@chakra-ui/react';
import { Container } from './Container';

export interface AutoPositionProps extends ChakraProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AutoPosition = ({ children, ...rest }: AutoPositionProps) => (
  <Container>
    <Flex justify="center" my={8} {...rest}>
      {children}
    </Flex>
  </Container>
);
