import { Block } from 'payload/types';

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks'
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      localized: true,
      labels: {
        singular: 'Column',
        plural: 'Columns'
      },
      fields: [
        {
          type: 'row',
          localized: true,
          fields: [
            {
              name: 'width',
              label: 'Column Width',
              type: 'select',
              defaultValue: 'full',
              required: true,
              localized: true,
              options: [
                {
                  label: 'One Third',
                  value: 'oneThird'
                },
                {
                  label: 'Half',
                  value: 'half'
                },
                {
                  label: 'Two Thirds',
                  value: 'twoThirds'
                },
                {
                  label: 'Full Width',
                  value: 'full'
                }
              ],
              admin: {
                width: '50%'
              }
            },
            {
              name: 'alignment',
              label: 'Alignment',
              type: 'select',
              defaultValue: 'left',
              required: true,
              localized: true,
              options: [
                {
                  label: 'Left',
                  value: 'left'
                },
                {
                  label: 'Center',
                  value: 'center'
                },
                {
                  label: 'Right',
                  value: 'right'
                }
              ],
              admin: {
                width: '50%'
              }
            }
          ]
        },
        {
          name: 'content',
          type: 'richText',
          localized: true
        }
      ]
    }
  ]
};
