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
import { PostGroupType } from './post-group.collection';
import { CategoryType } from './category.collection';
import { populateValueAfterCaseChange } from '../hooks';

export interface PostType {
  slug: string;
  name: string;
  hero: HeroType;
  backgroundColor: BackgroundColorType;
  width: WidthType;
  breadcrumbs: Breadcrumb[];
  meta: MetaType;
  content: RichTextContentType[];
  featuredImage: UploadedMediaType;
  media: UploadedMediaType;
  group: PostGroupType;
  category?: CategoryType;
  publishDate: string;
}

export const Post: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'category', 'publishDate', '_status']
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
      hooks: {
        beforeChange: [populateValueAfterCaseChange('name')]
      }
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [Hero]
        },
        {
          label: 'Content',
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
    Slug(),
    ParentPage,
    {
      name: 'group',
      label: 'Post Group',
      type: 'relationship',
      relationTo: 'post-groups',
      required: true,
      localized: true,
      admin: {
        position: 'sidebar'
      }
    },
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
