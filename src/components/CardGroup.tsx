import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './Card';
import { CardGroupType } from '../blocks';
import { BackgroundColor } from './BackgroundColor';
import { Container } from './Container';

export interface CardGroupProps extends CardGroupType {}

export const CardGroup = ({
  cards,
  backgroundColor,
  width
}: CardGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <Container>
      <Flex justify="center" my={8}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          w={width}
          flexShrink=""
        >
          {cards.map((card) => (
            <Card
              key={uuidv4()}
              blockType="card"
              backgroundColor={backgroundColor}
              width="100%"
              card={card.card}
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  </BackgroundColor>
);
