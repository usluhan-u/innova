import { Block } from 'payload/types';
import { Media as MediaType } from '../payload-types';

export interface MediaBlockType {
  media: MediaType;
  size: 'normal' | 'wide' | 'fullscreen';
  caption: unknown;
  type: 'mediaBlock';
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks'
  },
  fields: [
    {
      name: 'media',
      label: 'Media',
      type: 'upload',
      relationTo: 'medias',
      required: true
    },
    {
      name: 'size',
      label: 'Size',
      type: 'radio',
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
      type: 'richText'
    }
  ]
};
