import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ImageTagGroupType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { ImageTag } from './ImageTag';

export interface ImageTagGroupProps extends ImageTagGroupType {}

export const ImageTagGroup = ({
  backgroundColor,
  width,
  items
}: ImageTagGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={6}
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <Flex h={32}>
              <ImageTag imageTag={item} />
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
