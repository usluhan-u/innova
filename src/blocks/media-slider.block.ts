import { Block } from 'payload/types';
import { Media as MediaType } from '../payload-types';

export interface MediaSliderSlide {
  media: MediaType;
}

export interface MediaSliderType {
  introContent: unknown;
  slides: MediaSliderSlide[];
  blockType: 'mediaSlider';
}

export const MediaSlider: Block = {
  slug: 'mediaSlider',
  labels: {
    singular: 'Media Slider',
    plural: 'Media Sliders'
  },
  fields: [
    {
      name: 'content',
      type: 'richText'
    },
    {
      name: 'slides',
      type: 'array',
      minRows: 3,
      labels: {
        singular: 'Slide',
        plural: 'Slides'
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'medias',
          required: true
        }
      ]
    }
  ]
};
