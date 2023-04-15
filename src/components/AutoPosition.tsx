import { Flex } from '@chakra-ui/react';
import { Container } from './Container';

export interface AutoPositionProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AutoPosition = ({ children }: AutoPositionProps) => (
  <Container>
    <Flex justify="center" my={8}>
      {children}
    </Flex>
  </Container>
);
