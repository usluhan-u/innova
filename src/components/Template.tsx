import React from 'react';
import { Flex } from '@chakra-ui/react';
import { BackgroundColorType, WidthType } from '../fields';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';

export interface TemplateProps {
  backgroundColor: BackgroundColorType;
  width: WidthType;
  children: React.ReactNode | React.ReactNode[];
}

export const Template = ({
  backgroundColor,
  width,
  children
}: TemplateProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Flex w={{ base: 'full', md: width }}>{children}</Flex>
    </AutoPosition>
  </BackgroundColor>
);
