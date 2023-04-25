import { Block } from 'payload/types';

interface AccordionItemType {
  title: string;
  content: string;
}

export interface AccordionType {
  blockType: 'accordion';
  items: AccordionItemType[];
}

export const Accordion: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions'
  },
  fields: [
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'content',
          label: 'Content',
          type: 'textarea',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
