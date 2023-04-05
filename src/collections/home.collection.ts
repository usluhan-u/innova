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

export interface HomeType {
  title: string;
  hero: HomeHeroType;
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
              type: 'richText',
              localized: true
            },
            {
              name: 'content',
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
    Slug,
    Meta
  ]
};
