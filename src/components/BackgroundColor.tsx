import { Flex, FlexProps } from '@chakra-ui/react';

interface BackgroundColorProps extends Pick<FlexProps, 'backgroundColor'> {
  children: React.ReactNode | React.ReactNode[];
}

export const BackgroundColor = ({
  children,
  backgroundColor
}: BackgroundColorProps) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    backgroundColor={backgroundColor}
  >
    {children}
  </Flex>
);
