import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { MediaTypeMediaType } from './media.block';
import { Alignment } from '../types';
import { RichTextNode } from '../components';

interface SmallCardsHeaderType {
  alignment: Alignment;
  content: RichTextNode[];
}

interface SmallCardsSmallCardType {
  title: string;
  content?: string;
  media: MediaTypeMediaType;
}

export interface SmallCardsType {
  blockType: 'smallCards';
  backgroundColor: BackgroundColorType;
  enableHeader?: boolean;
  header?: SmallCardsHeaderType;
  smallCards: SmallCardsSmallCardType[];
}

export const SmallCards: Block = {
  slug: 'smallCards',
  labels: {
    singular: 'Small Card',
    plural: 'Small Cards'
  },
  fields: [
    BackgroundColor,
    {
      name: 'enableHeader',
      label: 'Header',
      type: 'checkbox'
    },
    {
      name: 'header',
      label: 'Header',
      type: 'group',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.enableHeader)
      },
      fields: [
        {
          name: 'alignment',
          label: 'Header Alignment',
          type: 'radio',
          defaultValue: 'left',
          required: true,
          options: [
            {
              label: 'Left',
              value: 'left'
            },
            {
              label: 'Center',
              value: 'center'
            },
            {
              label: 'Right',
              value: 'right'
            }
          ],
          admin: {
            width: '50%'
          }
        },
        {
          name: 'content',
          label: 'Header Content',
          type: 'richText',
          localized: true
        }
      ]
    },
    {
      name: 'smallCards',
      label: 'Small Cards',
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
          type: 'richText',
          localized: true
        },
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
