import { CollectionConfig } from 'payload/types';
import {
  CallToAction,
  Content,
  Media,
  MediaContent,
  MediaSlider,
  CallToActionType,
  ContentType,
  MediaContentType,
  MediaType,
  MediaSliderType,
  Tabs,
  TabsType,
  SmallCardsType,
  SmallCards,
  CardsType,
  Cards
} from '../blocks';
import { Meta, MetaType, Slug } from '../fields';
import { generateFullTitle } from '../utils';

export type PageLayout =
  | MediaContentType
  | ContentType
  | MediaSliderType
  | MediaType
  | CallToActionType
  | TabsType
  | SmallCardsType
  | CardsType;

export interface PageType {
  id: string;
  title: string;
  layout: PageLayout[];
  slug: string;
  meta: MetaType;
}

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'fullTitle'
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
      blocks: [
        MediaContent,
        Content,
        MediaSlider,
        Media,
        CallToAction,
        Tabs,
        SmallCards,
        Cards
      ]
    },
    {
      name: 'fullTitle',
      type: 'text',
      localized: true,
      hooks: {
        beforeChange: [
          async ({ data, originalDoc }) =>
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
