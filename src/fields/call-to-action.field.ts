import { Field } from 'payload/types';

const customURLCondition = (_: Partial<any>, siblingData: Partial<any>) =>
  siblingData.type === 'custom';

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
          admin: {
            width: '50%'
          }
        },
        {
          name: 'type',
          label: 'Button Type',
          required: true,
          type: 'radio',
          defaultValue: 'page',
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
            width: '50%',
            layout: 'horizontal'
          }
        }
      ]
    },
    {
      name: 'page',
      label: 'Page to link to',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'page'
      }
    },
    {
      name: 'url',
      label: 'Button URL',
      type: 'text',
      required: true,
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
