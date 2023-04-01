import { CollectionConfig } from 'payload/types';
import { CallToAction, Cards, Meta, Slides, Tabs } from '../fields';

export const Home: CollectionConfig = {
  slug: 'home',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'Home',
      admin: {
        readOnly: true
      }
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [Slides]
    },
    {
      name: 'product',
      label: 'Product',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true
        },
        Slides
      ]
    },
    {
      name: 'solution',
      label: 'Solution',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          required: true
        },
        Tabs
      ]
    },
    {
      name: 'service',
      label: 'Service',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          required: true
        },
        Cards
      ]
    },
    {
      name: 'blog',
      label: 'Blog',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'successStory',
      label: 'Success Story',
      type: 'group',
      fields: [Cards, CallToAction]
    },
    Meta
  ]
};
