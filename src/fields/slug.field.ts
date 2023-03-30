import { Field } from 'payload/types';
import { formatSlug } from '../utils';

export const Slug: Field = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  required: true,
  admin: {
    position: 'sidebar'
  },
  hooks: {
    beforeValidate: [formatSlug('title')]
  }
};
