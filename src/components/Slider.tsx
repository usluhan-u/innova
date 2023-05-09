import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import ReactSlick, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { chakra } from '@chakra-ui/react';

export interface SliderProps {
  slides: React.ReactNode[];
  settings?: Settings;
}

const ChakraSlider = chakra(ReactSlick);

export const Slider = ({ slides, settings }: SliderProps) => (
  <div>
    <ChakraSlider {...settings}>
      {slides.map((slide) => (
        <div key={uuidv4()}>{slide}</div>
      ))}
    </ChakraSlider>
  </div>
);
