import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToActionToggle,
  CallToActionToggleType,
  Width,
  WidthType
} from '../fields';
import { CategoryType, UploadedMediaType } from '../collections';

export interface CardGroupItemType {
  title: string;
  date: string;
  category?: CategoryType;
  image: UploadedMediaType;
  callToActionToggle: CallToActionToggleType;
}

export interface CardGroupType {
  blockType: 'cardGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: CardGroupItemType[];
}

export const CardGroup: Block = {
  slug: 'cardGroup',
  labels: {
    singular: 'Card Group',
    plural: 'Card Groups'
  },
  fields: [
    {
      type: 'row',
      fields: [BackgroundColor, Width]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'date',
          label: 'Date',
          type: 'date',
          required: true,
          localized: true
        },
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'categories',
          localized: true
        },
        {
          name: 'image',
          label: 'Image',
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
