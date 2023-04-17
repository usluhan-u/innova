import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToActionToggle,
  CallToActionToggleType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';

export interface ContentCardGroupItemType {
  content: RichTextContentType[];
  callToActionToggle: CallToActionToggleType;
}

export interface ContentCardGroupType {
  blockType: 'contentCardGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: ContentCardGroupItemType[];
}

export const ContentCardGroup: Block = {
  slug: 'contentCardGroup',
  labels: {
    singular: 'Content Card Group',
    plural: 'Content Card Groups'
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
          name: 'content',
          label: 'Content',
          type: 'richText',
          required: true,
          localized: true
        },
        CallToActionToggle
      ]
    }
  ]
};
