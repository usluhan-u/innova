import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType, CallToAction } from '../fields';
import { RichTextNode } from '../components';
import { CallToActionType } from './call-to-action.block';
import { MediaType } from './media.block';

export interface MediaSliderSlideType {
  content: RichTextNode[];
  callToAction: CallToActionType;
  media: MediaType;
}

export interface MediaSliderType {
  blockType: 'mediaSlider';
  backgroundColor: BackgroundColorType;
  slides: MediaSliderSlideType[];
}

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
