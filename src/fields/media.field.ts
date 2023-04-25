/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';

export interface UploadedMediaType {
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
}

interface Args {
  name?: string;
  label?: string | false;
  required: boolean;
  condition?: (data: any, siblingData: any) => boolean;
}

export const Media = (args?: Args): Field => {
  const { name = 'media', required, label, condition } = args || {};

  return {
    name,
    label: typeof label === 'boolean' ? label : label || 'Media',
    type: 'upload',
    relationTo: 'medias',
    required,
    localized: true,
    admin: {
      condition
    }
  };
};
