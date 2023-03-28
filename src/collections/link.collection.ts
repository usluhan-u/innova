import { CollectionConfig } from 'payload/types';

export interface LinkType {}

export const Link: CollectionConfig = {
  slug: 'links',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'linkType',
      label: 'Link Type',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'Page',
          value: 'page'
        },
        {
          label: 'Custom URL',
          value: 'custom'
        }
      ],
      defaultValue: 'page',
      admin: {
        layout: 'horizontal'
      }
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'page',
      label: 'Link to Page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'page'
      }
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom'
      }
    }
  ]
};
