import {
  Box,
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardFooter as ChakraCardFooter,
  Flex,
  Image,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { FaArrowRight } from 'react-icons/fa';
import { TextIconCallToAction } from './TextIconCallToAction';
import { CardGroupItemType } from '../blocks';

export interface CardProps {
  card: CardGroupItemType;
}

export const Card = ({ card }: CardProps) => (
  <ChakraCard overflow="hidden">
    <Image
      objectFit="cover"
      src={card.image.url}
      alt={card.image.alt}
      h="2xs"
    />
    <ChakraCardBody>
      <Text>{card.title}</Text>
      <Flex pt={2} gap={2} alignItems="center">
        <Text color="text.secondary.100">
          {format(new Date(card.date), 'MMMM dd, yyyy')}
        </Text>
        {card.category && (
          <>
            <Box boxSize="2" borderRadius="full" bgColor="text.secondary.100" />
            <Text color="text.secondary.100">{card.category.label}</Text>
          </>
        )}
      </Flex>
    </ChakraCardBody>

    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {card.callToActionToggle.enableCallToAction &&
        card.callToActionToggle.callToAction && (
          <TextIconCallToAction
            {...card.callToActionToggle.callToAction}
            color="text.blue"
            icon={FaArrowRight}
          />
        )}
    </ChakraCardFooter>
  </ChakraCard>
);
