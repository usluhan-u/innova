import { Field } from 'payload/types';
import { CallToAction } from './call-to-action.field';

export const Slides: Field = {
  name: 'slides',
  type: 'array',
  minRows: 2,
  labels: {
    singular: 'Slide',
    plural: 'Slides'
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true
    },
    CallToAction,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    }
  ]
};
