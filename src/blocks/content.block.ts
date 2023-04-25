import { Block } from 'payload/types';
import { RichTextContentType } from '../components';

export type ContentColumnTextAlignType = 'left' | 'center' | 'right';

export interface ContentColumnType {
  textAlign: ContentColumnTextAlignType;
  content: RichTextContentType[];
}

export interface ContentType {
  blockType: 'content';
  columns: ContentColumnType[];
}

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Contents'
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
          name: 'textAlign',
          label: 'Text Align',
          type: 'radio',
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
};
