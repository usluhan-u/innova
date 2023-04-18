import { CollectionConfig } from 'payload/types';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import { Hero, HeroType, Meta, MetaType, Slug } from '../fields';
import { generateFullTitle } from '../utils';
import {
  Accordion,
  AccordionType,
  CardGroup,
  CardGroupType,
  Content,
  ContentCardGroup,
  ContentCardGroupType,
  ContentType,
  DocumentDownloaderGroup,
  DocumentDownloaderGroupType,
  DotSlider,
  DotSliderType,
  ImageDownloaderGroup,
  ImageDownloaderGroupType,
  ImageTagGroup,
  ImageTagGroupType,
  MediaContent,
  MediaContentType,
  TabGroup,
  TabGroupType,
  TagGroup,
  TagGroupType
} from '../blocks';

export type PageLayout =
  | AccordionType
  | CardGroupType
  | ImageTagGroupType
  | TagGroupType
  | ContentType
  | MediaContentType
  | TabGroupType
  | DotSliderType
  | DocumentDownloaderGroupType
  | ImageDownloaderGroupType
  | ContentCardGroupType;

export type BlockType =
  | AccordionType['blockType']
  | CardGroupType['blockType']
  | ImageTagGroupType['blockType']
  | TagGroupType['blockType']
  | ContentType['blockType']
  | MediaContentType['blockType']
  | TabGroupType['blockType']
  | DotSliderType['blockType']
  | DocumentDownloaderGroupType['blockType']
  | ImageDownloaderGroupType['blockType']
  | ContentCardGroupType['blockType'];

export interface PageType {
  slug: string;
  title: string;
  fullTitle: string;
  hero: HeroType;
  breadcrumbs: Breadcrumb[];
  meta: MetaType;
  layout: PageLayout[];
}

export const Page: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'fullTitle',
    group: 'Content'
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
          label: 'Page Layout',
          fields: [
            {
              name: 'layout',
              label: 'Page Layout',
              type: 'blocks',
              minRows: 1,
              blocks: [
                Accordion,
                CardGroup,
                ImageTagGroup,
                TagGroup,
                Content,
                MediaContent,
                TabGroup,
                DotSlider,
                DocumentDownloaderGroup,
                ImageDownloaderGroup,
                ContentCardGroup
              ]
            }
          ]
        }
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
