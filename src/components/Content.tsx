import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { RichText, RichTextNode } from './RichText';

type width = 'oneThird' | 'half' | 'twoThirds' | 'full';
type alignment = 'left' | 'center' | 'right';

export interface ContentColumn {
  width: width;
  alignment: alignment;
  content: RichTextNode[];
}

export interface ContentProps {
  blockType: 'content';
  columns: ContentColumn[];
}

export const Content = ({ columns }: ContentProps) => {
  const getWidth = (width: width) => {
    const widthMap = {
      oneThird: '33%',
      half: '50%',
      twoThirds: '66%',
      full: '100%'
    };

    return widthMap[width] || widthMap.full;
  };

  return (
    <Grid templateColumns={`repeat(${columns.length}, 1fr)`} gap={8}>
      {columns.map((column) => (
        <GridItem key={uuidv4()} w={getWidth(column.width)}>
          <RichText content={column.content} textAlign={column.alignment} />
        </GridItem>
      ))}
    </Grid>
  );
};
