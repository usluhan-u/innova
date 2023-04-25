import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export interface ImageTagGroupItemType {
  image: UploadedMediaType;
}

export interface ImageTagGroupType {
  blockType: 'imageTagGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  items: ImageTagGroupItemType[];
}

export const ImageTagGroup: Block = {
  slug: 'imageTagGroup',
  labels: {
    singular: 'Image Tag Group',
    plural: 'Image Tag Groups'
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
