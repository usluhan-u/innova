import {
  Box,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { FaArrowRight } from 'react-icons/fa';
import { CardType } from '../blocks';
import { Container } from './Container';
import { BackgroundColor } from './BackgroundColor';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface CardProps extends CardType {}

export const Card = ({ backgroundColor, card, width }: CardProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <Container>
      <Flex justify="center" my={8}>
        <ChakraCard w={{ base: 'full', md: width }} overflow="hidden">
          <Image
            objectFit="cover"
            src={card.image.url}
            alt={card.image.alt}
            h="2xs"
          />
          <CardBody>
            <Text>{card.title}</Text>
            <Flex pt={2} gap={2} alignItems="center">
              <Text color="text.secondary.100">
                {format(new Date(card.date), 'MMMM dd, yyyy')}
              </Text>
              {card.category && (
                <>
                  <Box
                    boxSize="2"
                    borderRadius="full"
                    bgColor="text.secondary.100"
                  />
                  <Text color="text.secondary.100">{card.category.label}</Text>
                </>
              )}
            </Flex>
          </CardBody>

          <CardFooter justify="space-between" flexWrap="wrap">
            <TextIconCallToAction
              {...card.callToAction}
              color="text.blue"
              icon={FaArrowRight}
            />
          </CardFooter>
        </ChakraCard>
      </Flex>
    </Container>
  </BackgroundColor>
);
