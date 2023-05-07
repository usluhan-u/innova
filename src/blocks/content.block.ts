import { Block } from 'payload/types';
import { RichTextContentType } from '../components';
import {
  BackgroundColor,
  BackgroundColorType,
  RichText,
  Width,
  WidthType
} from '../fields';

export type ContentColumnTextAlignType = 'left' | 'center' | 'right';

export interface ContentColumnType {
  textAlign: ContentColumnTextAlignType;
  content: RichTextContentType[];
}

export interface ContentType {
  blockType: 'content';
  columns: ContentColumnType[];
  backgroundColor: BackgroundColorType;
  width: WidthType;
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
        RichText({ name: 'content', label: 'Content', required: true })
      ]
    }
  ]
};
