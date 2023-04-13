import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { Content, ContentType } from './content.block';

export type TabsOrientationType = 'horizontal' | 'vertical';

export type TabsAlignType = 'start' | 'center' | 'end';

export type TabsContentLayout = ContentType;

export interface TabsContentType {
  label: string;
  layout: TabsContentLayout[];
}

export interface TabsType {
  blockType: 'tabs';
  bgColor: BackgroundColorType;
  orientation: TabsOrientationType;
  align?: TabsAlignType;
  tabs: TabsContentType[];
}

export const Tabs: Block = {
  slug: 'tabs',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs'
  },
  fields: [
    BackgroundColor,
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'radio',
      defaultValue: 'horizontal',
      required: true,
      localized: true,
      options: [
        {
          label: 'Horizontal',
          value: 'horizontal'
        },
        {
          label: 'Vertical',
          value: 'vertical'
        }
      ]
    },
    {
      name: 'align',
      label: 'Align',
      type: 'radio',
      defaultValue: 'start',
      required: true,
      localized: true,
      options: [
        {
          label: 'Left',
          value: 'start'
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'end'
        }
      ],
      admin: {
        condition: (_, siblingData) => siblingData.orientation === 'horizontal'
      }
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      labels: {
        singular: 'Tab',
        plural: 'Tabs'
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'layout',
          label: 'Layout',
          type: 'blocks',
          minRows: 1,
          blocks: [Content]
        }
      ]
    }
  ]
};
