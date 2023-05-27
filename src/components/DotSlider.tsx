import React from 'react';
import { Box, Flex, Image, Text, VStack, chakra } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import { DotSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export interface DotSliderProps extends DotSliderType {}

const VideoPlayer = chakra(ReactPlayer);

const Slide = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative" boxSize="full" overflow="hidden">
    {backgroundImage.mimeType.startsWith('image') && (
      <Image
        boxSize="full"
        objectFit="cover"
        src={backgroundImage.url}
        alt={backgroundImage.alt}
        transform="scale(1.2)"
        transition="all 1s"
      />
    )}
    {backgroundImage.mimeType.startsWith('video') && (
      <Box boxSize="full" pos="relative">
        <VideoPlayer
          width="100%"
          height="100%"
          pos="absolute"
          url={backgroundImage.url}
          volume={0}
          muted
          playing
          loop
          sx={{
            '&': {
              width: '100% !important',
              height: '100% !important',

              '& > video': {
                objectFit: 'cover'
              }
            }
          }}
        />
      </Box>
    )}
    <VStack
      align="flex-start"
      pos="absolute"
      w={{ base: 'xs', md: 'lg' }}
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
          bgColor="background.blue.100"
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

  return <Slider settings={{ dots: true }} slides={slides} height="90vh" />;
};
