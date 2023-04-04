import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { CardsType } from '../blocks';
import { SingleCard } from './SingleCard';

export interface CardProps extends CardsType {}

export const Cards = ({ cards }: CardProps) => (
  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
    {cards.map((card) => (
      <GridItem key={uuidv4()}>
        <SingleCard
          category={card.category}
          header={card.header}
          internalLink={card.internalLink}
          media={card.media}
          publishDate={card.publishDate}
        />
      </GridItem>
    ))}
  </Grid>
);
