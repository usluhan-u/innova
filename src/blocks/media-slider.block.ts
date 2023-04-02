import { Block } from 'payload/types';
import { BackgroundColor, CallToAction } from '../fields';

export const MediaSlider: Block = {
  slug: 'mediaSlider',
  labels: {
    singular: 'Media Slider',
    plural: 'Media Sliders'
  },
  fields: [
    BackgroundColor,
    {
      name: 'slides',
      type: 'array',
      minRows: 2,
      required: true,
      labels: {
        singular: 'Slide',
        plural: 'Slides'
      },
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true
        },
        CallToAction,
        {
          name: 'media',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
