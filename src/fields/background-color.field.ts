import { Field } from 'payload/types';

export type BackgroundColorType = 'white' | 'gray';

export const BackgroundColor: Field = {
  name: 'backgroundColor',
  label: 'Background Color',
  type: 'radio',
  defaultValue: 'background.primary',
  required: true,
  options: [
    {
      label: 'White',
      value: 'background.primary'
    },
    {
      label: 'Gray',
      value: 'background.secondary'
    }
  ],
  admin: {
    width: '30%'
    // components: {
    //   Field: BackgroundColorRadio
    // }
  }
};
