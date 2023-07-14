import React from 'react';
import { Box, Flex, Image, Text, VStack, chakra } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { DotSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';
import { Overlay } from './Overlay';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export interface DotSliderProps extends DotSliderType {}

const VideoPlayer = chakra(ReactPlayer);

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
          objectFit="cover"
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
        top="30%"
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
            bgColor="background.blue.100"
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
  // <>
  //   {callToAction && Object.keys(callToAction).length > 0 ? (
  //     <NextLink
  //       href={
  //         (callToAction.page
  //           ? `/${callToAction.page.slug}`
  //           : callToAction.url) as unknown as URL
  //       }
  //     >
  //       <SlideContent
  //         backgroundImage={backgroundImage}
  //         callToAction={callToAction}
  //         description={description}
  //         title={title}
  //       />
  //     </NextLink>
  //   ) : (
  //     <SlideContent
  //       backgroundImage={backgroundImage}
  //       callToAction={callToAction}
  //       description={description}
  //       title={title}
  //     />
  //   )}
  // </>
);

export const DotSlider = ({ slider }: DotSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return <Slider settings={{ dots: true }} slides={slides} height="90vh" />;
};
