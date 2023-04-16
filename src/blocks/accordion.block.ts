import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  WidthType
} from '../fields';

interface AccordionItemType {
  title: string;
  content: string;
}

export interface AccordionType {
  blockType: 'accordion';
  backgroundColor: BackgroundColorType;
  width: WidthType;
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
      type: 'row',
      fields: [BackgroundColor, Width]
    },
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
