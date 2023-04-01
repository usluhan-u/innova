import { Slider } from './Slider';
import { Media as MediaType } from '../payload-types';
import {
  CallToAction,
  CallToActionProps as CallToActionType
} from './CallToAction';
import { Media } from './Media';
import { RichText } from './RichText';
import { VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

export interface Slide {
  content: unknown;
  callToAction: CallToActionType;
  media: MediaType;
}

export interface MediaSliderProps {
  blockType?: 'mediaSlider';
  slides: Slide[];
}

export const MediaSlider = ({ slides }: MediaSliderProps) => {
  const getSliderSlides = (slides: Slide[]) =>
    slides.map((slide) => <Slide {...slide} />);

  return (
    <SliderWrapper>
      <Slider
        // appendDots={(dots) => (
        //   <div className="bottom-0 left-36">
        //     <ul>{dots}</ul>
        //   </div>
        // )}
        slides={getSliderSlides(slides)}
      />
    </SliderWrapper>
  );
};

const Slide = ({ content, callToAction, media }: Slide) => {
  return (
    <div className="relative">
      <Media blockType="media" media={media} />
      <VStack
        className="absolute top-1/2 left-36 text-white"
        spacing={4}
        alignItems="normal"
      >
        <RichText content={content} />
        <CallToAction {...callToAction} />
      </VStack>
    </div>
  );
};

const SliderWrapper = styled.div`
  .slick-dots {
    position: absolute;
    left: 9rem;
    bottom: 2%;
    display: flex;
    justify-content: normal;
    margin: 0;
    padding: 0 0;
    list-style-type: none;
  }

  .slick-dots li {
    width: 0;
    height: 0;
    margin: 0 15px;
  }

  .slick-dots li button {
    width: 0.7rem;
    height: 0.7rem;
    padding: 0;
    border: none;
    border-radius: 100%;
    background-color: #8699a6;
    text-indent: -9999px;
  }

  .slick-dots li button:hover {
    background-color: #ffffff;
  }

  li.slick-active button {
    background-color: #ffffff;
  }
`;
