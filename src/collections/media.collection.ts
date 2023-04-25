import path from 'path';
import { CollectionConfig } from 'payload/types';
import { UploadedMediaType } from '../fields';

export interface MediaType extends UploadedMediaType {
  alt: string;
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
