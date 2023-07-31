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

export const EnBlog: CollectionConfig = {
  slug: 'en-blogs',
  labels: {
    singular: 'Blog (EN)',
    plural: 'Blogs (EN)'
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
        try {
          const query = await fetch(
            `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/post-groups?locale=en&fallback-locale=tr&where[slug][equals]=blog`
          );

          const response: PaginatedDocs<{ id: string }> = await query.json();

          const [group] = response.docs;
          return group.id;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(JSON.stringify(error));
          }

          throw new Error('An error occurred');
        }
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
