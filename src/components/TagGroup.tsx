import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { TagGroupType } from '../blocks';
import { Tag } from './Tag';
import { Template } from './Template';

export interface TagGroupProps extends TagGroupType {}

export const TagGroup = ({ backgroundColor, width, items }: TagGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      w="full"
      gap={6}
    >
      {items.map((item) => (
        <GridItem key={uuidv4()}>
          <Tag tag={item} />
        </GridItem>
      ))}
    </Grid>
  </Template>
);
