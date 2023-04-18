import { CollectionConfig } from 'payload/types';

export interface CategoryType {
  label: string;
}

export const Category: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true
  },
  admin: {
    group: 'Content'
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      localized: true
    }
  ]
};
