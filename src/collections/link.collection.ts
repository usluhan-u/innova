import { CollectionConfig, GlobalConfig } from 'payload/types';

export const Link: CollectionConfig = {
  slug: 'links',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'label'
  },
  fields: [
    {
      name: 'type',
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
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true
    },
    {
      name: 'page',
      label: 'Link to Page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      unique: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'page'
      }
    },
    {
      name: 'url',
      label: 'Custom URL',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom'
      }
    }
  ]
};
