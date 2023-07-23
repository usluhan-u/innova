import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ArrowSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';
import { Overlay } from './Overlay';
import { Image } from './Image';

export interface ArrowSliderProps extends ArrowSliderType {}

const Slide = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative" boxSize="full" overflow="hidden">
    {backgroundImage.mimeType?.startsWith('image') && (
      <Overlay
        transition="transform 0.5s ease-in-out"
        _hover={{
          filter: 'blur(4px)',
          transform: 'scale(1.2)'
        }}
      >
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          boxSize="full"
          objectFit="cover"
        />
      </Overlay>
    )}
    <VStack
      align="flex-start"
      pos="absolute"
      w={{ base: 'xs' }}
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
          bgColor="background.blue.100"
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
