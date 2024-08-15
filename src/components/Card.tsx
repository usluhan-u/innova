import React from 'react';
import {
  AspectRatio,
  Box,
  chakra,
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardFooter as ChakraCardFooter,
  Flex,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { FiArrowRight } from 'react-icons/fi';
import NextImage from 'next/image';
import { TextIconCallToAction } from './TextIconCallToAction';
import { CategoryType } from '../collections';
import { CallToActionType, UploadedMediaType } from '../fields';
import { Language } from '../contexts';
import { InternalLink } from './InternalLink';
import { CallToAction } from './CallToAction';

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

const Image = chakra(NextImage);

export const Card = ({ card, locale }: CardProps) => (
  <ChakraCard overflow="hidden">
    {card.callToAction ? (
      <CallToAction {...card.callToAction}>
        <AspectRatio
          ratio={16 / 9}
          sx={{
            '& > img': {
              objectFit: 'inherit'
            }
          }}
        >
          <Image
            layout="fill"
            src={card.image.url}
            alt={card.image.alt}
            h="2xs"
          />
        </AspectRatio>
      </CallToAction>
    ) : (
      <AspectRatio
        ratio={16 / 9}
        sx={{
          '& > img': {
            objectFit: 'inherit'
          }
        }}
      >
        <Image
          layout="fill"
          src={card.image.url}
          alt={card.image.alt}
          h="2xs"
        />
      </AspectRatio>
    )}
    <ChakraCardBody>
      <Box w="full" h="20">
        {card.callToAction ? (
          <CallToAction {...card.callToAction}>
            <Text>{card.title}</Text>
          </CallToAction>
        ) : (
          <Text>{card.title}</Text>
        )}
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
