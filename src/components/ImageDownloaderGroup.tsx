import { Flex, Grid } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ImageDownloaderGroupType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { ImageDownloader } from './ImageDownloader';

export interface ImageDownloaderGroupProps extends ImageDownloaderGroupType {}

export const ImageDownloaderGroup = ({
  backgroundColor,
  items,
  width
}: ImageDownloaderGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={6}
      >
        {items.map((item) => (
          <Flex key={uuidv4()} boxSize="32">
            <ImageDownloader imageDownloader={item} />
          </Flex>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
