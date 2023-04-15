import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { RichTextNode } from '../components';

export type MediaSize = 'normal' | 'wide' | 'fullscreen';

export interface MediaTypeMediaType {
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
}

export interface MediaType {
  blockType: 'media';
  backgroundColor: BackgroundColorType;
  media: MediaTypeMediaType;
  size: MediaSize;
  caption: RichTextNode[];
}

export const Media: Block = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Medias'
  },
  fields: [
    BackgroundColor,
    {
      name: 'media',
      label: 'Media',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    },
    {
      name: 'size',
      label: 'Size',
      type: 'radio',
      required: true,
      defaultValue: 'normal',
      options: [
        {
          label: 'Normal',
          value: 'normal'
        },
        {
          label: 'Wide',
          value: 'wide'
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen'
        }
      ],
      admin: {
        layout: 'horizontal'
      }
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'richText',
      required: true,
      localized: true
    }
  ]
};
