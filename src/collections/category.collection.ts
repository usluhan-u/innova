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
    useAsTitle: 'label',
    defaultColumns: ['label']
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      unique: true,
      required: true,
      localized: true
    }
  ]
};
