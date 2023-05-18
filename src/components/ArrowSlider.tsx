import React from 'react';
import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ArrowSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';

export interface ArrowSliderProps extends ArrowSliderType {}

const Slide = ({
  backgroundMedia,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative" boxSize="full" overflow="hidden">
    {backgroundMedia.mimeType.startsWith('image') && (
      <Image
        boxSize="full"
        objectFit="cover"
        src={backgroundMedia.url}
        alt={backgroundMedia.alt}
        transition="transform 0.5s ease-in-out"
        _hover={{
          filter: 'blur(4px)',
          transform: 'scale(1.2)'
        }}
      />
    )}
    <VStack
      align="flex-start"
      pos="absolute"
      w="lg"
      color="text.light"
      transform={{
        base: 'translate(2rem, 17rem)',
        md: 'translate(5rem, 15rem)'
      }}
    >
      {title && (
        <Text fontWeight="medium" fontSize="4xl">
          {title}
        </Text>
      )}
      {description && (
        <Text fontWeight="normal" fontSize="lg">
          {description}
        </Text>
      )}
      {callToAction && Object.keys(callToAction).length > 0 && (
        <ButtonCallToAction
          {...callToAction}
          bgColor="background.blue"
          color="text.light"
        />
      )}
    </VStack>
  </Flex>
);

export const ArrowSlider = ({ slider }: ArrowSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return (
    <Slider
      settings={{ arrows: true, slidesToShow: 3 }}
      slides={slides}
      height="md"
    />
  );
};
