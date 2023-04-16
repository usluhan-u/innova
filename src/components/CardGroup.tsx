import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './Card';
import { CardGroupType } from '../blocks';
import { BackgroundColor } from './BackgroundColor';
import { AutoPosition } from './AutoPosition';

export interface CardGroupProps extends CardGroupType {}

export const CardGroup = ({
  items,
  backgroundColor,
  width
}: CardGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={6}
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <Card card={item} />
          </GridItem>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
