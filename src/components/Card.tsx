import React from 'react';
import {
  AspectRatio,
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
import { InternalLink } from './InternalLink';

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
    <AspectRatio ratio={16 / 9}>
      <Image
        objectFit="fill"
        src={card.image.url}
        alt={card.image.alt}
        h="2xs"
      />
    </AspectRatio>
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
              <InternalLink slug={card.category.slug} color="text.blue">
                {card.category.name}
              </InternalLink>
            </>
          )}
        </Flex>
      </Box>
    </ChakraCardBody>
    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {card.callToAction && Object.keys(card.callToAction).length > 0 && (
        <TextIconCallToAction
          {...card.callToAction}
          color="text.blue"
          icon={FiArrowRight}
        />
      )}
    </ChakraCardFooter>
  </ChakraCard>
);
