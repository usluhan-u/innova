/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';
import { PageType } from '../collections';
import { validateUrl } from '../utils';

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
    name: 'callToAction',
    label: typeof label === 'boolean' ? label : label || 'Call To Action',
    type: 'group',
    fields: [
      {
        name: 'type',
        label: 'Type',
        type: 'radio',
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
        required: true,
        localized: true,
        validate: (value, { operation }) => {
          if (operation === 'create' || operation === 'update') {
            return validateUrl(value);
          }

          return 'Please enter a valid URL';
        },
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
