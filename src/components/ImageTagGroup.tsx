import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ImageTagGroupType } from '../blocks';
import { ImageTag } from './ImageTag';
import { Template } from './Template';

export interface ImageTagGroupProps extends ImageTagGroupType {}

export const ImageTagGroup = ({
  backgroundColor,
  width,
  items
}: ImageTagGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
      gap={6}
    >
      {items.map((item) => (
        <GridItem key={uuidv4()}>
          <ImageTag imageTag={item} />
        </GridItem>
      ))}
    </Grid>
  </Template>
);
