import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
  VStack
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { DotSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';
import { VideoPlayer } from './VideoPlayer';
import { isMobileOS } from '../utils';

export interface DotSliderProps extends DotSliderType {}

const SlideContent = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  return (
    <Flex pos="relative" boxSize="full" overflow="hidden">
      {backgroundImage.mimeType.startsWith('image') && (
        <Image
          boxSize="full"
          objectFit="fill"
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          transition="all 1s"
        />
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
          w={{ base: '3xs', md: 'xl' }}
          color="text.light"
          top={{ base: '7%', md: '20%' }}
          left={{ base: '7%', md: '10%' }}
          transform="translateY(-15%)"
        >
          {title && (
            <Text fontWeight="semibold" fontSize={{ base: 'xs', md: '3.5rem' }}>
              {title}
            </Text>
          )}
          {description && isLargerThanMd && (
            <Text fontWeight="medium" fontSize={{ base: '2xs', md: 'xl' }}>
              {description}
            </Text>
          )}
          {callToAction && Object.keys(callToAction).length > 0 && (
            <ButtonCallToAction
              {...callToAction}
              bgColor="background.blue.100"
              color="text.light"
              size={{ base: 'xs', md: 'sm' }}
            />
          )}
        </VStack>
      </AnimatePresence>
    </Flex>
  );
};

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

  return (
    <Slider
      settings={{ dots: true }}
      slides={slides}
      height={{ base: '20vh', md: '90vh' }}
    />
  );
};
