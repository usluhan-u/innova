import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Media,
  RichText,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';
import { PostType } from '../collections';
import { RichTextContentType } from '../components';

interface FlippableCardCustomDataType {
  content: RichTextContentType[];
  featuredImage: UploadedMediaType;
}

export interface FlippableCardType {
  blockType: 'flippableCard';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  type: 'custom' | 'post';
  customData?: FlippableCardCustomDataType;
  post?: PostType;
}

export const FlippableCard: Block = {
  slug: 'flippableCard',
  labels: {
    singular: 'Flippable Card',
    plural: 'Flippable Cards'
  },
  fields: [
    BackgroundColor,
    Width,
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
};
