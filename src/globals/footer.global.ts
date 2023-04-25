import { GlobalConfig } from 'payload/types';
import { CallToAction, CallToActionType, RichText } from '../fields';
import { RichTextContentType } from '../components';

export interface FooterLinkGroupLinkType {
  bold: boolean;
  callToAction: CallToActionType;
}

export interface FooterLinkGroupType {
  links: FooterLinkGroupLinkType[];
}

export interface FooterType {
  linkGroups?: FooterLinkGroupType[];
  contact?: RichTextContentType[];
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
      labels: {
        singular: 'Link Group',
        plural: 'Link Groups'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'links',
          labels: {
            singular: 'Link',
            plural: 'Links'
          },
          type: 'array',
          minRows: 1,
          fields: [
            CallToAction(),
            {
              name: 'bold',
              label: 'Bold',
              type: 'checkbox',
              defaultValue: false,
              required: true
            }
          ]
        }
      ]
    },
    RichText({ name: 'contact', label: 'Contact', required: true })
  ]
};
