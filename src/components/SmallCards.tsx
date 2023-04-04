import { VStack, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { SmallCardsType } from '../blocks';
import { RichText } from './RichText';
import { SingleSmallCard } from './SingleSmallCard';

export interface SmallCardsProps extends SmallCardsType {}

export const SmallCards = ({ header, smallCards }: SmallCardsProps) => (
  <VStack gap={8}>
    {header && (
      <RichText content={header.content} textAlign={header.alignment} />
    )}
    <Grid templateColumns="repeat(4, 1fr)" gap={8}>
      {smallCards.map((smallCard) => (
        <GridItem key={uuidv4()}>
          <SingleSmallCard
            media={smallCard.media}
            title={smallCard.title}
            content={smallCard.content}
          />
        </GridItem>
      ))}
    </Grid>
  </VStack>
);
