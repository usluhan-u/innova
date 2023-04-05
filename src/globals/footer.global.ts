import { GlobalConfig } from 'payload/types';
import { RichTextNode } from '../components';

interface FooterLink {
  label: string;
  url?: string;
  bold?: boolean;
}

interface FooterLinkGroup {
  links: FooterLink[];
}

export interface FooterType {
  linkGroups: FooterLinkGroup[];
  otherInfo: RichTextNode[];
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'linkGroups',
      label: 'linkGroups',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
              localized: true
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              localized: true
            },
            {
              name: 'bold',
              label: 'Bold',
              type: 'checkbox',
              localized: true
            }
          ]
        }
      ]
    },
    {
      name: 'otherInfo',
      label: 'Other Info',
      type: 'richText',
      localized: true
    }
  ]
};
