import { CollectionConfig } from 'payload/types';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import {
  BackgroundColor,
  Breadcrumbs,
  FullTitle,
  Hero,
  Media,
  Meta,
  ParentPage,
  RichText,
  Slug,
  Width
} from '../fields';
import {
  populateDocWithLocalizedSlugs,
  populateValueAfterCaseChange
} from '../hooks';
import { getCustomPageDataByCondition } from '../api';

export const TrBlog: CollectionConfig = {
  slug: 'tr-blogs',
  labels: {
    singular: 'Blog (TR)',
    plural: 'Blogs (TR)'
  },
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
  hooks: {
    beforeRead: [populateDocWithLocalizedSlugs]
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
            RichText({
              name: 'content',
              label: 'Content',
              required: true,
              localized: true
            }),
            Media({
              name: 'featuredImage',
              label: 'Featured Image',
              required: true,
              localized: true
            })
          ]
        }
      ]
    },
    Slug(),
    {
      name: 'localizedSlugs',
      type: 'json'
    },
    ParentPage,
    {
      name: 'group',
      label: 'Post Group',
      type: 'relationship',
      relationTo: 'post-groups',
      required: true,
      localized: true,
      defaultValue: async () => {
        const response = await getCustomPageDataByCondition<
          PaginatedDocs<{ id: string }>
        >({
          endpoint: 'post-groups',
          condition: '[slug][equals]=blog',
          locale: 'tr',
          defaultLocale: 'tr'
        });
        const [group] = response.docs;
        return group.id;
      },
      admin: {
        position: 'sidebar',
        readOnly: true
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
