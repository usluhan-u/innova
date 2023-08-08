import { CollectionConfig } from 'payload/types';
import { Slug } from '../fields';

export interface CategoryType {
  name: string;
  slug: string;
}

export const Category: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
      unique: true
    },
    Slug()
  ]
};
