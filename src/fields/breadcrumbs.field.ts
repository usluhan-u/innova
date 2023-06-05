import { Field } from 'payload/types';

export const Breadcrumbs: Field = {
  name: 'breadcrumbs',
  label: 'Breadcrumbs',
  type: 'array',
  localized: true,
  fields: [
    {
      name: 'page',
      label: 'Page',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      admin: {
        disabled: true
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          admin: {
            width: '50%'
          }
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          admin: {
            width: '50%'
          }
        }
      ]
    }
  ],
  admin: {
    readOnly: true
  }
};
