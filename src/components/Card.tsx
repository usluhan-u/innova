import React from 'react';
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
import { tr, enUS } from 'date-fns/locale';
import { FiArrowRight } from 'react-icons/fi';
import { TextIconCallToAction } from './TextIconCallToAction';
import { CategoryType } from '../collections';
import { CallToActionType, UploadedMediaType } from '../fields';
import { Language } from '../contexts';

export interface CardItem {
  title: string;
  date: string;
  category?: CategoryType;
  image: UploadedMediaType;
  callToAction?: CallToActionType;
}

export interface CardProps {
  card: CardItem;
  locale: Language;
}

export const Card = ({ card, locale }: CardProps) => (
  <ChakraCard overflow="hidden">
    <Image
      objectFit="cover"
      src={card.image.url}
      alt={card.image.alt}
      h="2xs"
    />
    <ChakraCardBody>
      <Box w="full" h="20">
        <Text>{card.title}</Text>
        <Flex pt={2} gap={2} alignItems="center">
          <Text color="text.secondary.100">
            {format(new Date(card.date), 'PP', {
              locale: locale === 'tr' ? tr : enUS
            })}
          </Text>
          {card.category && (
            <>
              <Box
                boxSize="2"
                borderRadius="full"
                bgColor="text.secondary.100"
              />
              <Text color="text.secondary.100">{card.category.name}</Text>
            </>
          )}
        </Flex>
      </Box>
    </ChakraCardBody>
    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {card.callToAction && Object.keys(card.callToAction).length > 0 && (
        <TextIconCallToAction
          {...card.callToAction}
          color="text.dark"
          icon={FiArrowRight}
        />
      )}
    </ChakraCardFooter>
  </ChakraCard>
);
