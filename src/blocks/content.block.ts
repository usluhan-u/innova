import { Block } from 'payload/types';
import { RichText } from '../fields';
import { Hr } from '../components/rich-text/hr';
import { Video } from '../components/rich-text/video';
import { VideoButton } from '../components/rich-text/video/VideoButton';
import { VideoElement } from '../components/rich-text/video/VideoElement';

export interface ContentTypeColumn {
  width: 'oneThird' | 'half' | 'twoThirds' | 'full';
  alignment: 'left' | 'center' | 'right';
  content: unknown;
}

export interface ContentType {
  columns: ContentTypeColumn[];
  type: 'content';
}

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
      labels: {
        singular: 'Column',
        plural: 'Columns'
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'width',
              label: 'Column Width',
              type: 'select',
              defaultValue: 'full',
              required: true,
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
        RichText(
          {},
          {
            elements: [
              'ol',
              'ul',
              'indent',
              'relationship',
              'upload',
              {
                name: Video.name,
                plugins: Video.plugins,
                Button: VideoButton,
                Element: VideoElement
              },
              Hr
            ]
          }
        )
      ]
    }
  ]
};
