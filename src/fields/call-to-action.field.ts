/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';
import { PageType } from '../collections';

export interface CallToActionType {
  label: string;
  type: 'page' | 'custom';
  newTab?: boolean;
  page?: PageType;
  url?: string;
}

interface Args {
  label?: string | false;
  required?: boolean;
  condition?: (data: any, siblingData: any) => boolean;
}

export const CallToAction = (args?: Args): Field => {
  const { label, condition, required } = args || {};

  return {
    label: typeof label === 'boolean' ? label : label || 'Call To Action',
    name: 'callToAction',
    type: 'group',
    fields: [
      {
        name: 'type',
        label: 'Type',
        type: 'radio',
        defaultValue: 'page',
        required,
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
        name: 'label',
        label: 'Label',
        type: 'text',
        required,
        localized: true
      },
      {
        name: 'page',
        label: 'Page',
        type: 'relationship',
        relationTo: 'pages',
        required,
        localized: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'page'
        }
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        required,
        localized: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom'
        }
      },
      {
        name: 'newTab',
        label: 'Open in New Tab',
        type: 'checkbox'
      }
    ],
    admin: {
      condition
    }
  };
};
