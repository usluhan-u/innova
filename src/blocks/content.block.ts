import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';

export type ContentColumnAlignType = 'flex-start' | 'center' | 'flex-end';
export type ContentColumnTextAlignType = 'left' | 'center' | 'right';

export interface ContentColumnType {
  width: WidthType;
  align: ContentColumnAlignType;
  textAlign: ContentColumnTextAlignType;
  content: RichTextContentType[];
}

export interface ContentType {
  blockType: 'content';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  columns: ContentColumnType[];
}

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Contents'
  },
  fields: [
    BackgroundColor,
    Width,
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
              ],
              admin: {
                width: '50%'
              }
            },
            {
              name: 'align',
              label: 'Align',
              type: 'select',
              defaultValue: 'flex-start',
              required: true,
              localized: true,
              options: [
                {
                  label: 'Left',
                  value: 'flex-start'
                },
                {
                  label: 'Center',
                  value: 'center'
                },
                {
                  label: 'Right',
                  value: 'flex-end'
                }
              ]
            },
            {
              name: 'textAlign',
              label: 'Text Align',
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
              ]
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true
            }
          ]
        }
      ]
    }
  ]
};
