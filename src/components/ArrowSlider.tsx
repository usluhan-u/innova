import React from 'react';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ArrowSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';
import { Overlay } from './Overlay';
import { VideoPlayer } from './VideoPlayer';
import { isMobileOS } from '../utils';

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
          boxSize="full"
          objectFit="fill"
          src={backgroundImage.url}
          alt={backgroundImage.alt}
        />
      </Overlay>
    )}
    {backgroundImage.mimeType.startsWith('video') && (
      <Box boxSize="full" pos="relative">
        <VideoPlayer
          pos="absolute"
          url={backgroundImage.url}
          muted
          autoPlay
          loop
          controls={isMobileOS()}
        />
      </Box>
    )}
    <VStack
      align="flex-start"
      pos="absolute"
      w={{ base: '2xs', md: 'xs' }}
      color="text.light"
      transform={{
        base: 'translate(2rem, 16rem)',
        md: 'translate(5rem, 15rem)'
      }}
    >
      {title && (
        <Text fontWeight="medium" fontSize={{ base: '2xl', md: '4xl' }}>
          {title}
        </Text>
      )}
      {description && (
        <Text fontWeight="normal" fontSize={{ base: 'md', md: 'lg' }}>
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
