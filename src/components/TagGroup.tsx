import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { TagGroupType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { Tag } from './Tag';

export interface TagGroupProps extends TagGroupType {}

export const TagGroup = ({ backgroundColor, width, items }: TagGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={6}
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <Tag tag={item} />
          </GridItem>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
