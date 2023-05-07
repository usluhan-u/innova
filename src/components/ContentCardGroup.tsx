import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentCardGroupType } from '../blocks';
import { ContentCard } from './ContentCard';
import { Template } from './Template';

export interface ContentCardGroupProps extends ContentCardGroupType {}

export const ContentCardGroup = ({
  items,
  backgroundColor,
  width
}: ContentCardGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      gap={4}
    >
      {items.map((item) => (
        <GridItem key={uuidv4()}>
          <ContentCard contentCard={item} />
        </GridItem>
      ))}
    </Grid>
  </Template>
);
