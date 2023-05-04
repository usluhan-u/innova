import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

export interface BackgroundColorProps extends Pick<FlexProps, 'bgColor'> {
  children: React.ReactNode | React.ReactNode[];
}

export const BackgroundColor = ({
  children,
  bgColor
}: BackgroundColorProps) => (
  <Flex boxSize="full" bgColor={bgColor}>
    {children}
  </Flex>
);
