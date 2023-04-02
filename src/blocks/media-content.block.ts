import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { RichTextNode } from '../components';
import { MediaType } from './media.block';

export type MediaContentAlignment = 'contentOnLeft' | 'contentOnRight';

export interface MediaContentType {
  blockType: 'mediaContent';
  backgroundColor: BackgroundColorType;
  alignment: MediaContentAlignment;
  content: RichTextNode[];
  media: MediaType;
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
      name: 'alignment',
      label: 'Alignment',
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
    }
  ]
};
