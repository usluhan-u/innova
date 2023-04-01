import { CollectionConfig } from 'payload/types';

export const Category: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'label'
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
