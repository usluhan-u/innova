import path from 'path';
import { CollectionConfig } from 'payload/types';
import { UploadedLottieType } from '../fields';

export interface LottieType extends UploadedLottieType {}

export const Lottie: CollectionConfig = {
  slug: 'lotties',
  access: {
    read: () => true
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../lottie'),
    mimeTypes: ['application/json']
  },
  fields: []
};
