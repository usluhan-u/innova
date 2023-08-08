import { CollectionConfig } from 'payload/types';
import { Slug } from '../fields';

export interface PostGroupType {
  name: string;
  slug: string;
}

export const PostGroup: CollectionConfig = {
  slug: 'post-groups',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    hidden: true
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
      admin: {
        readOnly: true
      }
    },
    Slug({ required: false, readOnly: true })
  ]
};
