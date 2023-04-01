import { Block } from 'payload/types';

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Content Blocks'
  },
  fields: [
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'radio',
      defaultValue: 'contentOnLeft',
      required: true,
      localized: true,
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
