import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {},
  access: {
    read: () => true
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ]
};
