import { Flex } from '@chakra-ui/react';
import { TabsType } from '../blocks';

export interface TabsProps extends TabsType {}

export const Tabs = ({ bgColor }: TabsProps) => (
  <Flex bgColor={bgColor}>Tabs</Flex>
);
