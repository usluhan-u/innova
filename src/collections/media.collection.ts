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
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/png', 'image/jpeg'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320
      },
      {
        name: 'portrait',
        width: 768,
        height: 1024
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080
      }
    ]
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
