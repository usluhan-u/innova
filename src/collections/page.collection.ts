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
      required: true
    },
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [MediaContent, Content, MediaSlider, Media, CallToAction]
    },
    Slug,
    Meta
  ]
};
