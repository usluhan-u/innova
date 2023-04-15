import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { SmallCardsType } from '../blocks';
import { RichText } from './RichText';
import { SingleSmallCard } from './SingleSmallCard';

export interface SmallCardsProps extends SmallCardsType {}

export const SmallCards = ({ header, smallCards }: SmallCardsProps) => (
  <Flex
    gap={{ base: 6, md: 8 }}
    flexDirection="column"
    alignItems={{ base: 'center', md: 'normal' }}
    w="full"
  >
    {header && (
      <RichText content={header.content} textAlign={header.alignment} />
    )}
    <Flex
      gap={{ base: 6, md: 8 }}
      flexDirection={{ base: 'column', md: 'row' }}
      flexWrap={{ base: 'nowrap', md: 'wrap' }}
    >
      {smallCards.map((smallCard) => (
        <SingleSmallCard
          key={uuidv4()}
          media={smallCard.media}
          title={smallCard.title}
          content={smallCard.content}
        />
      ))}
    </Flex>
  </Flex>
);
