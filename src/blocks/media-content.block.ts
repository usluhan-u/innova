import { Block } from 'payload/types';
import { BackgroundColor } from '../fields';

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
      required: true
    }
  ]
};
