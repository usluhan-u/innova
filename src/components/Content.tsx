import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { RichText } from './RichText';
import { Template } from './Template';

export interface ContentProps extends ContentType {}

export const Content = ({ backgroundColor, width, columns }: ContentProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
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
          <Flex w="full" justify="center" textAlign={column.align}>
            <RichText content={column.content} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  </Template>
);
