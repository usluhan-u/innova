import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  WidthType
} from '../fields';
import { UploadedMediaType } from '../collections';

export interface DocumentDownloaderGroupItemType {
  language: 'en' | 'tr';
  title: string;
  date: string;
  document: UploadedMediaType;
}

export interface DocumentDownloaderGroupType {
  blockType: 'documentDownloaderGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: DocumentDownloaderGroupItemType[];
}

export const DocumentDownloaderGroup: Block = {
  slug: 'documentDownloaderGroup',
  labels: {
    singular: 'Document Downloader Group',
    plural: 'Document Downloader Groups'
  },
  fields: [
    {
      type: 'row',
      fields: [BackgroundColor, Width]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'language',
          label: 'Language',
          type: 'radio',
          defaultValue: 'tr',
          required: true,
          localized: true,
          options: [
            {
              label: 'English',
              value: 'en'
            },
            {
              label: 'Turkish',
              value: 'tr'
            }
          ]
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'date',
          label: 'Date',
          type: 'date',
          required: true,
          localized: true
        },
        {
          name: 'document',
          label: 'Document',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
