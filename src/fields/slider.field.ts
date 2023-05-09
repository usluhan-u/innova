/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';
import { Slide, SlideType } from './slide.field';

export interface SliderType {
  slides: {
    slide: SlideType;
  }[];
}

interface Args {
  label?: string | false;
  condition?: (data: any, siblingData: any) => boolean;
}

export const Slider = (args?: Args): Field => {
  const { label, condition } = args || {};

  return {
    name: 'slider',
    label: typeof label === 'boolean' ? label : label || 'Slider',
    type: 'group',
    fields: [
      {
        name: 'slides',
        labels: {
          singular: 'Slide',
          plural: 'Slides'
        },
        type: 'array',
        minRows: 2,
        fields: [Slide({ label: false })]
      }
    ],
    admin: {
      condition
    }
  };
};
