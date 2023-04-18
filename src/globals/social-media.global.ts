import { GlobalConfig } from 'payload/types';

export interface SocialMediaType {
  facebook?: string;
  linkedIn?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
}

export const SocialMedia: GlobalConfig = {
  slug: 'social-media',
  label: 'Social Media',
  access: {
    read: () => true
  },
  admin: {
    group: 'Global'
  },
  fields: [
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      localized: true
    },
    {
      name: 'linkedIn',
      label: 'LinkedIn',
      type: 'text',
      localized: true
    },
    {
      name: 'youtube',
      label: 'YouTube',
      type: 'text',
      localized: true
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
      localized: true
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'text',
      localized: true
    }
  ]
};
