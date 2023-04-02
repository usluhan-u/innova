import { Container, ContainerProps, Flex } from '@chakra-ui/react';

export interface TemplateProps extends Omit<ContainerProps, 'maxW'> {
  children: React.ReactNode | React.ReactNode[];
}

export const Template = ({ children, ...rest }: TemplateProps) => (
  <Flex alignItems="center" justifyContent="center">
    <Container maxW="90rem" display="flex" alignItems="center" {...rest}>
      {children}
    </Container>
  </Flex>
);
