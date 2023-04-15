import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import ReactSlick, { Settings } from 'react-slick';
import { v4 as uuidv4 } from 'uuid';

export interface SliderProps extends Settings {
  slides: React.ReactNode[];
}

export const Slider = ({ appendDots, slides }: SliderProps) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    fade: true,
    speed: 3000
  };

  return (
    <ReactSlick {...settings}>
      {slides.map((slide) => (
        <div key={uuidv4()}>{slide}</div>
      ))}
    </ReactSlick>
  );
};
