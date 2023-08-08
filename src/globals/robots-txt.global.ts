import { GlobalConfig } from 'payload/types';

export interface RobotsTxtType {
  content?: string;
}

export const RobotsTxt: GlobalConfig = {
  slug: 'robots-txt',
  label: 'Robots.txt',
  access: {
    read: () => true
  },
  admin: {
    description: 'Robots.txt file for SEO'
  },
  fields: [
    {
      label: 'Content',
      name: 'content',
      type: 'textarea',
      required: true
    }
  ]
};
