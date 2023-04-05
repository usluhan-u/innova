import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { MediaContent, MediaContentType } from './media-content.block';
import { Media, MediaType } from './media.block';
import { Content, ContentType } from './content.block';
import { RichTextNode } from '../components';

export type TabsTabsLayout = MediaContentType | MediaType | ContentType;

interface TabsTabsType {
  title: string;
  layout: TabsTabsLayout[];
}

export interface TabsType {
  blockType: 'tabs';
  backgroundColor: BackgroundColorType;
  header?: {
    content: RichTextNode[];
    description?: RichTextNode[];
  };
  orientation: 'horizontal' | 'vertical';
  alignment: 'left' | 'center' | 'right';
  tabs: TabsTabsType[];
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
      name: 'enableHeader',
      label: 'Header',
      type: 'checkbox'
    },
    {
      name: 'header',
      label: false,
      type: 'group',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.enableHeader)
      },
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true
        },
        {
          name: 'description',
          type: 'richText',
          localized: true
        }
      ]
    },
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'radio',
      defaultValue: 'horizontal',
      required: true,
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
      name: 'alignment',
      label: 'Tab Alignment',
      type: 'radio',
      defaultValue: 'left',
      required: true,
      options: [
        {
          label: 'Left',
          value: 'left'
        },
        {
          label: 'Center',
          value: 'center'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ],
      admin: {
        width: '50%',
        condition: (_, siblingData) => siblingData.orientation === 'horizontal'
      }
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Tab',
        plural: 'Tabs'
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'layout',
          label: 'Tab Layout',
          type: 'blocks',
          minRows: 1,
          maxRows: 1,
          blocks: [MediaContent, Content, Media]
        }
      ]
    }
  ]
};
