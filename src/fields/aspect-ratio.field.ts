import { Field } from 'payload/types';
import { deepMerge } from '../utils';
type AspectRatio = (overrides?: Partial<Field>) => Field;

export const AspectRatio: AspectRatio = (overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '56.25',
      options: [
        {
          label: '16:9',
          value: '56.25'
        },
        {
          label: '4:5',
          value: '75'
        }
      ]
    },
    overrides
  );
