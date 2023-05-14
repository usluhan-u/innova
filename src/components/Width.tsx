import { Flex } from '@chakra-ui/react';
import { WidthType } from '../fields';

interface WidthProps {
  children: React.ReactNode | React.ReactNode[];
  value: WidthType;
}

export const Width = ({ children, value }: WidthProps) => (
  <Flex w={{ base: 'full', md: value }}>{children}</Flex>
);
