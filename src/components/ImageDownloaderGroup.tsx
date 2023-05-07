import React from 'react';
import { Grid } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ImageDownloaderGroupType } from '../blocks';
import { ImageDownloader } from './ImageDownloader';
import { Template } from './Template';

export interface ImageDownloaderGroupProps extends ImageDownloaderGroupType {}

export const ImageDownloaderGroup = ({
  backgroundColor,
  items,
  width
}: ImageDownloaderGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
      w="full"
      gap={6}
    >
      {items.map((item) => (
        <ImageDownloader key={uuidv4()} imageDownloader={item} />
      ))}
    </Grid>
  </Template>
);
