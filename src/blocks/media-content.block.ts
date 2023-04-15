import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { RichTextNode } from '../components';
import { MediaTypeMediaType } from './media.block';
import { Alignment } from '../types';

export type MediaContentAlignment = 'contentOnLeft' | 'contentOnRight';

interface MediaContentHeaderType {
  alignment: Alignment;
  content: RichTextNode[];
}

interface MediaContentContentType {
  alignment: MediaContentAlignment;
  content: RichTextNode[];
  media: MediaTypeMediaType;
  enableExternalLink?: boolean;
  externalLink?: {
    label: string;
    url: string;
    newTab?: boolean;
  };
}

export interface MediaContentType {
  blockType: 'mediaContent';
  backgroundColor: BackgroundColorType;
  enableHeader?: boolean;
  header?: MediaContentHeaderType;
  content: MediaContentContentType;
}

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Content Blocks'
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
      name: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          name: 'alignment',
          label: 'Content Alignment',
          type: 'radio',
          defaultValue: 'contentOnLeft',
          required: true,
          options: [
            {
              label: 'Content on Left',
              value: 'contentOnLeft'
            },
            {
              label: 'Content on Right',
              value: 'contentOnRight'
            }
          ],
          admin: {
            layout: 'horizontal'
          }
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        },
        {
          name: 'enableExternalLink',
          label: 'External Link',
          type: 'checkbox'
        },
        {
          name: 'externalLink',
          label: false,
          type: 'group',
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData.enableExternalLink)
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
              localized: true
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              localized: true
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab'
            }
          ]
        }
      ]
    }
  ]
};
