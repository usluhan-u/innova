import { Block } from 'payload/types';
import { Slider, SliderType } from '../fields';

export interface ArrowSliderType {
  blockType: 'arrowSlider';
  slider: SliderType;
}

export const ArrowSlider: Block = {
  slug: 'arrowSlider',
  labels: {
    singular: 'Arrow Slider',
    plural: 'Arrow Sliders'
  },
  fields: [Slider({ label: false })]
};
