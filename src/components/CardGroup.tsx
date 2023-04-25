import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardItem } from './Card';

export interface CardGroupProps {
  items: CardItem[];
}

export const CardGroup = ({ items }: CardGroupProps) => (
  <Grid
    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
    w="full"
    gap={6}
  >
    {items.map((item) => (
      <GridItem key={uuidv4()}>
        <Card card={item} />
      </GridItem>
    ))}
  </Grid>
);
