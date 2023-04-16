import path from 'path';
import { CollectionConfig } from 'payload/types';

export interface UploadedMediaType {
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
}

export const Media: CollectionConfig = {
  slug: 'medias',
  access: {
    read: () => true
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['*']
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
      localized: true
    }
  ]
};
