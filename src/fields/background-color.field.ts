import { Field } from 'payload/types';

export const BackgroundColor: Field = {
  name: 'backgroundColor',
  label: 'Background Color',
  type: 'radio',
  defaultValue: 'white',
  admin: {
    layout: 'horizontal'
  },
  options: [
    {
      label: 'White',
      value: 'white'
    },
    {
      label: 'Gray',
      value: 'gray'
    }
  ]
};
