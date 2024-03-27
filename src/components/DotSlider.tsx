import React from 'react';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { DotSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';
import { Overlay } from './Overlay';
import { VideoPlayer } from './VideoPlayer';
import { isMobileOS } from '../utils';

export interface DotSliderProps extends DotSliderType {}

const SlideContent = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative" boxSize="full" overflow="hidden">
    {backgroundImage.mimeType.startsWith('image') && (
      <Overlay>
        <Image
          boxSize="full"
          objectFit="fill"
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          transform="scale(1.2)"
          transition="all 1s"
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
    <AnimatePresence>
      <VStack
        key={uuidv4()}
        as={motion.div}
        variants={{
          initial: {
            opacity: 0,
            y: '50px'
          },
          final: {
            opacity: 1,
            y: '0px',
            transition: {
              duration: 0.5,
              delay: 0.5
            }
          }
        }}
        initial="initial"
        animate="final"
        exit="initial"
        align="flex-start"
        pos="absolute"
        w={{ base: 'xs', md: 'xl' }}
        color="text.light"
        top={{ base: '7%', md: '30%' }}
        left="10%"
        transform="translateY(-15%)"
      >
        {title && (
          <Text fontWeight="bold" fontSize="5xl">
            {title}
          </Text>
        )}
        {description && (
          <Text fontWeight="medium" fontSize="xl">
            {description}
          </Text>
        )}
        {callToAction && Object.keys(callToAction).length > 0 && (
          <ButtonCallToAction
            {...callToAction}
            bgColor="background.dark"
            color="text.light"
          />
        )}
      </VStack>
    </AnimatePresence>
  </Flex>
);

const Slide = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <SlideContent
    backgroundImage={backgroundImage}
    callToAction={callToAction}
    description={description}
    title={title}
  />
);

export const DotSlider = ({ slider }: DotSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return <Slider settings={{ dots: true }} slides={slides} height="90vh" />;
};
