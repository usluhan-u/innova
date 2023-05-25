import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Media as MediaField,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export interface MediaBlockType {
  blockType: 'media';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  media: UploadedMediaType;
}

export const Media: Block = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Medias'
  },
  fields: [BackgroundColor, Width, MediaField({ label: false, required: true })]
};
