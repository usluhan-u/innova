import { Field } from 'payload/types';

export const ParentPage: Field = {
  name: 'parent',
  label: 'Parent Page',
  type: 'relationship',
  relationTo: 'pages',
  maxDepth: 1,
  index: true,
  admin: {
    position: 'sidebar'
  }
};
