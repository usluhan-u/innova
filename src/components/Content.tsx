import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { BackgroundColor } from './BackgroundColor';
import { RichText } from './RichText';

export interface ContentProps extends ContentType {}

export const Content = ({ columns, backgroundColor }: ContentProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    {columns.map((column) => (
      <Flex key={uuidv4()} w={column.width} justify={column.align}>
        <RichText content={column.content} />
      </Flex>
    ))}
  </BackgroundColor>
);
