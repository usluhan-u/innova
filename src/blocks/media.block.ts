import { Block } from 'payload/types';
import { Media as MediaType } from '../payload-types';

export const Media: Block = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Medias'
  },
  fields: [
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
      localized: true,
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
      localized: true
    }
  ]
};
