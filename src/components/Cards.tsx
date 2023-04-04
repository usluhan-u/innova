import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { CardsType } from '../blocks';
import { SingleCard } from './SingleCard';

export interface CardProps extends CardsType {}

export const Cards = ({ cards }: CardProps) => (
  <Flex gap={{ base: 2, md: 6 }} flexDirection={{ base: 'column', md: 'row' }}>
    {cards.map((card) => (
      <SingleCard
        key={uuidv4()}
        category={card.category}
        header={card.header}
        internalLink={card.internalLink}
        media={card.media}
        publishDate={card.publishDate}
      />
    ))}
  </Flex>
);
