import path from 'path';
import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'medias',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'filename'
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/png', 'image/jpeg']
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text',
      required: true
    }
  ]
};
