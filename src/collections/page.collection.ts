import { CollectionConfig } from 'payload/types';
import {
  CallToAction,
  Content,
  Media,
  MediaContent,
  MediaSlider
} from '../blocks';
import { Meta, Slug } from '../fields';
import {
  CallToActionProps as CallToActionType,
  ContentProps as ContentType,
  MediaContentProps as MediaContentType,
  MediaProps as MediaType,
  MediaSliderProps as MediaSliderType
} from '../components';
import { generateFullTitle } from '../utils';

export type PageLayout =
  | MediaContentType
  | ContentType
  | MediaSliderType
  | MediaType
  | CallToActionType;

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      localized: true,
      blocks: [MediaContent, Content, MediaSlider, Media, CallToAction]
    },
    {
      name: 'fullTitle',
      type: 'text',
      localized: true,
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) =>
            generateFullTitle(data?.breadcrumbs || originalDoc.breadcrumbs)
        ]
      },
      admin: {
        components: {
          Field: () => null
        }
      }
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          maxDepth: 0,
          admin: {
            disabled: true
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                width: '50%'
              }
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%'
              }
            }
          ]
        }
      ],
      admin: {
        disabled: true
      }
    },
    Slug,
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      index: true,
      admin: {
        position: 'sidebar'
      }
    },
    Meta
  ]
};
