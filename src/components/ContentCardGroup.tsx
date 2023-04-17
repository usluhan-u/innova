import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentCardGroupType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { ContentCard } from './ContentCard';

export interface ContentCardGroupProps extends ContentCardGroupType {}

export const ContentCardGroup = ({
  items,
  backgroundColor,
  width
}: ContentCardGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={4}
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <ContentCard contentCard={item} />
          </GridItem>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
