import { CollectionConfig } from 'payload/types';
import { populateValueAfterCaseChange } from '../hooks';
import { Slug } from '../fields';

export interface PostGroupType {
  name: string;
}

export const PostGroup: CollectionConfig = {
  slug: 'post-groups',
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
      unique: true,
      hooks: {
        beforeChange: [populateValueAfterCaseChange('name')]
      },
      admin: {
        readOnly: true
      }
    },
    Slug({ required: false, readOnly: true })
  ]
};
