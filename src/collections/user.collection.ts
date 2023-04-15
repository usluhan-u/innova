import { CollectionConfig } from 'payload/types';

export const User: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    read: () => true
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ]
};
