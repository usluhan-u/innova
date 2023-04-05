import { CollectionConfig } from 'payload/types';
import { CallToAction, Meta, MetaType, Slug } from '../fields';
import { CallToActionType, MediaTypeMediaType } from '../blocks';
import { RichTextNode } from '../components';

export interface HomeHeroSliderSlideType {
  title?: RichTextNode[];
  content?: RichTextNode[];
  callToAction?: CallToActionType;
  media: MediaTypeMediaType;
}

export interface HomeHeroType {
  slides: HomeHeroSliderSlideType[];
}

export interface HomeProductsSummaryType extends HomeHeroType {
  title: RichTextNode[];
}

export interface HomeType {
  title: string;
  hero: HomeHeroType;
  productsSummary: HomeProductsSummaryType;
  slug: string;
  meta: MetaType;
}

export const Home: CollectionConfig = {
  slug: 'home',
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
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'slides',
          type: 'array',
          minRows: 2,
          required: true,
          labels: {
            singular: 'Slide',
            plural: 'Slides'
          },
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'richText',
              localized: true
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              localized: true
            },
            CallToAction,
            {
              name: 'media',
              type: 'upload',
              relationTo: 'medias',
              required: true,
              localized: true
            }
          ]
        }
      ]
    },
    {
      name: 'productsSummary',
      label: 'Products Summary',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'richText',
          required: true,
          localized: true
        },
        {
          name: 'slides',
          type: 'array',
          minRows: 3,
          required: true,
          labels: {
            singular: 'Slide',
            plural: 'Slides'
          },
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'richText',
              localized: true
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              localized: true
            },
            CallToAction,
            {
              name: 'media',
              label: 'Media',
              type: 'upload',
              relationTo: 'medias',
              required: true,
              localized: true
            }
          ]
        }
      ]
    },
    {
      name: 'solutionsSummary',
      label: 'Solutions Summary',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'richText',
          required: true,
          localized: true
        }
      ]
    },
    Slug,
    Meta
  ]
};
