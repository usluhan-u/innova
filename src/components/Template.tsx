import { Container, ContainerProps } from '@chakra-ui/react';
import { BackgroundColor } from './BackgroundColor';

export interface TemplateProps extends Omit<ContainerProps, 'maxW'> {
  children: React.ReactNode | React.ReactNode[];
  backgroundColor: string;
}

export const Template = ({
  children,
  backgroundColor,
  ...rest
}: TemplateProps) => (
  <BackgroundColor backgroundColor={backgroundColor}>
    <Container
      maxW={{ base: 'full', md: '90%' }}
      display="flex"
      alignItems="center"
      {...rest}
    >
      {children}
    </Container>
  </BackgroundColor>
);
