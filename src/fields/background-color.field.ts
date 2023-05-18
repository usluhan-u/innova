import { Field } from 'payload/types';

export type BackgroundColorType = 'background.primary' | 'background.secondary';

export const BackgroundColor: Field = {
  name: 'backgroundColor',
  label: 'Background Color',
  type: 'radio',
  defaultValue: 'background.primary',
  required: true,
  localized: true,
  options: [
    {
      label: 'White',
      value: 'background.primary'
    },
    {
      label: 'Gray',
      value: 'background.secondary'
    }
  ]
};
