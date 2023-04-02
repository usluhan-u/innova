import { Field } from 'payload/types';
import { CallToAction } from './call-to-action.field';

export const Tabs: Field = {
  name: 'tabs',
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
      required: true,
      localized: true
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true
    },
    CallToAction
  ]
};
