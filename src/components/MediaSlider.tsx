import { Slider } from './Slider';
import { Media as MediaType } from '../payload-types';
import {
  CallToAction,
  CallToActionProps as CallToActionType
} from './CallToAction';
import { Media } from './Media';
import { RichText } from './RichText';
import { Box } from '@chakra-ui/react';

export interface Slide {
  content: unknown;
  callToAction: CallToActionType;
  media: MediaType;
}

export interface MediaSliderProps {
  blockType: 'mediaSlider';
  slides: Slide[];
}

export const MediaSlider = ({ slides }: MediaSliderProps) => {
  const getSliderSlides = (slides: Slide[]) =>
    slides.map((slide) => <Slide {...slide} />);

  return <Slider slides={getSliderSlides(slides)} />;
};

const Slide = ({ content, callToAction, media }: Slide) => {
  return (
    <div className="relative">
      <Media blockType="media" media={media} />
      <Box className="absolute top-1/2 left-36 text-white">
        <RichText content={content} />
        <CallToAction {...callToAction} />
      </Box>
    </div>
  );
};
