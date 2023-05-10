import React from 'react';
import { Box, Flex, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { ArrowSliderType } from '../blocks';
import { Slider } from './Slider';
import { ButtonCallToAction } from './ButtonCallToAction';
import { SlideType } from '../fields';

export interface ArrowSliderProps extends ArrowSliderType {}

const Slide = ({
  backgroundImage,
  callToAction,
  description,
  title
}: SlideType) => (
  <Flex pos="relative">
    <Image
      w="full"
      h="md"
      objectFit="fill"
      src={backgroundImage.url}
      alt={backgroundImage.alt}
    />
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

const NextArrow = () => (
  <Box display="block">
    <Icon as={RxCaretRight} color="red" />
  </Box>
);

const PrevArrow = () => (
  <Box display="block">
    <Icon as={RxCaretLeft} color="text.light" />
  </Box>
);

export const ArrowSlider = ({ slider }: ArrowSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return (
    <Slider
      settings={{
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      }}
      slides={slides}
    />
  );
};
