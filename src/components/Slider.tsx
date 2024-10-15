import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flex, FlexProps, IconButton, chakra } from '@chakra-ui/react';
import {
  DotNav as FacelessUiDotNav,
  Slide as FacelessUiSlide,
  SliderProvider as FacelessUiSliderProvider,
  SliderTrack as FacelessUiSliderTrack,
  useSlider
} from '@faceless-ui/slider';
import { ArrowLeft, ArrowRight } from '../icons';

interface Settings {
  dots?: boolean;
  arrows?: boolean;
  slidesToShow?: number;
}

export interface SliderProps extends Pick<FlexProps, 'height'> {
  slides: React.ReactNode[];
  settings?: Settings;
}

const Arrows = ({ display }: { display: string }) => {
  const { goToSlideIndex, currentSlideIndex } = useSlider();

  return (
    <Flex
      pos="absolute"
      display={display}
      align="center"
      justify="space-between"
      top="50%"
      transform="translateY(-50%)"
      w="full"
      zIndex={999}
    >
      <IconButton
        variant="variant"
        aria-label="Previous slide"
        icon={<ArrowLeft boxSize="6" />}
        onClick={() => goToSlideIndex(currentSlideIndex - 3)}
      />
      <IconButton
        variant="variant"
        aria-label="Next slide"
        icon={<ArrowRight boxSize="6" />}
        onClick={() => goToSlideIndex(currentSlideIndex + 3)}
      />
    </Flex>
  );
};

const DotNav = chakra(FacelessUiDotNav);
const SliderProvider = chakra(FacelessUiSliderProvider);
const SliderTrack = chakra(FacelessUiSliderTrack);
const Slide = chakra(FacelessUiSlide);

export const Slider = ({ height, slides, settings }: SliderProps) => (
  <Flex pos="relative" h={height}>
    <SliderProvider
      slidesToShow={settings?.slidesToShow || 1}
      autoPlay
      scrollable={false}
      autoplaySpeed={5000}
      breakpoints={{
        '(max-width: 768px)': {
          slidesToShow: 1
        }
      }}
    >
      <Arrows display={settings?.arrows ? 'flex' : 'none'} />
      <SliderTrack
        sx={{
          '&': {
            width: 'full',
            scrollbarWidth: 'none',

            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }
        }}
      >
        {slides.map((slide, index) => (
          <Slide key={uuidv4()} index={index}>
            {slide}
          </Slide>
        ))}
      </SliderTrack>
      <DotNav
        className="dots"
        dotClassName="dot"
        activeDotClassName="activeDot"
        sx={{
          '&': {
            pos: 'absolute',
            top: { base: '95%', md: '90%' },
            left: { base: '7%', md: '10%' },
            transform: { base: 'translateY(-100%)', md: 'translateY(-80%)' },
            display: settings?.dots ? 'flex' : 'none',
            '& .dot': {
              border: 'none',
              boxSize: { base: '2', sm: '3' },
              borderRadius: 'full',
              margin: '0 0.5rem',
              cursor: 'pointer',
              bgColor: 'background.gray.secondary'
            },
            '& .activeDot': {
              bgColor: 'background.primary'
            }
          }
        }}
      />
    </SliderProvider>
  </Flex>
);
