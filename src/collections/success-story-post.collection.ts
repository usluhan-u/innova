import { CollectionConfig } from 'payload/types';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Breadcrumbs,
  FullTitle,
  Hero,
  HeroType,
  Media,
  Meta,
  MetaType,
  ParentPage,
  Slug,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';
import { CategoryType } from './category.collection';
import { regeneratePage } from '../utils';

export interface SuccessStoryPostType {
  slug: string;
  title: string;
  fullTitle: string;
  hero: HeroType;
  backgroundColor: BackgroundColorType;
  width: WidthType;
  content: RichTextContentType[];
  featuredImage: UploadedMediaType;
  breadcrumbs: Breadcrumb[];
  category: CategoryType;
  publishDate: string;
  meta: MetaType;
}

export const SuccessStoryPost: CollectionConfig = {
  slug: 'success-story-posts',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', '_status']
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        regeneratePage({
          collection: 'success-story-posts',
          doc
        });
      }
    ]
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
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [Hero]
        },
        {
          label: 'Layout',
          fields: [
            BackgroundColor,
            Width,
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              required: true,
              localized: true
            },
            Media({
              name: 'featuredImage',
              label: 'Featured Image',
              required: true
            })
          ]
        }
      ]
    },
    Slug,
    ParentPage,
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      localized: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Success story will not be public until this date',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      },
      defaultValue: () => new Date()
    },
    FullTitle,
    Breadcrumbs,
    Meta
  ]
};
