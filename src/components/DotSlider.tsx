import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react';
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
  <Flex pos="relative">
    <Image
      w="full"
      h="4xl"
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
        base: 'translate(2rem, 10rem)',
        md: 'translate(15rem, 20rem)'
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
          bgColor="background.light"
          color="text.blue"
        />
      )}
    </VStack>
  </Flex>
);

const AppendDots = (dots: React.ReactNode) => (
  <Box
    pos="absolute"
    w="fit-content"
    transform={{
      base: 'translate(2rem, -5rem)',
      md: 'translate(15rem, -10rem)'
    }}
    sx={{
      '&': {
        '& li.slick-active': {
          '& div': {
            bgColor: 'background.primary'
          }
        }
      }
    }}
  >
    <UnorderedList>{dots}</UnorderedList>
  </Box>
);

const CustomPaging = () => (
  <Box
    color="text.light"
    boxSize="3"
    bgColor="background.gray.secondary"
    borderRadius="full"
  />
);

export const DotSlider = ({ slider }: DotSliderProps) => {
  const slides = slider.slides.map(({ slide }) => (
    <Slide {...slide} key={uuidv4()} />
  ));

  return (
    <Slider
      settings={{
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: AppendDots,
        customPaging: CustomPaging
      }}
      slides={slides}
    />
  );
};
