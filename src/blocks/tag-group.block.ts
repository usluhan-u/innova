import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export interface TagGroupItemType {
  title: string;
  content?: string;
  callToAction: CallToActionType;
  icon: UploadedMediaType;
}

export interface TagGroupType {
  blockType: 'tagGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: TagGroupItemType[];
}

export const TagGroup: Block = {
  slug: 'tagGroup',
  labels: {
    singular: 'Tag Group',
    plural: 'Tag Groups'
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
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'content',
          label: 'Content',
          type: 'textarea',
          localized: true
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        },
        CallToAction()
      ]
    }
  ]
};
