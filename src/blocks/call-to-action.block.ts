import { Block } from 'payload/types';

export type CallToActionButtonType = 'page' | 'custom';

export interface CallToActionType {
  blockType: 'callToAction';
  label: string;
  type: CallToActionButtonType;
  page?: string;
  url?: string;
  newTab?: boolean;
}

const customCondition = (
  _: Partial<CallToActionType>,
  siblingData: Partial<CallToActionType>
) => siblingData.type === 'custom';

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action'
  },
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
      localized: true,
      admin: {
        condition: customCondition
      }
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
      admin: {
        condition: customCondition
      }
    }
  ]
};
