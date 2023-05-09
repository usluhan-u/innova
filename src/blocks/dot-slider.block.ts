import { Block } from 'payload/types';
import { Slider, SliderType } from '../fields';

export interface DotSliderType {
  blockType: 'dotSlider';
  slider: SliderType;
}

export const DotSlider: Block = {
  slug: 'dotSlider',
  labels: {
    singular: 'Dot Slider',
    plural: 'Dot Sliders'
  },
  fields: [Slider({ label: false })]
};
