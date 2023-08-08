import { CollectionConfig } from 'payload/types';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import {
  FullTitle,
  Hero,
  HeroType,
  Meta,
  MetaType,
  Slug,
  ParentPage,
  Breadcrumbs
} from '../fields';
import {
  Accordion,
  AccordionType,
  ArrowSlider,
  ArrowSliderType,
  Content,
  ContentCardGroup,
  ContentCardGroupType,
  ContentType,
  DocumentDownloaderGroup,
  DocumentDownloaderGroupType,
  DotSlider,
  DotSliderType,
  FlippableCard,
  FlippableCardGroup,
  FlippableCardGroupType,
  FlippableCardType,
  Form,
  FormType,
  ImageDownloaderGroup,
  ImageDownloaderGroupType,
  ImageTagGroup,
  ImageTagGroupType,
  Media,
  MediaBlockType,
  MediaContent,
  MediaContentType,
  PageRouter,
  PageRouterType,
  TabGroup,
  TabGroupType,
  TagGroup,
  TagGroupType
} from '../blocks';
import { populateDocWithLocalizedSlugs } from '../hooks';

export type PageLayout =
  | AccordionType
  | ImageTagGroupType
  | TagGroupType
  | ContentType
  | MediaContentType
  | TabGroupType
  | DotSliderType
  | DocumentDownloaderGroupType
  | ImageDownloaderGroupType
  | ContentCardGroupType
  | ArrowSliderType
  | FormType
  | FlippableCardType
  | FlippableCardGroupType
  | MediaBlockType
  | PageRouterType;

export type PageBlockType =
  | AccordionType['blockType']
  | ImageTagGroupType['blockType']
  | TagGroupType['blockType']
  | ContentType['blockType']
  | MediaContentType['blockType']
  | TabGroupType['blockType']
  | DotSliderType['blockType']
  | DocumentDownloaderGroupType['blockType']
  | ImageDownloaderGroupType['blockType']
  | ContentCardGroupType['blockType']
  | ArrowSliderType['blockType']
  | FormType['blockType']
  | FlippableCardType['blockType']
  | FlippableCardGroupType['blockType']
  | MediaBlockType['blockType']
  | PageRouterType['blockType'];

export interface PageContent {
  layout: PageLayout[];
}

export interface PageType {
  slug: string;
  name: string;
  hero?: HeroType;
  content?: PageContent;
  breadcrumbs: Breadcrumb[];
  meta: MetaType;
  localizedSlugs: {
    [key: string]: string;
  };
}

export const Page: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'parent', 'publishDate', '_status']
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
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'layout',
              label: 'Layout',
              type: 'blocks',
              blocks: [
                Accordion,
                ImageTagGroup,
                TagGroup,
                Content,
                MediaContent,
                TabGroup,
                DotSlider,
                DocumentDownloaderGroup,
                ImageDownloaderGroup,
                ContentCardGroup,
                ArrowSlider,
                Form,
                FlippableCard,
                FlippableCardGroup,
                Media,
                PageRouter
              ]
            }
          ]
        }
      ]
    },
    FullTitle,
    Breadcrumbs,
    Slug(),
    {
      name: 'localizedSlugs',
      type: 'json'
    },
    ParentPage,
    Meta
  ]
};
