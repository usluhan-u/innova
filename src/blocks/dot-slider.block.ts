import { Block } from 'payload/types';
import {
  CallToActionToggle,
  CallToActionToggleType,
  Width,
  WidthType
} from '../fields';
import { UploadedMediaType } from '../collections';

export interface DotSliderItemType {
  title?: string;
  description?: string;
  backgroundImage: UploadedMediaType;
  callToActionToggle: CallToActionToggleType;
}

export interface DotSliderType {
  blockType: 'dotSlider';
  width: WidthType;
  items: DotSliderItemType[];
}

export const DotSlider: Block = {
  slug: 'dotSlider',
  labels: {
    singular: 'Dot Slider',
    plural: 'Dot Sliders'
  },
  fields: [
    {
      type: 'row',
      fields: [Width]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          localized: true
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        },
        CallToActionToggle
      ]
    }
  ]
};
