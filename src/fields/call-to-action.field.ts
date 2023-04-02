import { Field } from 'payload/types';

const customURLCondition = (_: Partial<any>, siblingData: Partial<any>) =>
  siblingData.type === 'external';

export const CallToAction: Field = {
  name: 'callToAction',
  label: 'Call to Action',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%'
          }
        },
        {
          name: 'type',
          label: 'Button Type',
          type: 'radio',
          defaultValue: 'internal',
          required: true,
          options: [
            {
              label: 'Internal Link',
              value: 'internal'
            },
            {
              label: 'External Link',
              value: 'external'
            }
          ],
          admin: {
            width: '50%',
            layout: 'horizontal'
          }
        }
      ]
    },
    {
      name: 'internal',
      label: 'Link to Page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'internal'
      }
    },
    {
      name: 'url',
      label: 'Button URL',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: customURLCondition
      }
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
      required: true,
      admin: {
        condition: customURLCondition
      }
    }
  ]
};
