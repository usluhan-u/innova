import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  WidthType
} from '../fields';
import { Content, ContentType } from './content.block';
import { MediaContent, MediaContentType } from './media-content.block';

export type TabGroupItemLayout = ContentType | MediaContentType;

export interface TabGroupItemType {
  label: string;
  layout: TabGroupItemLayout[];
}

export interface TabGroupType {
  blockType: 'tabGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  orientation: 'horizontal' | 'vertical';
  alignment?: 'start' | 'center' | 'end';
  items: TabGroupItemType[];
}

export const TabGroup: Block = {
  slug: 'tabGroup',
  labels: {
    singular: 'Tab Group',
    plural: 'Tab Groups'
  },
  fields: [
    {
      type: 'row',
      fields: [BackgroundColor, Width]
    },
    {
      type: 'row',
      fields: [
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
          ],
          admin: {
            width: '30%'
          }
        },
        {
          name: 'alignment',
          label: 'Alignment',
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
            width: '70%',
            condition: (_, siblingData) =>
              siblingData.orientation === 'horizontal'
          }
        }
      ]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 2,
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
          maxRows: 1,
          blocks: [Content, MediaContent]
        }
      ]
    }
  ]
};
