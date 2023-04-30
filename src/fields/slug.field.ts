import { Field } from 'payload/types';
import { populateSlug } from '../hooks';

interface Args {
  fieldToUse?: string;
  required?: boolean;
  readOnly?: boolean;
}

export const Slug = (args?: Args): Field => {
  const { fieldToUse = 'name', required = true, readOnly = false } = args || {};

  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    required,
    unique: true,
    localized: true,
    index: true,
    admin: {
      position: 'sidebar',
      readOnly
    },
    hooks: {
      beforeValidate: [populateSlug(fieldToUse)]
    }
  };
};
