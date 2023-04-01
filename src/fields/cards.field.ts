import { Field } from 'payload/types';
import { CallToAction } from './call-to-action.field';

export const Cards: Field = {
  name: 'cards',
  type: 'array',
  minRows: 2,
  labels: {
    singular: 'Tab',
    plural: 'Tabs'
  },
  fields: [
    {
      name: 'media',
      label: 'Logo',
      type: 'upload',
      relationTo: 'medias',
      required: true
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'content',
      type: 'richText',
      required: true
    },
    CallToAction
  ]
};
