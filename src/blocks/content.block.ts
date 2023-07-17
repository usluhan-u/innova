import { Block } from 'payload/types';
import { RichTextContentType } from '../components';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  RichText,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export type ContentColumnTextAlignType = 'left' | 'center' | 'right';

export interface ContentColumnType {
  align: ContentColumnTextAlignType;
  icon?: UploadedMediaType;
  content: RichTextContentType[];
  callToAction?: CallToActionType;
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
          name: 'align',
          label: 'Align',
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
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'medias',
          localized: true
        },
        RichText({ name: 'content', label: 'Content', required: true }),
        CallToAction()
      ]
    }
  ]
};
