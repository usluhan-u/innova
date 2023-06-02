import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export interface ImageDownloaderGroupItemType {
  coverImage: UploadedMediaType;
  image: UploadedMediaType;
}

export interface ImageDownloaderGroupType {
  blockType: 'imageDownloaderGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: ImageDownloaderGroupItemType[];
}

export const ImageDownloaderGroup: Block = {
  slug: 'imageDownloaderGroup',
  labels: {
    singular: 'Image Downloader Group',
    plural: 'Image Downloader Groups'
  },
  fields: [
    BackgroundColor,
    Width,
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
          name: 'coverImage',
          label: 'Cover Image',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
