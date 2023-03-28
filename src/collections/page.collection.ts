import { CollectionConfig } from 'payload/types';
import { Slug } from '../fields';

export interface PageType {
  title: string;
}

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true
    },
    Slug
  ]
};
