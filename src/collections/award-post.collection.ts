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
  RichText,
  Slug,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';
import { regeneratePage } from '../utils';

export interface AwardPostType {
  slug: string;
  title: string;
  fullTitle: string;
  hero: HeroType;
  backgroundColor: BackgroundColorType;
  width: WidthType;
  content: RichTextContentType[];
  featuredImage: UploadedMediaType;
  breadcrumbs: Breadcrumb[];
  publishDate: string;
  meta: MetaType;
}

export const AwardPost: CollectionConfig = {
  slug: 'award-posts',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishDate', '_status']
  },
  versions: {
    drafts: true
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        regeneratePage({
          collection: 'award-posts',
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
            RichText({ name: 'content', label: 'Content', required: true }),
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
