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
import { FiArrowRight } from 'react-icons/fi';
import { TextIconCallToAction } from './TextIconCallToAction';
import { CategoryType } from '../collections';
import { CallToActionType, UploadedMediaType } from '../fields';

export interface CardItem {
  title: string;
  date: string;
  category?: CategoryType;
  image: UploadedMediaType;
  callToAction?: CallToActionType;
  // callToAction?: {
  //   label: string;
  //   type: 'page' | 'custom';
  //   page?: {
  //     slug: string;
  //   };
  //   url?: string;
  // };
}

export interface CardProps {
  card: CardItem;
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
            <Text color="text.secondary.100">{card.category.name}</Text>
          </>
        )}
      </Flex>
    </ChakraCardBody>
    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {card.callToAction && Object.keys(card.callToAction) && (
        <TextIconCallToAction
          {...card.callToAction}
          color="text.blue"
          icon={FiArrowRight}
        />
      )}
    </ChakraCardFooter>
  </ChakraCard>
);
