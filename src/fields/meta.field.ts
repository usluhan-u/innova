import { Field } from 'payload/types';
import { formatSlug } from '../utils';

export const Meta: Field = {
  name: 'meta',
  label: 'Meta',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea'
    },
    {
      name: 'keywords',
      label: 'Keywords',
      type: 'text'
    }
  ]
};
