/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlobalConfig } from 'payload/types';
import { validateUrl } from '../utils';

export interface SocialMediaType {
  facebook?: string;
  linkedIn?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
}

const validate = (
  value: any,
  { operation }: { operation: any }
): string | true | Promise<string | true> => {
  if (!value) {
    return true;
  }

  if (operation === 'create' || operation === 'update') {
    return validateUrl(value);
  }

  return 'Please enter a valid URL';
};

export const SocialMedia: GlobalConfig = {
  slug: 'social-media',
  label: 'Social Media',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      localized: true,
      validate
    },
    {
      name: 'linkedIn',
      label: 'LinkedIn',
      type: 'text',
      localized: true,
      validate
    },
    {
      name: 'youtube',
      label: 'YouTube',
      type: 'text',
      localized: true,
      validate
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
      localized: true,
      validate
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'text',
      localized: true,
      validate
    }
  ]
};
