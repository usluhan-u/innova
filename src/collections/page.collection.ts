import { CollectionConfig } from 'payload/types';
import {
  Content,
  ContentType,
  MediaBlock,
  MediaBlockType,
  MediaContent,
  MediaContentType,
  MediaSlider,
  MediaSliderType
} from '../blocks';
import { Slug } from '../fields';

export type PageLayout =
  | MediaContentType
  | ContentType
  | MediaSliderType
  | MediaBlockType;

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
      required: true
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [MediaContent, Content, MediaSlider, MediaBlock]
    },
    Slug
  ]
};
