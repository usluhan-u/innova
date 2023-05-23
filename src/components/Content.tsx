import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { RichText } from './RichText';
import { Template } from './Template';

export interface ContentProps extends ContentType {
  maxWidth?: string;
}

export const Content = ({
  backgroundColor,
  width,
  columns,
  maxWidth
}: ContentProps) => (
  <Template backgroundColor={backgroundColor} width={width} maxWidth={maxWidth}>
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: `repeat(${columns.length}, 1fr)`
      }}
      w="full"
      gap={6}
    >
      {columns.map((column) => (
        <GridItem key={uuidv4()}>
          <Flex justify={column.align} textAlign={column.align} w="full">
            <RichText content={column.content} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  </Template>
);
