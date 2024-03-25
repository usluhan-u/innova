import { Field } from 'payload/types';
import { convertToEnglishKebabCase } from '../utils';

interface Args {
  fieldToUse?: string;
  required?: boolean;
  readOnly?: boolean;
}

export const Slug = (args?: Args): Field => {
  const { required = true, readOnly = false } = args || {};

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
      beforeChange: [
        ({ value }) => {
          if (typeof value === 'string') {
            return convertToEnglishKebabCase(value);
          }

          return value;
        }
      ]
    }
  };
};
