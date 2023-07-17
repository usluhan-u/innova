import { Field } from 'payload/types';

export type WidthType =
  | '25%'
  | '33.33%'
  | '50%'
  | '66.66%'
  | '75%'
  | '85%'
  | '90%'
  | '100%';

export const Width: Field = {
  name: 'width',
  label: 'Width',
  type: 'select',
  defaultValue: '100%',
  required: true,
  localized: true,
  options: [
    {
      label: 'Quarter',
      value: '25%'
    },
    {
      label: 'One Third',
      value: '33.33%'
    },
    {
      label: 'Half',
      value: '50%'
    },
    {
      label: 'Two Thirds',
      value: '66.66%'
    },
    {
      label: 'Three Quarters',
      value: '75%'
    },
    {
      label: 'Full',
      value: '100%'
    }
  ]
};
