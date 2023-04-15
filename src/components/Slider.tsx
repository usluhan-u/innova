import ReactSlick, { Settings as ReactSlickSettings } from 'react-slick';
import { chakra } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export interface SliderProps extends ReactSlickSettings {
  slides: React.ReactNode[];
}

export const Slider = ({ slides, ...rest }: SliderProps) => {
  const settings: ReactSlickSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    speed: 3000,
    ...rest
  };

  return (
    <ReactSlick {...settings}>
      {slides.map((slide) => (
        <chakra.div key={uuidv4()}>{slide}</chakra.div>
      ))}
    </ReactSlick>
  );
};
