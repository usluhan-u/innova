import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  Media,
  RichText,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';
import { PostType } from '../collections';
import { RichTextContentType } from '../components';

interface FlippableCardGroupCustomDataType {
  content: RichTextContentType[];
  featuredImage: UploadedMediaType;
}

interface FlippableCardGroupItemType {
  type: 'custom' | 'post';
  customData?: FlippableCardGroupCustomDataType;
  post?: PostType;
}

export interface FlippableCardGroupType {
  blockType: 'flippableCardGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  title: string;
  items: FlippableCardGroupItemType[];
  callToAction?: CallToActionType;
}

export const FlippableCardGroup: Block = {
  slug: 'flippableCardGroup',
  labels: {
    singular: 'Flippable Card Group',
    plural: 'Flippable Cards Group'
  },
  fields: [
    BackgroundColor,
    Width,
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true
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
          name: 'type',
          label: 'Type',
          type: 'radio',
          defaultValue: 'custom',
          required: true,
          localized: true,
          options: [
            {
              label: 'Custom',
              value: 'custom'
            },
            {
              label: 'Post',
              value: 'post'
            }
          ]
        },
        {
          name: 'customData',
          label: 'Custom Data',
          type: 'group',
          fields: [
            RichText({ name: 'content', label: 'Content', required: true }),
            Media({
              name: 'featuredImage',
              label: 'Featured Image',
              required: true
            })
          ],
          admin: {
            condition: (_, siblingData) => siblingData.type === 'custom'
          }
        },
        {
          name: 'post',
          label: 'Post',
          type: 'relationship',
          relationTo: 'posts',
          required: true,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'post'
          }
        }
      ]
    },
    CallToAction()
  ]
};
