import { Field } from 'payload/types';

export interface CallToActionType {
  label: string;
  type: 'page' | 'custom';
  page?: string;
  url?: string;
}

export const CallToAction: Field = {
  name: 'callToAction',
  label: 'Call to Action',
  type: 'group',
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'page',
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
      admin: {
        layout: 'horizontal'
      }
    },
    {
      name: 'page',
      label: 'Page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'page'
      }
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom'
      }
    }
  ]
};
