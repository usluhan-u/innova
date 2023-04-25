import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  RichText,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';

export interface ContentCardGroupItemType {
  content: RichTextContentType[];
  callToAction: CallToActionType;
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
    BackgroundColor,
    Width,
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        RichText({ name: 'content', label: 'Content', required: true }),
        CallToAction()
      ]
    }
  ]
};
