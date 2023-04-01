import { Block } from 'payload/types';
import { CallToAction } from '../fields';

export const MediaSlider: Block = {
  slug: 'mediaSlider',
  labels: {
    singular: 'Media Slider',
    plural: 'Media Sliders'
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 2,
      localized: true,
      labels: {
        singular: 'Slide',
        plural: 'Slides'
      },
      fields: [
        {
          name: 'content',
          type: 'richText',
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
