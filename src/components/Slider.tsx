import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import ReactSlick, { Settings } from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { chakra } from '@chakra-ui/react';

export interface SliderProps extends Settings {
  slides: React.ReactNode[];
}

export const Slider = ({ slides, ...rest }: SliderProps) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    fade: true,
    speed: 3000,
    ...rest
  };

  return (
    <ReactSlick {...settings}>
      {slides.map((slide) => (
        <chakra.div key={uuidv4()} pos="relative" _focus={{ outline: 'none' }}>
          {slide}
        </chakra.div>
      ))}
    </ReactSlick>
  );
};
