import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToActionToggle,
  CallToActionToggleType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';
import { UploadedMediaType } from '../collections';

export interface MediaContentType {
  blockType: 'mediaContent';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  contentPosition: 'left' | 'right';
  content: RichTextContentType[];
  callToActionToggle: CallToActionToggleType;
  image: UploadedMediaType;
}

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Contents'
  },
  fields: [
    {
      type: 'row',
      fields: [BackgroundColor, Width]
    },
    {
      name: 'contentPosition',
      label: 'Content Position',
      type: 'radio',
      defaultValue: 'left',
      required: true,
      localized: true,
      options: [
        {
          label: 'Left',
          value: 'left'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ],
      admin: {
        layout: 'horizontal'
      }
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      localized: true
    },
    CallToActionToggle,
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    }
  ]
};
