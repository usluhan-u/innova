/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';

export interface UploadedLottieType {
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

export const Lottie = (args?: Args): Field => {
  const { name = 'lottie', required, label, condition } = args || {};

  return {
    name,
    label: typeof label === 'boolean' ? label : label || 'Lottie',
    type: 'upload',
    relationTo: 'lotties',
    required,
    localized: true,
    admin: {
      condition
    }
  };
};
