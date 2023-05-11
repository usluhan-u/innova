import React from 'react';
import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { DotSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';

export interface DotSliderProps extends DotSliderType {}

const Slide = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative" boxSize="full">
    <Image
      boxSize="full"
      objectFit="cover"
      src={backgroundImage.url}
      alt={backgroundImage.alt}
    />
    <VStack
      align="flex-start"
      pos="absolute"
      w="lg"
      color="text.light"
      top="30%"
      left="10%"
      transform="translateY(-30%)"
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

export const DotSlider = ({ slider }: DotSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return <Slider settings={{ dots: true }} slides={slides} height="7xl" />;
};
