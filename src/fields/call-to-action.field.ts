/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupField } from 'payload/types';
import { PageType } from '../collections';

export interface CallToActionType {
  label: string;
  type: 'page' | 'custom';
  page?: PageType;
  url?: string;
}

interface Args {
  label?: string | false;
  condition?: (data: any, siblingData: any) => boolean;
}

export const CallToAction = (args?: Args): GroupField => {
  const { label, condition } = args || {};

  return {
    name: 'callToAction',
    label: typeof label === 'boolean' ? label : label || 'Call to Action',
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
    ],
    admin: {
      condition
    }
  };
};
