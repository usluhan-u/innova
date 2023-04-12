import { CollectionConfig } from 'payload/types';

export const Page: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  fields: []
};
