import { GlobalConfig } from 'payload/types';

interface ScriptScript {
  title: string;
  script: string;
}

export interface ScriptType {
  scripts: ScriptScript[];
}

export const Script: GlobalConfig = {
  slug: 'scripts',
  label: 'Scripts',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'scripts',
      label: 'Scripts',
      type: 'array',
      labels: {
        singular: 'Script',
        plural: 'Scripts'
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true
        },
        {
          name: 'script',
          label: 'Script',
          type: 'code',
          required: true
        }
      ]
    }
  ]
};
